import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
    try {
        const user = await db.select().from(users).where(eq(users.id, 1)).get()

        if (user) {
            return NextResponse.json({ user })
        } else {
            return NextResponse.json({ message: 'User not found' }, { status: 404 })
        }
    } catch (error) {
        console.error('Error fetching user:', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}
