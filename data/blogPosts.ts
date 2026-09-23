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
    slug: 'software-engineering-is-not-dead',
    title: 'The AI Wrote the Fix. I Answered for It.',
    description:
      'Claude Code and I diagnosed why calls were dropping on production voice bots. The fix it built passed every test and missed the cause we had found, so 33 calls dropped the next night. How that happened, and why the person who answers for it is the reason software engineering isn’t dead.',
    category: 'AI Engineering',
    date: 'September 23, 2026',
    datePublished: '2026-09-23T00:00:00+05:00',
    dateModified: '2026-09-23T00:00:00+05:00',
    readingTime: '8 min read',
    tags: ['Claude Code', 'AI coding', 'Software engineering', 'Production incident', 'Voice agents']
  },
  {
    slug: 'suitecrm-google-sso',
    title: 'Google SSO in SuiteCRM 8, and What It Really Takes',
    description:
      'Google sign-in for SuiteCRM 8: when the built-in SAML sign-in is enough, and what a custom build adds when the same login must also grant access to Gmail and Google Calendar.',
    category: 'SuiteCRM Engineering',
    date: 'September 23, 2026',
    datePublished: '2026-09-23T00:00:00+05:00',
    dateModified: '2026-09-23T00:00:00+05:00',
    readingTime: '7 min read',
    tags: ['SuiteCRM', 'Single sign-on', 'Google OAuth', 'Authentication', 'Google Calendar']
  },
  {
    slug: 'move-mysql-innodb-table-to-another-disk',
    title: 'MySQL Disk Full: Moving a 136 GB InnoDB Table to Another Disk',
    description:
      'A production war story: the root disk hit 94% with hours to spare before an army of voice agents went live. How I moved a 136 GB InnoDB table to a spare volume with zero data loss, using MySQL 8.0 innodb_directories, not a symlink.',
    category: 'Database Ops',
    date: 'July 24, 2026',
    datePublished: '2026-07-24T00:00:00+05:00',
    dateModified: '2026-07-24T00:00:00+05:00',
    readingTime: '11 min read',
    tags: ['MySQL', 'InnoDB', 'Database ops', 'DevOps', 'Production incident']
  },
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
