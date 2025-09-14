import { querySelector, querySelectorAll } from '@/helpers/helpers'
import type { PersistedState } from '@/types'

export function saveBoardState(code: string) {
  try {
    const cells = querySelectorAll('.cell')
    const data: Record<string, string> = {}
    cells.forEach(cell => {
      const pos = cell.dataset.pos
      if (!pos) return
      const value = (cell.textContent || '').trim()
      if (value !== '') {
        data[pos] = value
      }
    })
    const dataToStore: PersistedState = { cells: data, updatedAt: Date.now() }
    localStorage.setItem(getStorageKey(code), JSON.stringify(dataToStore))
  } catch (e) {
    console.error('Failed to save board state', e)
  }
}

export function clearBoardState(code: string) {
  try {
    localStorage.removeItem(getStorageKey(code))
  } catch (e) {
    console.error('Failed to clear board state', e)
  }
}

export function initPersistenceHelpers(updateSums: () => void) {
  const board = querySelector('.jamb-board')
  const { code } = board.dataset

  if (!code) return

  assignCellPositions()
  loadBoardState(code)
  updateSums()
}

function assignCellPositions() {
  const cells = querySelectorAll('.cell')
  cells.forEach((cell, index) => {
    cell.dataset.pos = String(index)
  })
}

function loadBoardState(code: string) {
  try {
    const raw = localStorage.getItem(getStorageKey(code))
    const parsed = raw ? JSON.parse(raw) : null
    const cells = querySelectorAll('.cell')
    // Clear everything first
    cells.forEach(cell => {
      cell.textContent = ''
    })

    if (parsed && parsed.cells) {
      cells.forEach(cell => {
        const pos = cell.dataset.pos
        if (pos && parsed.cells[pos] !== undefined) {
          cell.textContent = String(parsed.cells[pos])
        }
      })
    }
  } catch (e) {
    console.warn('Failed to load board state; clearing it', e)
    clearBoardState(code)
  }
}

function getStorageKey(code: string) {
  return `jamb-board-state-${code}`
}
