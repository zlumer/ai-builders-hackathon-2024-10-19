import { NextResponse } from "next/server"

/*
Swallow errors:

```
export async function GET()
{
	try
	{
		const user = await db.select().from(users).where(eq(users.id, "1"))

		if (user)
			return NextResponse.json({ user })

		return NextResponse.json({ message: 'User not found' }, { status: 404 })
	}
	catch (error)
	{
		console.error('Error fetching user:', error)
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
	}
}
```

becomes:

```
export async const GET = swallowTo500(async () =>
{
	const user = await db.select().from(users).where(eq(users.id, "1"))

	if (user)
		return NextResponse.json({ user })

	return NextResponse.json({ message: 'User not found' }, { status: 404 })
})
```
*/
export function swallowTo500(fn: () => Promise<NextResponse>)
{
	return async () =>
	{
		try
		{
			return await fn()
		}
		catch (error)
		{
			console.error('Error:', error)
			return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
		}
	}
}
