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
	// schemas: string[]
	// tables: string[]
	columns: string[]
})
{
	const { /* schemas, tables, */ columns } = props
	// const [schemaIdx, setSchemaIdx] = useState(0)
	// const [tableIdx, setTableIdx] = useState(0)
	const [inputColumns, setInputColumns] = useState<number[]>([])
	const [outputColumnIdx, setOutputColumnIdx] = useState(0)
	const [prompt, setPrompt] = useState("")
	const [waitingForPrompt, setWaitingForPrompt] = useState(false)

	const [showCandidates, setShowCandidates] = useState<boolean>(false)
	const [candidates, setCandidates] = useState<number[]>([])
	const [candidatesFinished, setCandidatesFinished] = useState<number>(0)
	const [disableRunButton, setDisableRunButton] = useState<boolean>(false)

	const onAiClick = async () =>
	{
		setWaitingForPrompt(true)
		try
		{
			let result = await fetch('/api/ai/promptgen', {
				method: 'POST',
				body: JSON.stringify({
					inputs: inputColumns.map(i => columns[i]),
					output: columns[outputColumnIdx],
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			let data = await result.json()
			setPrompt(data.prompt)
		}
		finally
		{
			setWaitingForPrompt(false)
		}
	}
	const onRunClick = async () =>
	{
		setDisableRunButton(true)
		try
		{

			let result = await fetch('/api/ai/filldb/candidates', {
				method: 'POST',
				body: JSON.stringify({
					inputs: inputColumns.map(i => columns[i]),
					output: columns[outputColumnIdx],
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			let data = await result.json()
			setCandidates(data)
			setCandidatesFinished(0)
			setShowCandidates(true)
			setTimeout(processNextCandidate, 100)
		}
		catch (e)
		{
			setDisableRunButton(false)
		}
	}
	const processNextCandidate = async () =>
	{
		console.log(`processing next candidate`)
		if (candidatesFinished >= candidates.length)
			return console.log(`no next candidate`), setDisableRunButton(false)

		let next = candidates[candidatesFinished]
		console.log(`processing candidate ${next}`)

		let result = await fetch('/api/ai/filldb/candidates/process', {
			method: 'POST',
			body: JSON.stringify({
				id: next,
				inputs: inputColumns.map(i => columns[i]),
				prompt: prompt,
				output: columns[outputColumnIdx],
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		setCandidatesFinished(candidatesFinished + 1)
		setTimeout(processNextCandidate, 100)
	}

	return (
		<div className="container mx-auto p-6 space-y-8">
			<h1 className="text-2xl font-bold mb-6">Autofill configuration</h1>

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
						disabled={waitingForPrompt}
					/>
					<Button disabled={waitingForPrompt} className="w-75px" onClick={onAiClick}>AI</Button>
				</div>

			</div>

			<Button className="w-full" disabled={disableRunButton} onClick={onRunClick}>Fill DB</Button>
			{showCandidates && <div className="space-y-2">
				<Label>Candidates</Label>
				<div className="grid grid-cols-2 gap-4">
					{(candidates.length == candidatesFinished)
						? <div className="text-sm text-gray-500">Finished! {candidatesFinished} filled</div>
						: <>{candidatesFinished}/{candidates.length} processed</>}
				</div>
			</div>}
		</div>
	)
}