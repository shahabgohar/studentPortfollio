// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/google-fonts',
    'nuxt-gtag',
    '@nuxtjs/sitemap'
  ],
  css: [
    '@/assets/main.css'
  ],
  // Site URL for sitemap and SEO
  site: {
    url: 'https://shahabgohar.com'
  },
  // Sitemap configuration
  sitemap: {
    strictNuxtContentPaths: true,
    autoLastmod: true
  },
  // Runtime config for SEO
  runtimeConfig: {
    public: {
      siteUrl: 'https://shahabgohar.com',
      siteName: 'Shahab Gohar - Full Stack Developer'
    }
  },
  gtag: {
    id: process.env?.GOOGLE_TAG_MANAGER_ID || '',
    config: {}
  },
  googleFonts: {
    families: {
      'Roboto Mono': true,
      'monospace': true,
      'IBM Plex Mono': true
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  }
})
