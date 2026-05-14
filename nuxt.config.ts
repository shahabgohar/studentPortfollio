// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  site: {
    url: 'https://shahabgohar.dev',
    name: 'Shahab Gohar — Software Engineer & AI Solutions Architect',
  },

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
    'nuxt-gtag',
    '@nuxtjs/sitemap'
  ],

  routeRules: {
    '/': {
      sitemap: { changefreq: 'weekly', priority: 1.0 }
    },
    '/blogs': {
      sitemap: { changefreq: 'weekly', priority: 0.8 }
    },
    '/blogs/ai-engineering-revolution': {
      sitemap: { changefreq: 'monthly', priority: 0.7 }
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'author', content: 'Shahab Gohar' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'geo.region', content: 'PK' },
        { name: 'geo.placename', content: 'Pakistan' },
      ],
      link: []
    }
  },

  css: [
    '@/assets/main.css'
  ],

  gtag: {
    id: process.env?.GOOGLE_TAG_MANAGER_ID || '',
    config: {}
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
