'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import CustomSelect from './select'

export default function Everything({
	...props
}: {
	schemas: string[]
	tables: string[]
	columns: string[]
})
{
	const { schemas, tables, columns } = props
	const [schemaIdx, setSchemaIdx] = useState(0)
	const [tableIdx, setTableIdx] = useState(0)
	const [inputColumns, setInputColumns] = useState<number[]>([])
	const [outputColumnIdx, setOutputColumnIdx] = useState(0)
	const [prompt, setPrompt] = useState("")

	return (
		<div className="container mx-auto p-6 space-y-8">
			<h1 className="text-2xl font-bold mb-6">Schema and Prompt Configuration</h1>

			{/* <div className="grid grid-cols-2 gap-6">
				{schemas && <div className="space-y-2">
					<Label>DB Schema</Label>
					<CustomSelect idx={schemaIdx} options={schemas.map(x => x)} onChange={setSchemaIdx} />
				</div>}

				{tables && <div className="space-y-2">
					<Label>Table Schema</Label>
					<CustomSelect idx={0} options={tables.map(x => x)} onChange={setTableIdx} />
				</div>}
			</div> */}

			{columns && <div className="space-y-2">
				<Label>Input Columns</Label>
				<div className="grid grid-cols-2 gap-4">
					{columns.map((column, i) => (
						<div key={column} className="flex items-center space-x-2">
							<Checkbox
								id={i + ""}
								checked={inputColumns.includes(i)}
								onCheckedChange={(checked) =>
								{
									setInputColumns(
										checked
											? [...inputColumns, i]
											: inputColumns.filter((id) => id !== i)
									)
								}}
							/>
							<label
								htmlFor={column}
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{column}
							</label>
						</div>
					))}
				</div>
			</div>}

			{columns && <div className="space-y-2">
				<Label>Output Column</Label>
				<CustomSelect idx={outputColumnIdx} options={columns.map(x => x)} onChange={setOutputColumnIdx} />
			</div>}

			<div className="space-y-2">
				<Label htmlFor="prompt">Prompt</Label>
				<div className='flex gap-5'>
					<Textarea
						id="prompt"
						placeholder="Enter your prompt here..."
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						className="min-h-[100px]"
					/>
					<Button className="w-75px">AI</Button>
				</div>

			</div>

			<Button className="w-full">Submit</Button>
		</div>
	)
}