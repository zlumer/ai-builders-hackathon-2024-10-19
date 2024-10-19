"use client"

import { useNextApi } from '@/utils/next/use-api'
import TableSelect from './TableSelect'

export default function HiPage()
{
	const { data: schemas, error } = useNextApi<string[]>("/api/schemas")

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
				<h1 className="text-6xl font-bold">
					Hi there!
				</h1>
				{error
				? <p className="mt-3 text-2xl">Failed to load</p>
				: schemas?.map(s => <p className="mt-3 text-2xl">{s}</p>) || "Loading..."}
				{schemas && <TableSelect schema={schemas[0]} />}
			</main>
		</div>
	)
}
