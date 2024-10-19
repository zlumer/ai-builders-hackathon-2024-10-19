import { users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq } from "drizzle-orm"
import { endpoint } from '@/utils/next/endpoint'
import { NextResponse } from 'next/server'

export const GET = endpoint(async () =>
{
	const [user] = await db.select().from(users).limit(1)

	if (!user)
		throw NextResponse.json({ message: 'User not found' }, { status: 404 })

	return { user }
})
