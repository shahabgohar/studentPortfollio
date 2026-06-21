export const useJsonLd = () => {
  const siteUrl = 'https://shahabgohar.dev'

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shahab Gohar',
    url: siteUrl,
    jobTitle: 'AI Solution Engineer & Full-Stack Developer',
    description:
      'Solution engineer building custom software, business automation, and AI workflows for companies, founders, and creators — with deep SuiteCRM and Mautic expertise.',
    email: 'shahab.developer.work@gmail.com',
    sameAs: [
      'https://www.linkedin.com/in/shahabgohar/',
      'https://github.com/engineershahabgohar'
    ],
    knowsAbout: [
      'Solution Engineering',
      'Business Process Automation',
      'Workflow Automation',
      'Custom Software Development',
      'AI Automation',
      'AI Integration',
      'SuiteCRM',
      'SuiteCRM customization',
      'SuiteCRM 8',
      'SuiteCRM plugin development',
      'Mautic',
      'Mautic to SuiteCRM integration',
      'Salesforce alternatives',
      'Open-source CRM',
      'B2B sales automation',
      'Quote-to-invoice automation',
      'AI workflows for CRM',
      'Artificial Intelligence',
      'Generative AI',
      'Full-Stack Web Development',
      'Vue.js',
      'Nuxt.js',
      'Laravel',
      'Python',
      'JavaScript',
      'TypeScript',
      'API Development',
      'SaaS Development'
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
      name: 'AI Solution Engineer & Full-Stack Developer',
      occupationalCategory: '15-1252.00',
      skills:
        'Solution engineering, business automation, AI workflows, custom software, Vue.js, Nuxt.js, Laravel, Python, JavaScript, TypeScript, API Design, SuiteCRM, Mautic'
    }
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shahab Gohar — AI Solution Engineer & Full-Stack Developer',
    url: siteUrl,
    description:
      'Solution engineering for companies, founders, and creators — custom software, business automation, AI workflows, and CRM builds by Shahab Gohar.',
    keywords:
      'AI solution engineer, business automation, custom software development, AI workflows, full-stack developer, SuiteCRM developer, Mautic integration, workflow automation, app developer for startups',
    author: {
      '@type': 'Person',
      name: 'Shahab Gohar'
    },
    inLanguage: 'en-US'
  }

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Shahab Gohar — Solution Engineering, Automation & AI',
    url: siteUrl,
    description:
      'Solution engineering for companies, founders, and creators — custom software, business automation, AI workflows, integrations, and SuiteCRM/Mautic builds.',
    provider: {
      '@type': 'Person',
      name: 'Shahab Gohar'
    },
    priceRange: '$$',
    areaServed: [
      { '@type': 'Place', name: 'Worldwide' },
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'Portugal' },
      { '@type': 'Country', name: 'Mexico' },
      { '@type': 'Country', name: 'Colombia' },
      { '@type': 'Country', name: 'Argentina' },
      { '@type': 'Country', name: 'Chile' },
      { '@type': 'Country', name: 'Peru' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Germany' }
    ],
    serviceType: [
      'AI Solution Engineering',
      'Business Process Automation',
      'Workflow & Tool Integration',
      'Custom Software Development',
      'Full-Stack Web Application Development (Vue.js, Nuxt, Laravel)',
      'AI Workflows & Applied AI Systems',
      'SuiteCRM Customization & Development',
      'SuiteCRM Plugin Development',
      'Mautic → SuiteCRM Integration',
      'Salesforce-to-SuiteCRM Migration',
      'Quote-to-Invoice Automation'
    ]
  }

  const aiDashletGeneratorSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Dashlet Generator',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'CRM Plugin',
    operatingSystem: 'SuiteCRM',
    url: 'https://store.suitecrm.com/addons/ai-dashlet-generator',
    description:
      'SuiteCRM plugin that uses AI to generate custom dashlets on demand — accelerating reporting and dashboard customization for B2B teams.',
    author: {
      '@type': 'Person',
      name: 'Shahab Gohar',
      url: siteUrl
    },
    offers: {
      '@type': 'Offer',
      url: 'https://store.suitecrm.com/addons/ai-dashlet-generator',
      availability: 'https://schema.org/InStock'
    }
  }

  const businessCardReaderSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Business Card Reader',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'CRM Plugin',
    operatingSystem: 'SuiteCRM',
    url: 'https://store.suitecrm.com/addons/business-card-reader',
    description:
      'SuiteCRM plugin that scans business cards and instantly creates Leads or Contacts — speeding up lead capture for B2B sales teams.',
    author: {
      '@type': 'Person',
      name: 'Shahab Gohar',
      url: siteUrl
    },
    offers: {
      '@type': 'Offer',
      url: 'https://store.suitecrm.com/addons/business-card-reader',
      availability: 'https://schema.org/InStock'
    }
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
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(aiDashletGeneratorSchema)
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(businessCardReaderSchema)
      }
    ]
  })
}