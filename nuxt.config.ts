// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    optimizeDeps: {
      exclude: ['class-validator']
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      'Roboto Mono': true,
      'monospace': true,
      'IBM Plex Mono': true
    },
  }
})
