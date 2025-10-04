import { get, getDatabase, ref, set } from '@firebase/database'
import { getApp, getApps, initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBEuGV_M--r4G26iK6uNCCGR6UDA7XrkZc',
  authDomain: 'jamb-c8461.firebaseapp.com',
  databaseURL: 'https://jamb-c8461-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'jamb-c8461',
  storageBucket: 'jamb-c8461.firebasestorage.app',
  messagingSenderId: '1091987263571',
  appId: '1:1091987263571:web:02c3974f145b048736f6a6',
}

const app = !getApps().length ? initializeApp(firebaseConfig, 'jamb') : getApp('jamb')
const database = getDatabase(app)

type Creator = {
  name: string
  result: number
}

export async function createGame(code: string, creator: string) {
  set(ref(database, `games/${code}`), {
    players: { [creator]: 0 },
  })
    .then(() => {
      console.log('Game created successfully')
    })
    .catch(error => {
      console.error('Error creating game:', error)
    })
}

export async function addPlayer(code: string, player: string) {
  set(ref(database, `games/${code}/players/${player}`), 0)
    .then(() => {
      console.log('Player added successfully')
    })
    .catch(error => {
      console.error('Error adding player:', error)
    })
}

export async function removePlayer(code: string, player: string) {
  set(ref(database, `games/${code}/players/${player}`), null)
    .then(() => {
      console.log('Player removed successfully')
    })
    .catch(error => {
      console.error('Error removing player:', error)
    })
}

export async function updatePlayerResult(code: string, player: string, result: number) {
  set(ref(database, `games/${code}/players/${player}`), result)
    .then(() => {
      console.log('Player result updated successfully')
    })
    .catch(error => {
      console.error('Error updating player result:', error)
    })
}

export async function getGame(code: string) {
  get(ref(database, `games/${code}`))
    .then(snapshot => {
      console.log(snapshot.val())
    })
    .catch(error => {
      console.error('Error getting game:', error)
    })
}
