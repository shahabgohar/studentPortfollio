export const useMetaTags = () => {
    const siteUrl = 'https://shahabgohar.dev'
    const faviconVersion = '0.0.3'

    const route = useRoute()

    const defaultTitle = 'Shahab Gohar — Software Engineer | AI & Full-Stack Developer'
    const defaultDescription =
      'SuiteCRM consultant building custom modules, Mautic integrations & AI workflows for B2B teams — Salesforce-grade results without the Salesforce bill.'
    const defaultKeywords =
      'SuiteCRM developer, SuiteCRM customization, SuiteCRM plugin, SuiteCRM consultant, ' +
      'SuiteCRM migration, SuiteCRM 8, Salesforce alternative, open-source CRM, ' +
      'Mautic integration, Mautic to SuiteCRM, B2B CRM, AI CRM, AI dashlets, ' +
      'CRM automation, quote to invoice automation, B2B sales automation, ' +
      'Shahab Gohar, software engineer, AI engineer, full-stack developer, ' +
      'Vue.js developer, Nuxt developer, Laravel developer, Python developer, ' +
      'API development, custom software development, ' +
      'Pakistan software engineer, remote developer for hire'

    const pageTitle = route.meta.title
      ? `${route.meta.title} | Shahab Gohar — Software Engineer`
      : defaultTitle

    const canonicalUrl = `${siteUrl}${route.path === '/' ? '' : route.path}`

    useHead({
        title: pageTitle,
        htmlAttrs: {
          lang: 'en'
        },
        meta: [
            // Core SEO
            { name: 'description', content: defaultDescription },
            { name: 'keywords', content: defaultKeywords },
            { name: 'author', content: 'Shahab Gohar' },
            { name: 'creator', content: 'Shahab Gohar' },
            { name: 'publisher', content: 'Shahab Gohar' },

            // Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'Shahab Gohar — Portfolio' },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: defaultDescription },
            { property: 'og:url', content: canonicalUrl },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:image', content: `${siteUrl}/img/og-image.png` },
            { property: 'og:image:type', content: 'image/png' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:image:alt', content: 'Shahab Gohar — Software Engineer & AI Solutions Architect' },

            // Twitter Card
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: pageTitle },
            { name: 'twitter:description', content: defaultDescription },
            { name: 'twitter:image', content: `${siteUrl}/img/og-image.png` },
            { name: 'twitter:image:alt', content: 'Shahab Gohar — Software Engineer & AI Solutions Architect' },

            // Theme
            { name: 'theme-color', content: '#020208' },
            { name: 'msapplication-TileColor', content: '#020208' },
        ],
        link: [
            // Canonical
            { rel: 'canonical', href: canonicalUrl },
            // Favicons
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: `/favicon/apple-touch-icon.png?v=${faviconVersion}`
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: `/favicon/favicon-32x32.png?v=${faviconVersion}`
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: `/favicon/favicon-16x16.png?v=${faviconVersion}`
            },
            {
                rel: 'manifest',
                href: `/favicon/site.webmanifest?v=${faviconVersion}`
            },
            {
                rel: 'mask-icon',
                color: '#5bbad5',
                href: `/favicon/safari-pinned-tab.svg?v=${faviconVersion}`
            },
            {
                rel: 'shortcut icon',
                href: `/favicon/favicon.ico?v=${faviconVersion}`
            }
        ]
    })
}
