import { users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { endpoint } from '@/utils/next/endpoint'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const GET = endpoint(async () =>
{
	const user = await db.select().from(users).where(eq(users.id, "1"))

	if (user)
		return NextResponse.json({ user })

	return NextResponse.json({ message: 'User not found' }, { status: 404 })
})
