"use client"

import { useNextApi } from '@/utils/next/use-api'
import TableSelect from './TableSelect'
import Everything from './everything'
import CustomSelect from './select'
import { useState } from 'react'


const columns = [
	{ id: "Name", label: "Name" },
	{ id: "URL", label: "URL" },
	{ id: "Last_Fund_Size", label: "Last Fund Size" },
	{ id: "Making_Active_Investments_Y_N", label: "Making Active Investments?" },
	{ id: "Location", label: "Location" },
	{ id: "Main_investment_sectors", label: "Main investment sectors" },
	{ id: "Lead_rounds_Y_N", label: "Lead rounds?" },
	{ id: "Stage_Pre_seed_Seed_Post_Seed", label: "Stage: Pre-seed/Seed/Post-Seed" },
	{ id: "Average_initial_check_size", label: "Average initial check size" },
]

export default function HiPage()
{
	const { data: schemas, error } = useNextApi<string[]>("/api/schemas")

	let [idx, setIdx] = useState(0)

	return (
		// <div>
			/* <iframe src="http://localhost:3000/base/bsecFP0wuTp8G64rseI/tblEWcaH57WidaVd1Zd/viwQbjgVDohIDXVVf7u" width="70wv" /> */
			<div className="flex flex-col items-center justify-center min-h-screen py-2">
				<main className="flex flex-col items-center justify-center w-full flex-1 text-center">
					{/* <h1 className="text-6xl font-bold">
					Hi there!
					</h1> */}
					<Everything
						// schemas={schemas || []}
						// tables={tableSchemas.map(x => x.label)}
						columns={columns.map(x => x.id)}
					/>

					{/* multiple selects for test */}
					{/* <CustomSelect idx={idx} options={columns.map(x => x.label)} onChange={setIdx} /> */}
					{/* {error
					? <p className="mt-3 text-2xl">Failed to load</p>
					: schemas?.map(s => <p className="mt-3 text-2xl">{s}</p>) || "Loading..."} */}
					{/* {schemas && <TableSelect schema={schemas[0]} />} */}
				</main>
			</div>
		// </div>
	)
}
