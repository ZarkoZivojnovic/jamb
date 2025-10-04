import { updatePlayerResult } from '@/db/realtimeDb.ts'
import type { APIRoute } from 'astro'
import type {EndGamePayload} from "@/types.ts";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: EndGamePayload = await request.json()
    const { code, player, result } = body
    if (!code || !player || !result) {
      return new Response('Invalid JSON', { status: 400 })
    }

    await updatePlayerResult(code, player, result)
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response('Invalid JSON', { status: 400 })
  }
}
