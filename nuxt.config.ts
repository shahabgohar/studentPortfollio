// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/google-fonts'
  ],
  css: [
    '@/assets/main.css'
  ],
  googleFonts: {
    families: {
      'Roboto Mono': true,
      'monospace': true,
      'IBM Plex Mono': true
    },
  }
})
