import { addPlayer } from '@/db/realtimeDb.ts'
import type { JoinGamePayload } from '@/types.ts'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: JoinGamePayload = await request.json()
    const { code, player } = body
    if (!code || !player) {
      return new Response('Invalid JSON', { status: 400 })
    }

    await addPlayer(code, player)
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response('Invalid JSON', { status: 400 })
  }
}
