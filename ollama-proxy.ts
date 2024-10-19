#!/usr/bin/env -S deno run -NE --env-file=.env

const [TARGET_PROTOCOL, TARGET_HOST] = ["https:", "api.studio.nebius.ai"]
const API_KEY = Deno.env.get("NEBIUS_API_KEY")

if (!API_KEY)
{
	console.error("API_KEY is not set")
	Deno.exit(1)
}
const AUTHORIZATION_HEADER = `Bearer ${API_KEY}`

Deno.serve(async (req) =>
{
	const url = new URL(req.url)
	url.host = TARGET_HOST.replace(/^https?:\/\//, "")
	url.protocol = TARGET_PROTOCOL
	url.port = ""

	const proxyReq = new Request(url.toString(), {
		method: req.method,
		headers: new Headers({
			...Object.fromEntries(req.headers),
			"Authorization": AUTHORIZATION_HEADER,
			"Content-Type": "application/json",
		}),
		body: req.body,
	})

	console.log(proxyReq)

	const response = await fetch(proxyReq)
	return new Response(response.body, {
		status: response.status,
		headers: response.headers,
	})
})
