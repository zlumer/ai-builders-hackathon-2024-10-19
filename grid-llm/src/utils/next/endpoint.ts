import { NextApiHandler, NextApiRequest } from "next"
import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

async function streamToString(stream: any)
{
	const chunks = []
	for await (const chunk of stream)
		chunks.push(chunk)

	return Buffer.concat(chunks).toString('utf8')
}

/**
 * This method wraps an endpoint so that we can either:
 * - return JSON (or JSON Promise) to respond 200 to client
 * - throw an error to respond 500 to client
 * - throw a NextResponse with the necessary return type and status code
 */
export function endpoint<Response>(handler: (req: NextApiRequest) => Response | Promise<Response>): NextApiHandler
{
	return async (req) =>
	{
		try
		{
			if (!req.query)
				req.query = Object.fromEntries(new URLSearchParams(URL.parse(req.url + "")?.searchParams))

			if (req.body)
				req = {...req, body: JSON.parse(await streamToString(req.body))} as NextApiRequest

			const response = await handler(req)
			if ((response instanceof NextResponse) || (response instanceof Response))
				return response

			return NextResponse.json(response)
		}
		catch (error)
		{
			if ((error instanceof Response) || (error instanceof NextResponse))
				return error

			const uuid = randomUUID()
			console.error(`Error[${uuid}]:`, error)
			return NextResponse.json({ message: 'Internal Server Error', uuid }, { status: 500 })
		}
	}
}
