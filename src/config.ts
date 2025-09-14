import type { ColumnType, IconType, RowType } from '@/types'

export const allColumns: ColumnType[] = ['down', 'free', 'up', 'N', 'R', 'D', 'top-bottom', 'min-max', 'O', 'M']
export const allRows: RowType[] = ['1', '2', '3', '4', '5', '6', 'max', 'min', 'kenta', 'triling', 'ful', 'kare', 'yamb']

export const fieldOptions: Record<RowType, number[]> = {
  '1': [0, 1, 2, 3, 4, 5],
  '2': [0, 2, 4, 6, 8, 10],
  '3': [0, 3, 6, 9, 12, 15],
  '4': [0, 4, 8, 12, 16, 20],
  '5': [0, 5, 10, 15, 20, 25],
  '6': [0, 6, 12, 18, 24, 30],
  max: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  min: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  kenta: [0, 46, 56, 66],
  triling: [0, 23, 26, 29, 32, 35, 38],
  ful: [0, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 56, 57, 58],
  kare: [0, 44, 48, 52, 56, 60, 64],
  yamb: [0, 55, 60, 65, 70, 75, 80],
}

export const columnIconMapping: Record<ColumnType, IconType | null> = {
  down: 'down',
  free: 'free',
  up: 'up',
  'top-bottom': 'top-bottom',
  'min-max': 'min-max',
  N: null,
  R: null,
  D: null,
  O: null,
  M: null,
}
