const USERNAME_STORAGE_KEY = 'jamb-username'

export function getUsername() {
  return localStorage.getItem(USERNAME_STORAGE_KEY)
}

function setUsername(username: string) {
  localStorage.setItem(USERNAME_STORAGE_KEY, username)
}

function removeUsername() {
  localStorage.removeItem(USERNAME_STORAGE_KEY)
}

export function initUsernameHandlers(startGameButton: HTMLElement | null, joinGameButton: HTMLElement | null) {
  const usernameInput = document.querySelector<HTMLInputElement>('input[name="username"]')
  const saveUsernameButton = document.querySelector<HTMLElement>('.save-username')
  const cancelUsernameButton = document.querySelector<HTMLElement>('.cancel-username')
  const editUsernameButton = document.querySelector<HTMLElement>('.edit-username')
  const removeUsernameButton = document.querySelector<HTMLElement>('.remove-username')
  const usernameInfo = document.querySelector<HTMLElement>('.username-info')
  const usernamePreview = document.querySelector<HTMLElement>('.username-preview')
  const usernameValue = getUsername()

  if (usernameValue) {
    startGameButton?.removeAttribute('disabled')
    joinGameButton?.removeAttribute('disabled')
    toggleUsernameInput('hide')
    toggleUsernamePreview('show')
    usernamePreview!.textContent = usernameValue
  } else {
    toggleUsernameInput('show')
    toggleUsernamePreview('hide')
  }

  saveUsernameButton?.addEventListener('click', e => {
    e.preventDefault()

    const username = usernameInput!.value

    if (!username || username.length < 3 || username.length > 15) {
      alert('Username must be between 3 and 15 characters.')
      return
    }

    setUsername(username)
    toggleUsernameInput('hide')
    toggleUsernamePreview('show')
    usernamePreview!.textContent = username
  })

  editUsernameButton?.addEventListener('click', () => {
    toggleUsernameInput('show')
    toggleUsernamePreview('hide')
    usernameInput!.value = usernamePreview!.textContent || ''
    usernameInput!.focus()
  })

  cancelUsernameButton?.addEventListener('click', e => {
    e.preventDefault()
    toggleUsernameInput('hide')
    toggleUsernamePreview('show')
  })

  removeUsernameButton?.addEventListener('click', () => {
    removeUsername()
    toggleUsernameInput('show')
    toggleUsernamePreview('hide')
    usernamePreview!.textContent = ''
    usernameInput!.value = ''
    usernameInput!.focus()
  })

  function toggleUsernameInput(action: 'show' | 'hide') {
    usernameInput!.classList.toggle('hide', action === 'hide')
    saveUsernameButton!.classList.toggle('hide', action === 'hide')
    cancelUsernameButton!.classList.toggle('hide', action === 'hide')
    const nicknameValue = getUsername()
    if (!nicknameValue) {
      cancelUsernameButton!.setAttribute('disabled', 'disabled')
      startGameButton?.setAttribute('disabled', 'disabled')
      joinGameButton?.setAttribute('disabled', 'disabled')
    } else {
      cancelUsernameButton!.removeAttribute('disabled')
      startGameButton?.removeAttribute('disabled')
      joinGameButton?.removeAttribute('disabled')
    }
  }

  function toggleUsernamePreview(action: 'show' | 'hide') {
    usernamePreview!.classList.toggle('hide', action === 'hide')
    editUsernameButton!.classList.toggle('hide', action === 'hide')
    usernameInfo!.classList.toggle('hide', action === 'hide')
    removeUsernameButton!.classList.toggle('hide', action === 'hide')
  }
}
