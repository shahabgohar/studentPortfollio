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
    slug: 'how-to-get-into-ai-automation',
    title: 'What You Actually Need to Get Into AI Automation',
    description:
      'The real skill stack behind AI automation: no-code tools, programming, SQL, system design, security, prompt engineering, LLM observability, and RAG, plus the order to learn them in.',
    category: 'AI Automation',
    date: 'July 19, 2026',
    datePublished: '2026-07-19T00:00:00+05:00',
    dateModified: '2026-07-19T00:00:00+05:00',
    readingTime: '13 min read',
    tags: ['AI automation', 'n8n', 'RAG', 'Prompt engineering', 'SQL', 'Getting started']
  },
  {
    slug: 'suitecrm-quote-order-invoice-detection',
    title: 'Building Quote to Order to Invoice Detection in SuiteCRM',
    description:
      'A SuiteCRM case study: converting accepted quotes to orders, invoicing order deltas, and detecting supplemental invoices and credit notes.',
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
      'A SuiteCRM migration case study: Docker, Google SSO, calendar sync, OAuth, multilingual fields, and production-ready CRM infrastructure.',
    category: 'Case Study',
    date: 'May 17, 2026',
    datePublished: '2026-05-17T00:00:00+05:00',
    dateModified: '2026-05-17T00:00:00+05:00',
    readingTime: '10 min read',
    tags: ['SuiteCRM migration', 'Docker', 'Google OAuth', 'CRM modernization', 'PHP']
  },
  {
    slug: 'ai-engineering-revolution',
    title: 'The AI Engineering Revolution: Foundation Models Transforming Business',
    description:
      'How AI engineering, foundation models, and automation create measurable ROI, plus where to invest first and how to ship practical AI.',
    category: 'AI Engineering',
    date: 'May 15, 2026',
    datePublished: '2026-05-15T00:00:00+05:00',
    dateModified: '2026-05-15T00:00:00+05:00',
    readingTime: '12 min read',
    tags: ['AI strategy', 'Foundation models', 'Business automation', 'AI ROI']
  }
]
