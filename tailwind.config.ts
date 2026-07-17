
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
      fontFamily: {
        // Brand type stack: Bricolage Grotesque (display) / Geist (body) / IBM Plex Mono (meta).
        // The legacy alias names (grotesk, inter) are kept so existing templates
        // pick up the new stack without touching every file.
        sans: ['Geist', 'system-ui', 'sans-serif'],
        inter: ['Geist', 'system-ui', 'sans-serif'],
        grotesk: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        ibmMono: ['IBM Plex Mono', 'ui-monospace', 'monospace']
      },
      extend: {
        lineHeight: {
          '11': '5.437rem',
        },
        colors: {}
      }
  },
  daisyui: {
      darkTheme: 'myDark',
    base: false,
    themes: [
      {
        myLight: {
          // Off-black on off-white: pure #000/#fff kill depth.
          'primary': '#101411',
          'secondary': '#F7F8F6',
          'grey': '#D9D9D9',
          'silver': '#C2C2C2',
          // emerald-700: passes WCAG AA for small text on the light surface
          'info': '#047857',
          '--primary': '#101411',
          '--secondary': '#F7F8F6'
        }
      },
      {
        myDark: {
          'primary': '#EDF1EE',
          'secondary': '#0B0E0C',
          'grey': '#D9D9D9',
          'silver': '#C2C2C2',
          'info': '#34D399',
          '--primary': '#EDF1EE',
          '--secondary': '#0B0E0C'
        }
      }
    ]
  },
  plugins: [require("daisyui")],
}
