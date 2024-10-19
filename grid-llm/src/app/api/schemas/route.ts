import { getSchemas } from '@/queries/get-schemas'
import { endpoint } from '@/utils/next/endpoint'

export const GET = endpoint(getSchemas)
import { getSchemas } from "@/queries/get-schemas";
import { NextResponse } from "next/server";

export async function GET() {
  const schemas = await getSchemas();
  return NextResponse.json(schemas);
}
