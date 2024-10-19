import { NextApiHandler, NextApiRequest } from "next"
import { NextResponse } from "next/server"

/**
 * This method wraps an endpoint so that we can either:
 * - return JSON (or JSON Promise) to respond 200 to client
 * - throw an error to respond 500 to client
 * - throw a NextResponse with the necessary return type and status code
 */
export function endpoint(handler: (req: NextApiRequest) => Response | Promise<Response>): NextApiHandler
{
	return async (req) =>
	{
		try
		{
			const response = await handler(req)
			if (response instanceof NextResponse)
				return response

			return NextResponse.json(response)
		}
		catch (error)
		{
			if ((error instanceof Response) || (error instanceof NextResponse))
				return error

			console.error('Error:', error)
			return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
		}
	}
}
