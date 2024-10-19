import { getSchemas } from '@/queries/get-schemas'
import { endpoint } from '@/utils/next/endpoint'

export const GET = endpoint(getSchemas)
