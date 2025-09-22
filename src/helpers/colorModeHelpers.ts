import { querySelector } from '@/helpers/helpers'

const lightColor = '#67999c'
const darkColor = '#262626'

export function initColorModeHandlers() {
  const colorModeButton = querySelector('.color-mode')
  const colorMode = getColorMode()
  const metaThemeColor = querySelector('meta[name="theme-color"]')

  if (colorMode === 'dark-mode') {
    metaThemeColor.setAttribute('content', darkColor)
  } else {
    metaThemeColor.setAttribute('content', lightColor)
  }

  colorModeButton.addEventListener('click', () => {
    const isDarkModeActive = getColorMode() === 'dark-mode'
    changeColorMode(isDarkModeActive ? 'light-mode' : 'dark-mode')
  })
}

export function changeColorMode(colorMode: 'dark-mode' | 'light-mode') {
  const metaThemeColor = querySelector('meta[name="theme-color"]')

  if (colorMode === 'dark-mode') {
    metaThemeColor.setAttribute('content', darkColor)
    localStorage.setItem('color-mode', 'dark-mode')
    document.body.classList.add('dark-mode')
  } else {
    metaThemeColor.setAttribute('content', lightColor)
    localStorage.setItem('color-mode', 'light-mode')
    document.body.classList.remove('dark-mode')
  }
}

export function getColorMode() {
  const savedColorMode = localStorage.getItem('color-mode')
  return savedColorMode || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light-mode')
}
