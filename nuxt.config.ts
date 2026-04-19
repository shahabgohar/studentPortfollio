// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/google-fonts',
    'nuxt-gtag'
  ],
  css: [
    '@/assets/main.css'
  ],
  gtag: {
    id: process.env?.GOOGLE_TAG_MANAGER_ID || '',
    config: {

    }
  },
  googleFonts: {
    families: {
      'Roboto Mono': true,
      'monospace': true,
      'IBM Plex Mono': true,
      'Oswald': [400, 700, 800, 900],
      'VT323': true
    },
  }
})
