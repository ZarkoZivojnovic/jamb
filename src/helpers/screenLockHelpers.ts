let wakeLock: WakeLockSentinel | null = null
let wakeLockEnabled = false
let requesting = false

export function initScreenLock() {
  // Request on first user interaction (required by many browsers)
  window.addEventListener('click', enableWakeLock, { once: true })
  window.addEventListener('keydown', enableWakeLock, { once: true })
  window.addEventListener('touchstart', enableWakeLock, { once: true, passive: true })
}

async function enableWakeLock(): Promise<void> {
  try {
    if (!('wakeLock' in navigator)) {
      console.warn('Wake Lock API not supported.')
      return
    }
    if (requesting || wakeLock) return
    if (document.visibilityState !== 'visible') return

    requesting = true
    wakeLock = await navigator.wakeLock!.request('screen')
    wakeLockEnabled = true

    wakeLock.addEventListener('release', () => {
      wakeLock = null
      if (document.visibilityState === 'visible' && wakeLockEnabled) {
        enableWakeLock()
      }
    })
  } catch (err) {
    console.warn('Failed to enable wake lock:', err)
  } finally {
    requesting = false
  }
}
