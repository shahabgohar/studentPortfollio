import { writeFile } from 'node:fs/promises'

const siteUrl = 'https://shahabgohar.dev'

const routes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: '2026-06-15'
  },
  {
    path: '/services',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: '2026-06-15'
  },
  {
    path: '/services/ai-development',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: '2026-06-15'
  },
  {
    path: '/services/suitecrm-development',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: '2026-06-15'
  },
  {
    path: '/services/mautic-suitecrm-integration',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: '2026-06-15'
  },
  {
    path: '/services/salesforce-to-suitecrm-migration',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: '2026-06-15'
  },
  {
    path: '/blogs',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: '2026-06-04'
  },
  {
    path: '/privacy',
    changefreq: 'yearly',
    priority: '0.4',
    lastmod: '2026-05-18'
  },
  {
    path: '/cookies',
    changefreq: 'yearly',
    priority: '0.4',
    lastmod: '2026-05-18'
  },
  {
    path: '/blogs/ai-engineering-revolution',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: '2026-05-15'
  },
  {
    path: '/blogs/suitecrm-migration-european-textile-company',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: '2026-05-17'
  },
  {
    path: '/blogs/suitecrm-quote-order-invoice-detection',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: '2026-06-04'
  }
]

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const urlEntries = routes
  .map((route) => {
    const loc = `${siteUrl}${route.path === '/' ? '/' : route.path}`
    const lines = [
      '  <url>',
      `    <loc>${escapeXml(loc)}</loc>`
    ]

    if (route.lastmod) {
      lines.push(`    <lastmod>${route.lastmod}</lastmod>`)
    }

    if (route.changefreq) {
      lines.push(`    <changefreq>${route.changefreq}</changefreq>`)
    }

    if (route.priority) {
      lines.push(`    <priority>${route.priority}</priority>`)
    }

    lines.push('  </url>')
    return lines.join('\n')
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap)
console.log('Generated public/sitemap.xml')
