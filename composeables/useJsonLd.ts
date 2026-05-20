export const useJsonLd = () => {
  const siteUrl = 'https://shahabgohar.dev'

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shahab Gohar',
    url: siteUrl,
    jobTitle: 'SuiteCRM Developer & AI Engineer',
    description:
      'SuiteCRM developer and AI engineer building custom modules, Mautic integrations, and AI workflows for B2B teams as a Salesforce alternative.',
    email: 'shahab.developer.work@gmail.com',
    sameAs: [
      'https://www.linkedin.com/in/shahabgohar/',
      'https://github.com/engineershahabgohar'
    ],
    knowsAbout: [
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
      name: 'SuiteCRM Developer & AI Engineer',
      occupationalCategory: '15-1252.00',
      skills:
        'SuiteCRM, SuiteCRM 8, SuiteCRM customization, Mautic, AI workflows, Vue.js, Nuxt.js, Laravel, Python, JavaScript, TypeScript, API Design, B2B sales automation'
    }
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shahab Gohar — SuiteCRM Developer & AI Engineer',
    url: siteUrl,
    description:
      'SuiteCRM consulting for B2B teams — custom modules, Mautic integrations, AI-powered dashlets, and Salesforce-to-SuiteCRM migrations by Shahab Gohar.',
    keywords:
      'SuiteCRM, SuiteCRM developer, SuiteCRM customization, SuiteCRM plugin, Salesforce alternative, open-source CRM, Mautic integration, B2B CRM, AI CRM, SuiteCRM 8',
    author: {
      '@type': 'Person',
      name: 'Shahab Gohar'
    },
    inLanguage: 'en-US'
  }

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Shahab Gohar — SuiteCRM Consulting & AI Engineering',
    url: siteUrl,
    description:
      'SuiteCRM consulting for B2B teams — custom modules, plugin development, Mautic integrations, AI dashlets, and Salesforce-to-SuiteCRM migrations.',
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
      'SuiteCRM Customization & Development',
      'SuiteCRM Plugin Development',
      'SuiteCRM Migration & Upgrades',
      'Mautic → SuiteCRM Integration',
      'AI Dashlets & Workflows for SuiteCRM',
      'B2B Sales Process Automation',
      'Salesforce-to-SuiteCRM Migration',
      'Quote-to-Invoice Automation',
      'Custom Software Development',
      'Full-Stack Web Application Development (Vue.js, Nuxt, Laravel)'
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