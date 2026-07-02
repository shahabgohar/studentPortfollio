export type BlogPost = {
  slug: string
  title: string
  description: string
  category: string
  date: string
  datePublished: string
  dateModified: string
  readingTime: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'suitecrm-quote-order-invoice-detection',
    title: 'Building Quote to Order to Invoice Detection in SuiteCRM',
    description:
      'A practical SuiteCRM customization case study covering accepted quote conversion, order invoicing, line item snapshots, supplemental invoice detection, and credit note handling.',
    category: 'SuiteCRM Automation',
    date: 'June 4, 2026',
    datePublished: '2026-06-04T00:00:00+05:00',
    dateModified: '2026-06-04T00:00:00+05:00',
    readingTime: '9 min read',
    tags: ['SuiteCRM', 'CRM automation', 'PHP', 'Invoicing', 'Business workflow']
  },
  {
    slug: 'suitecrm-migration-european-textile-company',
    title: 'Case Study: Rebuilding SuiteCRM for a European Textile Company',
    description:
      'A practical SuiteCRM migration case study covering Docker, Google SSO, calendar sync, OAuth, multilingual CRM fields, permissions, and production-ready CRM infrastructure.',
    category: 'Case Study',
    date: 'May 17, 2026',
    datePublished: '2026-05-17T00:00:00+05:00',
    dateModified: '2026-05-17T00:00:00+05:00',
    readingTime: '10 min read',
    tags: ['SuiteCRM migration', 'Docker', 'Google OAuth', 'CRM modernization', 'PHP']
  },
  {
    slug: 'ai-engineering-revolution',
    title: 'The AI Engineering Revolution: How Foundation Models Are Transforming Business',
    description:
      'Learn how AI engineering, foundation models, and business automation create measurable ROI for companies, plus where to invest first and how to ship practical AI products.',
    category: 'AI Engineering',
    date: 'May 15, 2026',
    datePublished: '2026-05-15T00:00:00+05:00',
    dateModified: '2026-05-15T00:00:00+05:00',
    readingTime: '12 min read',
    tags: ['AI strategy', 'Foundation models', 'Business automation', 'AI ROI']
  }
]
