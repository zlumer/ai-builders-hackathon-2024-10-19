import { endpoint } from '@/utils/next/endpoint'
import { createOpenAI } from "@ai-sdk/openai"
import { generateText, tool } from "ai"
import * as DDG from "duck-duck-scrape"
import { z } from "zod"

const groq = createOpenAI({
	apiKey: process.env.GROQ_API_KEY,
	baseURL: `https://api.groq.com/openai/v1`,
})

const web_search = tool({
	description: "Search the web for the given search query",
	parameters: z.object({ query: z.string() }),
	execute: ({ query }) => DDG.search(query, {
		safeSearch: DDG.SafeSearchType.OFF
	}).then(r => r.results)
})

export const POST = endpoint(async req =>
{
	let { input, prompt } = req.body || req.query
	if (!input || !prompt)
		throw { message: 'Missing inputs or prompt', status: 400 }

	let text = await generateText({
		model: groq("llama-3.1-70b-versatile", { structuredOutputs: true }),
		tools: {
			web_search
		},
		maxSteps: 10,
		system: prompt,
		prompt: input,
	})
	return { text: text }
})
export const GET = POST
