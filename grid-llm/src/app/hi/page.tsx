"use client"

import { useState, useEffect } from "react"

export default function HiPage()
{
	const [schemas, setSchemas] = useState<string[]>([])

	useEffect(() =>
	{
		async function fetchSchemas()
		{
			const response = await fetch('/api/schemas')
			const data = await response.json()
			setSchemas(data)
		}
		fetchSchemas()
	}, [])

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
