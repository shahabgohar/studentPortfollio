interface MetaTagOptions {
    title?: string
    description?: string
    image?: string
    type?: string
    keywords?: string[]
}

export const useMetaTags = (options?: MetaTagOptions) => {
    const config = useRuntimeConfig()
    const route = useRoute()

    const siteUrl = config.public.siteUrl || 'https://shahabgohar.com'
    const siteName = config.public.siteName || 'Shahab Gohar - Full Stack Developer'
    const faviconVersion = '0.0.3'

    const defaults = {
        title: siteName,
        description: 'Full Stack Web Developer with 5+ years of experience specializing in Vue.js, Nuxt, Laravel, and modern web technologies. Building scalable, user-friendly applications.',
        image: `${siteUrl}/og-image.png`,
        type: 'website',
        keywords: [
            'Full Stack Developer',
            'Vue.js Developer',
            'Nuxt.js',
            'Laravel Developer',
            'Frontend Developer',
            'Backend Developer',
            'Web Developer',
            'TypeScript',
            'JavaScript',
            'Pakistan'
        ]
    }

    const meta = {
        title: options?.title || defaults.title,
        description: options?.description || defaults.description,
        image: options?.image || defaults.image,
        type: options?.type || defaults.type,
        keywords: options?.keywords || defaults.keywords
    }

    const currentUrl = `${siteUrl}${route.path}`

    useHead({
        title: meta.title,
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            // Primary Meta Tags
            { name: 'description', content: meta.description },
            { name: 'keywords', content: meta.keywords.join(', ') },
            { name: 'author', content: 'Shahab Gohar' },
            { name: 'robots', content: 'index, follow' },
            { name: 'theme-color', content: '#000000' },

            // Open Graph / Facebook
            { property: 'og:type', content: meta.type },
            { property: 'og:url', content: currentUrl },
            { property: 'og:title', content: meta.title },
            { property: 'og:description', content: meta.description },
            { property: 'og:image', content: meta.image },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:site_name', content: siteName },
            { property: 'og:locale', content: 'en_US' },

            // Twitter Card
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:url', content: currentUrl },
            { name: 'twitter:title', content: meta.title },
            { name: 'twitter:description', content: meta.description },
            { name: 'twitter:image', content: meta.image },

            // Additional SEO
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
        ],
        link: [
            // Canonical URL
            { rel: 'canonical', href: currentUrl },

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
                color: '#000000',
                href: `/favicon/safari-pinned-tab.svg?v=${faviconVersion}`
            },
            {
                rel: 'shortcut icon',
                href: `/favicon/favicon.ico?v=${faviconVersion}`
            },
            // Preconnect for performance
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
        ],
        script: [
            // JSON-LD Structured Data - Person Schema
            {
                type: 'application/ld+json',
                children: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Person',
                    name: 'Shahab Gohar',
                    jobTitle: 'Full Stack Web Developer',
                    description: meta.description,
                    url: siteUrl,
                    image: meta.image,
                    email: 'shahab.developer.work@gmail.com',
                    sameAs: [
                        'https://www.linkedin.com/in/shahabgohar/',
                        'https://github.com/shahabgohar',
                        'https://www.fiverr.com/shahabgohar'
                    ],
                    knowsAbout: [
                        'Vue.js',
                        'Nuxt.js',
                        'Laravel',
                        'TypeScript',
                        'JavaScript',
                        'PHP',
                        'Tailwind CSS',
                        'Full Stack Development'
                    ],
                    alumniOf: {
                        '@type': 'CollegeOrUniversity',
                        name: 'University of Engineering and Technology, Taxila'
                    }
                })
            },
            // JSON-LD - WebSite Schema
            {
                type: 'application/ld+json',
                children: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    name: siteName,
                    url: siteUrl,
                    description: meta.description,
                    author: {
                        '@type': 'Person',
                        name: 'Shahab Gohar'
                    }
                })
            }
        ]
    })
}
