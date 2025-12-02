
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
          // Cosmic color palette
          'space-deep': '#0c0c1d',
          'space-purple': '#2d1b4e',
          'space-blue': '#1a237e',
          'nebula-pink': '#e91e63',
          'nebula-purple': '#9c27b0',
          'star-white': '#ffffff',
          'cosmic-cyan': '#00bcd4',
          'cosmic-indigo': '#3f51b5',
        },
        animation: {
          'twinkle': 'twinkle 3s ease-in-out infinite',
          'twinkle-slow': 'twinkle 5s ease-in-out infinite',
          'twinkle-fast': 'twinkle 2s ease-in-out infinite',
          'float': 'float 6s ease-in-out infinite',
          'float-slow': 'float 8s ease-in-out infinite',
          'float-fast': 'float 4s ease-in-out infinite',
          'orbit': 'orbit 20s linear infinite',
          'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
          'nebula-shift': 'nebula-shift 15s ease-in-out infinite',
        },
        keyframes: {
          twinkle: {
            '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
            '50%': { opacity: '1', transform: 'scale(1.2)' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          orbit: {
            '0%': { transform: 'rotate(0deg) translateX(10px) rotate(0deg)' },
            '100%': { transform: 'rotate(360deg) translateX(10px) rotate(-360deg)' },
          },
          'pulse-glow': {
            '0%, 100%': { boxShadow: '0 0 5px rgba(233, 30, 99, 0.5), 0 0 10px rgba(156, 39, 176, 0.3)' },
            '50%': { boxShadow: '0 0 20px rgba(233, 30, 99, 0.8), 0 0 30px rgba(156, 39, 176, 0.5)' },
          },
          'nebula-shift': {
            '0%, 100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
          },
        },
        backgroundImage: {
          'nebula-gradient': 'linear-gradient(135deg, #0c0c1d 0%, #2d1b4e 25%, #1a237e 50%, #2d1b4e 75%, #0c0c1d 100%)',
          'cosmic-radial': 'radial-gradient(ellipse at center, #2d1b4e 0%, #0c0c1d 70%)',
        },
      }
  },
  daisyui: {
      darkTheme: 'myCosmos',
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
      },
      {
        myCosmos: {
          'primary': '#ffffff',
          'secondary': '#0c0c1d',
          'accent': '#e91e63',
          'neutral': '#2d1b4e',
          'grey': '#4a4a6a',
          'silver': '#8080a0',
          'info': '#00bcd4',
          '--primary': '#ffffff',
          '--secondary': '#0c0c1d',
          '--accent': '#e91e63',
          '--nebula-pink': '#e91e63',
          '--nebula-purple': '#9c27b0',
          '--space-purple': '#2d1b4e',
          '--space-blue': '#1a237e',
          '--cosmic-cyan': '#00bcd4',
        }
      }
    ]
  },
  plugins: [require("daisyui")],
}