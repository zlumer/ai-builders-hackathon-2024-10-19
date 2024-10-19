import { db } from '@/lib/db'
import { sql } from "drizzle-orm"
import { endpoint } from '@/utils/next/endpoint'

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
})
