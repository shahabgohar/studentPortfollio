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
