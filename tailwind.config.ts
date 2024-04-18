
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
      fontFamily: {
        sans: ['Roboto Mono', 'monospace', 'system-ui', 'sans-serif'],
        ibmMono: ['IBM Plex Mono', 'monospace', 'system-ui', 'sans-serif']
      },
      extend: {
        lineHeight: {
          '11': '5.437rem',
        },
        colors: {
          'grey': '#D9D9D9',
          'silver': '#C2C2C2',
          'blue': '#565BCF'
        }
      }
  },
  daisyui: {
      themes: []
  },
  plugins: [require("daisyui")],
}