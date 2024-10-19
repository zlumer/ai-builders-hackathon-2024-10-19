import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'

const GET_SCHEMAS = sql`
SELECT schema_name
FROM information_schema.schemata
WHERE 
	schema_name NOT LIKE 'pg_%'
	AND schema_name NOT IN ('information_schema', 'public', 'toolkit_experimental')
	AND schema_name NOT LIKE '%timescaledb%'
`

async function getSchemas(): Promise<string[]>
{
	let result = await db.execute(GET_SCHEMAS)
	return result.rows.map(row => row.schema_name + "")
}

export default async function HiPage()
{
	let schemas = await getSchemas()

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
				<h1 className="text-6xl font-bold">
					Hi there!
				</h1>
				<p className="mt-3 text-2xl">
					Welcome to your new page.
				</p>
			</main>
		</div>
	);
}
