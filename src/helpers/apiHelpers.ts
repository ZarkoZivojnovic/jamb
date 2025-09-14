type ErrorRes = { error: string; statusCode?: number }

export function errorIn(value: unknown): value is ErrorRes {
  return typeof value === 'object' && value !== null && 'error' in value
}

export async function apiCall(url: string, payload: Record<string, unknown>): Promise<ErrorRes | any> {
  // TODO: change any to correct type
  const timeout = 5000
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(`/api/${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (res.ok) {
      return res.json()
    } else {
      return { error: res.statusText, statusCode: res.status }
    }
  } catch (error) {
    clearTimeout(timeoutId)
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}
