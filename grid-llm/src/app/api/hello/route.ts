import { users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { swallowTo500 } from '@/utils/next/swallow'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const GET = swallowTo500(async () =>
{
	const user = await db.select().from(users).where(eq(users.id, "1"))

	if (user)
		return NextResponse.json({ user })

	return NextResponse.json({ message: 'User not found' }, { status: 404 })
})
