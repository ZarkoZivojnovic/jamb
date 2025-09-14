import type { APIRoute } from 'astro'
import { isGameExists, joinGame } from '@/games.ts'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { code, player } = body

    if (!code || !player) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
      })
    }

    if (!isGameExists(code)) {
      return new Response(JSON.stringify({ error: "Game doesn't exists" }), {
        status: 400,
      })
    }

    joinGame(code, player)

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error occurred' }), {
      status: 400,
    })
  }
}
