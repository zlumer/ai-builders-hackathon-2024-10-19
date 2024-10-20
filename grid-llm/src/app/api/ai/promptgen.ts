import { endpoint } from '@/utils/next/endpoint'
import { StreamingTextResponse, GroqStream } from "ai"

export const runtime = 'edge'

export const POST = endpoint(async req => {
  const { prompt } = await req.json()

  const stream = await GroqStream(
    'mixtral-8x7b-32768',
    [
      {
        role: 'system',
        content: 'You are a helpful AI assistant.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    {
      apiKey: process.env.GROQ_API_KEY!
    }
  )

  return new StreamingTextResponse(stream)
})
