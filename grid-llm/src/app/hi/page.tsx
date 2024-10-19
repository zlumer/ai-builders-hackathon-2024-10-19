"use client"

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function HiPage()
{
	const { data: schemas, error } = useSWR<string[]>('/api/schemas', fetcher)

	if (error)
		return <div>Failed to load</div>
		
	if (!schemas)
		return <div>Loading...</div>

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
				<h1 className="text-6xl font-bold">
					Hi there!
				</h1>
				<p className="mt-3 text-2xl">
					{schemas.join(', ')}
				</p>
			</main>
		</div>
	)
}
