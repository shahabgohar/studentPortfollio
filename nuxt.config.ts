// https://nuxt.com/docs/api/configuration/nuxt-config

// Runs before first paint so a saved dark-mode choice never flashes light.
// Light is the brand default; nothing here follows the OS preference.
const themeBootScript =
  "(function(){try{var t=localStorage.getItem('shahab-theme');if(t==='myDark'||t==='myLight'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})()"

export default defineNuxtConfig({
  devtools: { enabled: true },

  site: {
    url: 'https://shahabgohar.dev',
    name: 'Shahab Gohar, AI Engineer',
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],

  // Icons and fonts are local on purpose (components/Icon.vue, public/fonts):
  // no icon API calls at runtime and no third-party font CSS.
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-gtag'
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en', 'data-theme': 'myLight' },
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
        // The single display/body font, fetched in parallel with the HTML so
        // the poster headline paints in its real face.
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/archivo-var.v1.woff2', crossorigin: 'anonymous' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png?v=0.0.4' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png?v=0.0.4' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png?v=0.0.4' },
        { rel: 'manifest', href: '/favicon/site.webmanifest?v=0.0.4' },
        { rel: 'mask-icon', color: '#FF4F12', href: '/favicon/safari-pinned-tab.svg?v=0.0.4' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico?v=0.0.4' }
      ],
      script: [
        { innerHTML: themeBootScript, tagPosition: 'head' },
      ],
    }
  },

  experimental: {
    // Nothing on this site fetches data, so per-route _payload.json files are
    // empty. Inlining them drops a request from every page load and prefetch.
    payloadExtraction: false,
    // Do NOT turn on `viewTransition` here. Most routes are prerendered under
    // both /path and /path/ (same index.html), so on load the client router
    // replaces /path with /path/. Nuxt treats that as a page change and starts
    // a view transition that never finishes: measured 4 s of frozen rendering
    // on every affected page load, plus two uncaught errors.
  },

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
})
