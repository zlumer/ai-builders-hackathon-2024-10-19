import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'

const GET_TABLES = (schema: string) => sql`
SELECT table_name
FROM information_schema.tables
WHERE
	table_schema = ${schema}
`

export async function getTables(schema: string): Promise<string[]>
{
	let result = await db.execute(GET_TABLES(schema))
	return result.rows.map(row => row.table_name + "")
}
