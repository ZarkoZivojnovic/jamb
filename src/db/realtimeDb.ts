import { initializeApp, cert, getApp, getApps } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'
import dotenv from 'dotenv'

dotenv.config()

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE as string)

const app = !getApps().length
  ? initializeApp({
    credential: cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL,
  })
  : getApp()

const db = getDatabase(app)

type Creator = { name: string; result: number }

export async function createGame(code: string, creator: string) {
  await db.ref(`games/${code}`).set({ players: { [creator]: 0 } }).then(a => console.log(a)).catch(e => console.log(e))
  console.log('Game created successfully')
  console.log('Game created successfully')
}

export async function addPlayer(code: string, player: string) {
  await db.ref(`games/${code}/players/${player}`).set(0)
  console.log('Player added successfully')
}

export async function removePlayer(code: string, player: string) {
  await db.ref(`games/${code}/players/${player}`).set(null)
  console.log('Player removed successfully')
}

export async function updatePlayerResult(code: string, player: string, result: number) {
  await db.ref(`games/${code}/players/${player}`).set(result)
  console.log('Player result updated successfully')
}

export async function getGame(code: string) {
  const snapshot = await db.ref(`games/${code}`).get()
  console.log(snapshot.val())
  return snapshot.val()
}