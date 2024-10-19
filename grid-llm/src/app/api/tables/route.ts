import { getTables } from '@/queries/get-tables'
import { endpoint } from '@/utils/next/endpoint'
import { NextResponse } from 'next/server'

export const GET = endpoint(async req =>
{
	let schema = req.query?.schema
	if (!schema || typeof schema !== 'string')
		throw NextResponse.json({ error: 'No schema provided' }, { status: 400 })

	let result = await getTables(schema)
	return result
})
