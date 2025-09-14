import { querySelectorAll } from '@/helpers/helpers'

export function initHighlightHelpers() {
  const headerCells = querySelectorAll('.header-cell')
  const rowCells = querySelectorAll('td.row')

  let selectedColumn: HTMLElement | null = null
  let selectedRow: HTMLElement | null = null

  headerCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const column = cell.dataset.column

      if (selectedColumn === cell) {
        selectedColumn = null
        clearHighlightedColumn()
      } else {
        clearHighlightedColumn()
        selectedColumn = cell
        querySelectorAll(`.column-${column}`).forEach(selectedCell => {
          selectedCell.classList.add('selected-column')
        })
      }
    })
  })

  rowCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const row = cell.dataset.row

      if (selectedRow === cell) {
        selectedRow = null
        clearHighlightedRow()
      } else {
        clearHighlightedRow()
        selectedRow = cell
        querySelectorAll(`.row-${row}`).forEach(selectedCell => {
          selectedCell.classList.add('selected-row')
        })
      }
    })
  })
}

export function clearHighlightedCells() {
  clearHighlightedColumn()
  clearHighlightedRow()
}

function clearHighlightedColumn() {
  querySelectorAll('.selected-column').forEach(selectedCell => {
    selectedCell.classList.remove('selected-column')
  })
}

function clearHighlightedRow() {
  querySelectorAll('.selected-row').forEach(selectedCell => {
    selectedCell.classList.remove('selected-row')
  })
}
