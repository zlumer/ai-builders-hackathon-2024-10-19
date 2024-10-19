"use client"

import { useNextApi } from '@/utils/next/use-api'

export default function TableSelect(props: { schema: string })
{
	const { data: tables, error } = useNextApi<string[]>("/api/tables?schema=" + props.schema)

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
				{error
				? <p className="mt-3 text-2xl">Failed to load</p>
				: tables?.map(s => <p className="mt-3 text-2xl">{s}</p>) || "Loading..."}
		</div>
	)
}
