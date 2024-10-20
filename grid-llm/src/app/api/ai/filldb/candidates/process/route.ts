import { db } from '@/lib/db'
import { endpoint } from '@/utils/next/endpoint'
import { createOpenAI } from "@ai-sdk/openai"
import { generateText, tool } from "ai"
import { sql } from 'drizzle-orm'
import * as DDG from "duck-duck-scrape"
import { z } from "zod"

const groq = createOpenAI({
	apiKey: process.env.GROQ_API_KEY,
	baseURL: `https://api.groq.com/openai/v1`,
})

function sleep(ms: number)
{
	return new Promise(resolve => setTimeout(resolve, ms))
}

const web_search = tool({
	description: "Searches the web for the given search query",
	parameters: z.object({ query: z.string() }),
	execute: async ({ query }) =>
	{
		let result = await DDG.search(query, {
			safeSearch: DDG.SafeSearchType.OFF
		}).then(r => r.results)
		await sleep(3000)
		return result
	}
})

const GET_CANDIDATE = (inputs: string[], id: number) => `
SELECT ${inputs.map(s => `"${s}"`).join(', ')}
FROM "bsecFP0wuTp8G64rseI"."t2024_10_19_micro_vc"
WHERE id = ${id}
`

const UPDATE_CANDIDATE = (id: number, output: string, value: string) => `
UPDATE "bsecFP0wuTp8G64rseI"."t2024_10_19_micro_vc"
SET "${output}" = '${value}'
WHERE id = ${id}
`

export const POST = endpoint(async req =>
{
	let { id, inputs, prompt, output } = req.body || req.query
	if (!id || !inputs || !prompt || !output)
		throw { message: 'Missing id, inputs or prompt', status: 400 }

	console.log(`Processing candidate ${id} with ${inputs} -> ${output}`)

	let { rows: [cand] } = await db.execute(GET_CANDIDATE(inputs, id))

	console.log(`Candidate ${id} has ${inputs} = ${JSON.stringify(cand)}`)

	let text = await generateText({
		model: groq("llama-3.1-70b-versatile", { structuredOutputs: true }),
		tools: {
			web_search
		},
		maxSteps: 10,
		system: prompt,
		prompt: `inputs: ${JSON.stringify(cand)}\n\nRETURN ONLY SINGLE STRING, NO COMMENTS!`,
	})

	console.log(`Candidate ${id} generated text: ${text.text}`)

	let result = text.text

	await db.execute(UPDATE_CANDIDATE(id, output, result))

	console.log(`Candidate ${id} updated with ${output} = ${result}`)

	return { result: 1 }
})
export const GET = POST
