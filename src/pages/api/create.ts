import { createGame } from '@/db/realtimeDb.ts'
import type { CreateGamePayload } from '@/types.ts'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: CreateGamePayload = await request.json()
    const { code, creator } = body
    if (!code || !creator) {
      return new Response('Invalid JSON', { status: 400 })
    }

    await createGame(code, creator)
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response('Invalid JSON', { status: 400 })
  }
}
