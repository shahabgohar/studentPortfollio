import type { Config } from 'tailwindcss'

// Colors resolve to CSS variables (see assets/main.css) so the light and dark
// themes swap at runtime without a rebuild. The legacy token names are kept
// because every page is written against them:
//   primary   = ink   (text, rules)
//   secondary = paper (page background)
//   info      = signal (safety orange, tuned to pass WCAG AA as small text)
const withAlpha = (name: string) => `rgb(var(${name}) / <alpha-value>)`

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      // One variable family does display, body and labels: Archivo's width axis
      // runs from 62 (condensed poster headlines) to 125 (expanded micro labels).
      // The legacy alias names (grotesk, inter, ibmMono) are kept so existing
      // templates pick up the stack without touching every file.
      sans: ['Archivo', 'Archivo Fallback', 'system-ui', 'sans-serif'],
      inter: ['Archivo', 'Archivo Fallback', 'system-ui', 'sans-serif'],
      grotesk: ['Archivo', 'Archivo Display Fallback', 'Impact', 'system-ui', 'sans-serif'],
      ibmMono: ['Martian Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
    },
    // Squared-off industrial corners. The scale is compressed on purpose so
    // legacy rounded-xl / rounded-2xl classes land on the same sharp language.
    borderRadius: {
      none: '0',
      sm: '1px',
      DEFAULT: '2px',
      md: '2px',
      lg: '3px',
      xl: '3px',
      '2xl': '4px',
      '3xl': '4px',
      full: '9999px',
    },
    extend: {
      colors: {
        primary: withAlpha('--c-ink'),
        secondary: withAlpha('--c-paper'),
        info: withAlpha('--c-signal'),
        ink: withAlpha('--c-ink'),
        paper: withAlpha('--c-paper'),
        raised: withAlpha('--c-raised'),
        well: withAlpha('--c-well'),
        signal: withAlpha('--c-signal'),
        hot: withAlpha('--c-hot'),
        go: withAlpha('--c-go'),
      },
      lineHeight: {
        '11': '5.437rem',
      },
      maxWidth: {
        page: '1240px',
      },
    },
  },
  plugins: [],
}
