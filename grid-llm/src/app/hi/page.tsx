"use client"

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function HiPage()
{
	const { data: schemas, error } = useSWR<string[]>('/api/schemas', fetcher)

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
				<h1 className="text-6xl font-bold">
					Hi there!
				</h1>
				{error
				? <p className="mt-3 text-2xl">Failed to load</p>
				: schemas?.map(s => <p className="mt-3 text-2xl">{s}</p>) || "Loading..."}
			</main>
		</div>
	)
}
