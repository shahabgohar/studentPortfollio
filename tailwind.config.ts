
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
          // 'grey': '#D9D9D9',
          // 'silver': '#C2C2C2',
          // 'blue': '#565BCF'
        }
      }
  },
  daisyui: {
      darkTheme: 'myDark',
    base: false,
    themes: [
      {
        myLight: {

          'primary': '#000',
          'secondary': '#fff',
          'grey': '#D9D9D9',
          'silver': '#C2C2C2',
          'info': '#565BCF',
          '--primary': '#000',
          '--secondary': '#fff'
        }
      },
      {
        myDark: {
          'primary': '#fff',
          'secondary': '#000',
          'grey': '#D9D9D9',
          'silver': '#C2C2C2',
          'info': 'rgba(111,114,227,0.9)',
          '--primary': '#fff',
          '--secondary': '#000'
        }
      }
    ]
  },
  plugins: [require("daisyui")],
}