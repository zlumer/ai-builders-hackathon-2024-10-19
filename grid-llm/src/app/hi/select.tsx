import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

import
{
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

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
		<Select onValueChange={v => onChange(parseInt(v))} value={idx + ""}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{/* <SelectLabel>Fruits</SelectLabel> */}
					{options.map((opt, i) => (
						<SelectItem
							key={i}
							value={i + ""}
							// onSelect={() => onChange(i)}
						>{opt}</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

// const CustomSelect: React.FC<SelectProps> = ({ idx, options, onChange, placeholder, emptyPlaceholder }) =>
// {
// 	const [open, setOpen] = React.useState(false)

// 	return (
// 		<Popover open={open} onOpenChange={setOpen}>
// 			<PopoverTrigger asChild>
// 				<Button
// 					variant="outline"
// 					role="combobox"
// 					aria-expanded={open}
// 					className="w-full justify-between"
// 				>
// 					{options[idx] || "Select..."}
// 					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
// 				</Button>
// 			</PopoverTrigger>
// 			<PopoverContent className="w-[200px] p-0">
// 				<Command>
// 					<CommandInput placeholder={placeholder} />
// 					<CommandEmpty>{emptyPlaceholder}</CommandEmpty>
// 					<CommandGroup>
// 						{options.map((opt, i) => (
// 							<CommandItem
// 								key={i}
// 								onSelect={() =>
// 								{
// 									onChange(i)
// 									setOpen(false)
// 								}}
// 							>
// 								<Check
// 									className={cn(
// 										"mr-2 h-4 w-4",
// 										idx === i ? "opacity-100" : "opacity-0"
// 									)}
// 								/>
// 								{opt}
// 							</CommandItem>
// 						))}
// 					</CommandGroup>
// 				</Command>
// 			</PopoverContent>
// 		</Popover>
// 	)
// }

export default CustomSelect
