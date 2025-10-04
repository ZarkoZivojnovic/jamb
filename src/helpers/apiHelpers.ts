import type { Err, Success } from '@/types.ts'

export async function makeApiCall(url: string, data = {}): Promise<Err | Success> {
  try {
    const response = await fetch('/api' + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return { error: 'API call failed: ' + response.status + ' ' + response.statusText }
    }

    return await response.json()
  } catch (e) {
    return { error: 'Error occurred in API call' }
  }
}
