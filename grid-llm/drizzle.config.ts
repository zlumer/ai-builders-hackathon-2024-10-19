import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'

dotenv.config()

if (!process.env.DATABASE_URL)
	throw new Error('DATABASE_URL is not set')

export default {
	schema: './src/drizzle.schema.ts',
	out: './src/drizzle',
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL,

	}
} satisfies Config
