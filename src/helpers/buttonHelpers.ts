import { makeApiCall } from '@/helpers/apiHelpers.ts'
import { errorIn, randomString } from '@/helpers/helpers'
import { getUsername } from '@/helpers/usernameHelpers'

export function initButtonHandlers(startGameButton: HTMLElement, joinGameButton: HTMLElement) {
  startGameButton.addEventListener('click', async () => {
    const username = getUsername()
    if (!username) {
      alert('Please enter a username first')
      return
    }

    const code = randomString(6)

    const res = await makeApiCall('/create', { code, creator: username })
    if (!errorIn(res)) {
      window.location.href = `/game/${code}`
    } else {
      console.log('Error: ', res)
    }
  })

  joinGameButton.addEventListener('click', async () => {
    const gameCode = prompt('Enter game code')?.toLowerCase()
    if (!gameCode || gameCode.length !== 6) {
      alert('Invalid game code. Please enter a valid game code.')
      return
    }

    const username = getUsername()
    if (!username) {
      alert('Please enter a username first')
      return
    }

    const res = await makeApiCall('/join', { code: gameCode, player: username })
    if (!errorIn(res)) {
      window.location.href = `/game/${gameCode}`
    } else {
      console.log('Error: ', res)
    }
  })
}
