import { Theme } from '~/types'

const STORAGE_KEY = 'shahab-theme'

/**
 * Light ("paper") is the brand default for every visitor; dark is an opt-in
 * that is remembered in localStorage. The inline boot script in nuxt.config.ts
 * applies a saved choice before first paint, and this composable adopts
 * whatever that script already put on <html> so hydration does not undo it.
 */
export const useTheme = () => {
  const theme = useState<Theme>('theme', () => Theme.LIGHT)

  const syncFromDocument = () => {
    const current = document.documentElement.getAttribute('data-theme')
    if (current === Theme.DARK || current === Theme.LIGHT) theme.value = current
  }

  const toggle = () => {
    theme.value = theme.value === Theme.DARK ? Theme.LIGHT : Theme.DARK
    document.documentElement.setAttribute('data-theme', theme.value)
    try {
      localStorage.setItem(STORAGE_KEY, theme.value)
    } catch {
      // storage can be blocked; the choice then lasts for this page view only
    }
  }

  return { theme, toggle, syncFromDocument }
}
