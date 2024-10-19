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

export default function Everything({
	defaultSchema = '',
	defaultTable = '',
	defaultInputColumns = [],
	defaultOutputColumn = '',
	defaultPrompt = '',
	...props
}: {
	defaultSchema?: string,
	defaultTable?: string,
	defaultInputColumns?: string[],
	defaultOutputColumn?: string,
	defaultPrompt?: string,
	schemas?: string[]
	tables?: string[]
	columns?: string[]
})
{
	const { schemas: dbSchemas, tables: tableSchemas, columns } = props
	const [dbSchema, setDbSchema] = useState(defaultSchema)
	const [tableSchema, setTableSchema] = useState(defaultTable)
	const [inputColumns, setInputColumns] = useState<string[]>(defaultInputColumns)
	const [outputColumn, setOutputColumn] = useState(defaultOutputColumn)
	const [prompt, setPrompt] = useState(defaultPrompt)

	return (
		<div className="container mx-auto p-6 space-y-8">
			<h1 className="text-2xl font-bold mb-6">Schema and Prompt Configuration</h1>

			<div className="grid grid-cols-2 gap-6">
				{dbSchemas && <div className="space-y-2">
					<Label>DB Schema</Label>
					
				</div>}

				{tableSchemas && <div className="space-y-2">
					<Label>Table Schema</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								className="w-full justify-between"
							>
								{tableSchema}
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								<CommandInput placeholder="Search table schema..." />
								<CommandEmpty>No table schema found.</CommandEmpty>
								<CommandGroup>
									{tableSchemas.map((schema) => (
										<CommandItem
											key={schema}
											onSelect={() => setTableSchema(schema)}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													tableSchema === schema ? "opacity-100" : "opacity-0"
												)}
											/>
											{schema}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
				</div>}
			</div>

			{columns && <div className="space-y-2">
				<Label>Input Columns</Label>
				<div className="grid grid-cols-2 gap-4">
					{columns.map((column) => (
						<div key={column} className="flex items-center space-x-2">
							<Checkbox
								id={column}
								checked={inputColumns.includes(column)}
								onCheckedChange={(checked) =>
								{
									setInputColumns(
										checked
											? [...inputColumns, column]
											: inputColumns.filter((id) => id !== column)
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
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							className="w-full justify-between"
						>
							{outputColumn}
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0">
						<Command>
							<CommandInput placeholder="Search output column..." />
							<CommandEmpty>No column found.</CommandEmpty>
							<CommandGroup>
								{columns.map((column) => (
									<CommandItem
										key={column}
										onSelect={() => setOutputColumn(column)}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												outputColumn === column ? "opacity-100" : "opacity-0"
											)}
										/>
										{column}
									</CommandItem>
								))}
							</CommandGroup>
						</Command>
					</PopoverContent>
				</Popover>
			</div>}

			<div className="space-y-2">
				<Label htmlFor="prompt">Prompt</Label>
				<Textarea
					id="prompt"
					placeholder="Enter your prompt here..."
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					className="min-h-[100px]"
				/>
			</div>

			<Button className="w-full">Submit</Button>
		</div>
	)
}