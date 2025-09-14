import type { APIRoute } from 'astro'
import { createGame, isGameExists } from '@/games.ts'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { code, columns, creator } = body

    if (!code || !creator) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
      })
    }

    if (isGameExists(code)) {
      return new Response(JSON.stringify({ error: 'Game already exists, use join option' }), { status: 400 })
    }

    createGame(code, creator, columns)

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error occurred' }), {
      status: 400,
    })
  }
}
