export function randomString(length: number) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2)
}

export function querySelector<T extends Element = HTMLElement>(selector: string): T

export function querySelector<T extends Element = HTMLElement>(selector: string, optional: true): T | null

export function querySelector<T extends Element = HTMLElement>(selector: string, optional = false): T | null {
  const el = document.querySelector<T>(selector)

  if (!el && !optional) {
    throw new Error(`Element not found: ${selector}`)
  }

  return el
}

export function querySelectorAll<T extends Element = HTMLElement>(selector: string) {
  return document.querySelectorAll<T>(selector)
}
