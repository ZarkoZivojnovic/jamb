type GameId = string

interface Game {
  players: Record<string, number | null>
  columns: string[]
  createdAt: Date
  updatedAt: Date
}

const db: Record<GameId, Game> = {}

export function getGame(id: string) {
  console.log(db)
  return db[id]
}

export function createGame(code: string, creator: string, columns: string[]) {
  db[code] = {
    columns,
    players: { [creator]: null },
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export function isGameExists(code: string) {
  return !!db[code]
}

export function updateGame(code: string, update: Partial<Game>) {
  if (!isGameExists(code)) {
    throw new Error('Game not found')
  }
  db[code] = { ...db[code], ...update, updatedAt: new Date() }
}

export function deleteGame(code: string) {
  delete db[code]
}

export function joinGame(code: string, player: string) {
  db[code].players[player] = null
  db[code].updatedAt = new Date()
}

export function addResult(code: string, player: string, result: number) {
  db[code].players[player] = result
  db[code].updatedAt = new Date()
}

function watchGame(code: string) {
  // TODO websockets
}
