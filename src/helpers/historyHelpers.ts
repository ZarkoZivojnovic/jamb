import type { PersistedState } from '@/types'

const storagePrefix = 'jamb-board-state-'

export function createHistoryContentHtml(data: { code: string; state: PersistedState }[]) {
  let html = ''

  data.forEach(item => {
    const { code, state } = item
    html += createHistoryItem(code, state)
  })

  return html
}

export function getHistoryData() {
  const localStorageKeys = Object.keys(localStorage).filter(key => key.startsWith(storagePrefix))

  return localStorageKeys
    .map(key => {
      const code = key.replace(storagePrefix, '')
      const data = localStorage.getItem(key)
      const state: PersistedState | null = data ? JSON.parse(data) : null
      if (!state) return
      return { code, state }
    })
    .filter(i => !!i)
    .sort((a, b) => {
      return b.state.updatedAt - a.state.updatedAt
    })
}

export function clearHistory() {
  const localStorageKeys = Object.keys(localStorage).filter(key => key.startsWith(storagePrefix))
  localStorageKeys.forEach(key => {
    localStorage.removeItem(key)
  })
}

function createHistoryItem(code: string, state: PersistedState) {
  const { updatedAt } = state
  const date = formatDate(updatedAt)
  return `
    <a href="/game/${code}" class="history-item">
      <span class="history-code">${code.toUpperCase()}</span>
      <span>${date}</span>
    </a>`
}

function formatDate(dateString: number) {
  const date = new Date(dateString)
  return date.toLocaleString('sr-Latn-RS', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
