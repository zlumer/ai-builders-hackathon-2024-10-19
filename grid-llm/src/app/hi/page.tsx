"use client"

import { useNextApi } from '@/utils/next/use-api'
import TableSelect from './TableSelect'
import Everything from './everything'
import CustomSelect from './select'
import { useState } from 'react'

const dbSchemas = [
	{ value: 'public', label: 'Public' },
	{ value: 'private', label: 'Private' },
	{ value: 'shared', label: 'Shared' },
  ]
  
  const tableSchemas = [
	{ value: 'users', label: 'Users' },
	{ value: 'products', label: 'Products' },
	{ value: 'orders', label: 'Orders' },
  ]
  
  const columns = [
	{ id: 'id', label: 'ID' },
	{ id: 'name', label: 'Name' },
	{ id: 'email', label: 'Email' },
	{ id: 'created_at', label: 'Created At' },
	{ id: 'updated_at', label: 'Updated At' },
  ]

export default function HiPage()
{
	const { data: schemas, error } = useNextApi<string[]>("/api/schemas")

	let [idx, setIdx] = useState(0)

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
				{/* <h1 className="text-6xl font-bold">
					Hi there!
				</h1> */}
				<Everything
					// schemas={schemas || []}
					// tables={tableSchemas.map(x => x.label)}
					columns={columns.map(x => x.label)}
				/>

				{/* multiple selects for test */}
				{/* <CustomSelect idx={idx} options={columns.map(x => x.label)} onChange={setIdx} /> */}
				{error
				? <p className="mt-3 text-2xl">Failed to load</p>
				: schemas?.map(s => <p className="mt-3 text-2xl">{s}</p>) || "Loading..."}
				{schemas && <TableSelect schema={schemas[0]} />}
			</main>
		</div>
	)
}
