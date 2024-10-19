import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import { CommandInput, CommandEmpty, CommandGroup, CommandItem } from 'cmdk'
import { ChevronsUpDown, Command, Check } from 'lucide-react'
import React from 'react'

interface SelectProps
{
	idx: number
	onChange: (idx: number) => void
	options: React.ReactNode[]
	placeholder?: string
	emptyPlaceholder?: string
}

const CustomSelect: React.FC<SelectProps> = ({ idx, options, onChange, placeholder, emptyPlaceholder }) =>
{
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className="w-full justify-between"
				>
					{options[idx]}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandEmpty>{emptyPlaceholder}</CommandEmpty>
					<CommandGroup>
						{options.map((opt, i) => (
							<CommandItem
								key={i}
								onSelect={() => onChange(i)}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										idx === i ? "opacity-100" : "opacity-0"
									)}
								/>
								{opt}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default CustomSelect