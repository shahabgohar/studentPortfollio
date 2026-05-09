export const useJsonLd = () => {
  const siteUrl = 'https://shahabgohar.dev'

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shahab Gohar',
    url: siteUrl,
    jobTitle: 'Software Engineer',
    description:
      'Senior Software Engineer specializing in AI engineering, full-stack development, and scalable business solutions.',
    email: 'shahab.developer.work@gmail.com',
    sameAs: [
      'https://www.linkedin.com/in/shahabgohar/',
      'https://github.com/engineershahabgohar'
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Generative AI',
      'Software Engineering',
      'Full-Stack Web Development',
      'Vue.js',
      'Nuxt.js',
      'React',
      'Laravel',
      'Python',
      'JavaScript',
      'TypeScript',
      'API Development',
      'Business Solutions',
      'SaaS Development',
      'Cloud Architecture',
      'CI/CD',
      'Mobile App Development'
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Engineering and Technology, Taxila',
      url: 'https://www.uettaxila.edu.pk/'
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Esper Solutions'
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Engineer',
      occupationalCategory: '15-1252.00',
      skills:
        'Vue.js, Nuxt.js, React, Laravel, Python, JavaScript, TypeScript, AI/ML, API Design, Cloud Architecture'
    }
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shahab Gohar — Software Engineer & AI Solutions Architect',
    url: siteUrl,
    description:
      'Portfolio of Shahab Gohar — Software Engineer building AI-powered products, scalable web applications, and business solutions.',
    author: {
      '@type': 'Person',
      name: 'Shahab Gohar'
    },
    inLanguage: 'en-US'
  }

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Shahab Gohar — Software Development Services',
    url: siteUrl,
    description:
      'Custom software development, AI solutions, full-stack web applications, and business automation by Shahab Gohar.',
    provider: {
      '@type': 'Person',
      name: 'Shahab Gohar'
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide'
    },
    serviceType: [
      'Custom Software Development',
      'AI Engineering & Generative AI Products',
      'Full-Stack Web Application Development',
      'Business Process Automation',
      'SaaS Product Development',
      'API Design & Integration',
      'Frontend Development (Vue.js, Nuxt, React)',
      'Backend Development (Laravel, Python)',
      'Mobile App Development'
    ]
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(personSchema)
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(websiteSchema)
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(professionalServiceSchema)
      }
    ]
  })
}