interface Faq {
  q: string
  a: string
}

interface ServiceSeoOptions {
  path: string // e.g. '/services/suitecrm-development'
  title: string // full <title>
  description: string
  serviceName: string
  serviceType: string[]
  breadcrumbName: string
  faqs?: Faq[]
}

/**
 * Per-page SEO for service landing pages: title/description/canonical/OG/Twitter
 * plus Service, BreadcrumbList and (optional) FAQPage JSON-LD.
 */
export const useServiceSeo = (opts: ServiceSeoOptions) => {
  const siteUrl = 'https://shahabgohar.dev'
  const url = `${siteUrl}${opts.path}`

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.serviceName,
    serviceType: opts.serviceType,
    url,
    description: opts.description,
    provider: {
      '@type': 'Person',
      name: 'Shahab Gohar',
      url: siteUrl,
      jobTitle: 'SuiteCRM Developer & AI Engineer'
    },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      availableLanguage: 'en'
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${siteUrl}/services`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: opts.breadcrumbName,
        item: url
      }
    ]
  }

  const scripts: { type: string; innerHTML: string }[] = [
    { type: 'application/ld+json', innerHTML: JSON.stringify(serviceSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbSchema) }
  ]

  if (opts.faqs && opts.faqs.length) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: opts.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      })
    })
  }

  useHead({
    title: opts.title,
    meta: [
      { name: 'description', content: opts.description },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: opts.title },
      { property: 'og:description', content: opts.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: `${siteUrl}/img/og-image.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: opts.title },
      { name: 'twitter:description', content: opts.description },
      { name: 'twitter:image', content: `${siteUrl}/img/og-image.png` }
    ],
    link: [{ rel: 'canonical', href: url }],
    script: scripts
  })
}
