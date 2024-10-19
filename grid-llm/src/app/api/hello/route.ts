import { users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq, sql } from "drizzle-orm"
import { endpoint } from '@/utils/next/endpoint'
import { NextResponse } from 'next/server'

const GET_SCHEMAS = sql`
SELECT schema_name
FROM information_schema.schemata
WHERE 
	schema_name NOT LIKE 'pg_%'
	AND schema_name NOT IN ('information_schema', 'public', 'toolkit_experimental')
	AND schema_name NOT LIKE '%timescaledb%'
`

export const GET = endpoint(async () =>
{
	let result = await db.execute(GET_SCHEMAS)
	return result.rows.map(row => row.schema_name)

	// let tables = await db.execute(sql`select * from information_schema.tables`)
	// return tables
	// const [user] = await db.select().from(users).limit(1)

	// if (!user)
	// 	throw NextResponse.json({ message: 'User not found' }, { status: 404 })

	// return { user }
})
