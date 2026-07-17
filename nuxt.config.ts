// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  site: {
    url: 'https://shahabgohar.dev',
    name: 'Shahab Gohar, AI Automation Engineer',
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
    'nuxt-gtag'
  ],

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
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png?v=0.0.3' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png?v=0.0.3' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png?v=0.0.3' },
        { rel: 'manifest', href: '/favicon/site.webmanifest?v=0.0.3' },
        { rel: 'mask-icon', color: '#565BCF', href: '/favicon/safari-pinned-tab.svg?v=0.0.3' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico?v=0.0.3' }
      ]
    }
  },

  css: [
    '@/assets/main.css'
  ],

  nitro: {
    prerender: {
      // Redirect targets no internal link points at (cal.com booking and the
      // opt-in form land here) still need static HTML in the generate output.
      routes: ['/thanks', '/automation-audit', '/automation-audit/thanks'],
    },
  },

  gtag: {
    initMode: 'manual',
    id: process.env?.GOOGLE_ANALYTICS_ID || 'G-KQCTM71LNQ',
    initCommands: [
      ['consent', 'default', {
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        ad_storage: 'denied',
        analytics_storage: 'denied',
        wait_for_update: 500,
      }]
    ],
    config: {
      anonymize_ip: true
    }
  },

  googleFonts: {
    // Three families only: display / body / mono. Legacy fonts (Oswald, VT323,
    // Roboto Mono, Space Grotesk, Inter) were loaded for components no page
    // renders anymore; dropping them cuts render-blocking font weight for LCP.
    display: 'swap',
    preload: true,
    families: {
      'Bricolage Grotesque': [600, 700, 800],
      'Geist': [400, 500, 600],
      'IBM Plex Mono': [400, 500],
    },
  }
})
