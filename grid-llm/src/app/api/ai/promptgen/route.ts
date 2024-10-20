import { endpoint } from '@/utils/next/endpoint'
import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

const SYSTEM_PROMPT = () => `
You are an LLM prompt engineer. You are tasked to write the best LLM Agent prompt possible for the goal of enriching spreadsheet data. AI Agent will receive a short description of the object, list of input field names, a single output field name, and your prompt. You need to guess the algorithm to retrieve output data using input data and write a prompt for it.
AI Agent has the following tools:
	- Crawl a website
	- Search google
	- Summarize data
	- Look for data on a website

DON'T INCLUDE ANYTHING EXCEPT THE PROMPT TEXT IN THE PROMPT. DO NOT INCLUDE THE OBJECT DESCRIPTION, INPUTS, OR OUTPUTS IN THE PROMPT.

Example:
Object: VC Fund information (name, website, investment size, team)
Inputs: name
Output: website
Prompt:
Search the web for the "name" + "VC" and find the website that is most likely to be this fund's website. Return just the URL.
`
const USER_PROMPT = (object: string, inputs: string[], output: string) => `
Object: ${object}
Inputs: ${inputs.join(", ")}
Output: ${output}
Prompt:
`

const openai = createOpenAI({
	apiKey: process.env.NEBIUS_API_KEY,
	baseURL: `https://api.studio.nebius.ai/v1`,
})

export const POST = endpoint(async req =>
{
	let { inputs, output } = req.body
	if (!inputs || !output)
		throw { message: 'Missing inputs or output', status: 400 }

	let text = await generateText({
		model: openai("meta-llama/Meta-Llama-3.1-70B-Instruct"),
		messages: [
			{ role: "system", content: SYSTEM_PROMPT() },
			{ role: "user", content: USER_PROMPT("VC Fund information (name, website, investment size, team)", inputs, output) },
		]
	})
	return { prompt: text.text + "\nReturn the result a single short string, no additional comments." }
})
export const GET = POST
