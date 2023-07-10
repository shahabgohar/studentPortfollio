// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon'
  ],
  buildModules: [
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: [
      'Roboto Mono',
      'monospace'
    ],
  }
})
