import { db } from '@/lib/db'
import { endpoint } from '@/utils/next/endpoint'
import { sql } from 'drizzle-orm'

const GET_CANDIDATES = (inputs: string[], output: string) => `
SELECT id
FROM "bsecFP0wuTp8G64rseI"."t2024_10_19_micro_vc"
WHERE
	${inputs.map(s => `"${s}" IS NOT NULL`).join(' AND ')}
	AND "${output}" IS NULL
`

export async function getCandidates(inputs: string[], output: string): Promise<number[]>
{
	console.log(`Getting candidates with ${inputs} -> ${output}`)
	console.log(GET_CANDIDATES(inputs, output))
	let result = await db.execute(GET_CANDIDATES(inputs, output))
	return result.rows.map(row => parseInt(row.id + ""))
}

export const POST = endpoint(async req =>
{
	let { inputs, output } = req.body
	if (!inputs || !output)
		throw { message: 'Missing inputs or output', status: 400 }

	let result = await getCandidates(inputs, output)
	return result
})