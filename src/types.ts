export type RowType = '1' | '2' | '3' | '4' | '5' | '6' | 'min' | 'max' | 'kenta' | 'triling' | 'ful' | 'kare' | 'yamb'
export type ColumnType = 'down' | 'free' | 'up' | 'N' | 'R' | 'D' | 'top-bottom' | 'min-max' | 'O' | 'M'
export type IconType = 'down' | 'free' | 'up' | 'top-bottom' | 'min-max' | 'moon' | 'sun' | 'home' | 'history'

export interface PersistedState {
  cells: Record<string, string>
  updatedAt: number
}

export type Players = Record<string, number>

export type Game = {
  code: string
  players: Players
  finished: boolean
}

export type Err = { error: string }
export type Success = { success: true }
export type ApiResponse = Err | Success

export type CreateGamePayload = { code: string; creator: string }
export type JoinGamePayload = { code: string; player: string }
export type EndGamePayload = { code: string; player: string, result: number }
