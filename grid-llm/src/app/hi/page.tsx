import { getSchemas } from "@/queries/get-schemas"

export default async function HiPage()
{
	let schemas = await getSchemas()

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
				<h1 className="text-6xl font-bold">
					Hi there!
				</h1>
				<p className="mt-3 text-2xl">
					{schemas}
				</p>
			</main>
		</div>
	)
}
