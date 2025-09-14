export type RowType = '1' | '2' | '3' | '4' | '5' | '6' | 'min' | 'max' | 'kenta' | 'triling' | 'ful' | 'kare' | 'yamb'
export type ColumnType = 'down' | 'free' | 'up' | 'N' | 'R' | 'D' | 'top-bottom' | 'min-max' | 'O' | 'M'
export type IconType = 'down' | 'free' | 'up' | 'top-bottom' | 'min-max'

export interface PersistedState {
  cells: Record<string, string>
  updatedAt: number
}
