<script setup lang="ts">
import { useServiceSeo } from '~/composeables/useServiceSeo'

definePageMeta({ title: 'Mautic → SuiteCRM Integration' })

const faqs = [
  {
    q: 'Can Mautic and SuiteCRM be integrated without a paid plugin?',
    a: 'Yes. I build direct, custom syncs between Mautic and SuiteCRM using their APIs, so you are not locked into a third-party connector’s limits or recurring fees. When an off-the-shelf plugin is the right call, I can install and customize that too.'
  },
  {
    q: 'What data syncs between Mautic and SuiteCRM?',
    a: 'Typically leads, contacts, accounts, form submissions, campaign membership, and activity. New leads captured by Mautic forms, landing pages, and campaigns are pushed into SuiteCRM the moment they convert, and CRM updates can flow back to Mautic for segmentation.'
  },
  {
    q: 'Does the sync run automatically and in real time?',
    a: 'Yes. I set up event-driven and scheduled syncs so marketing leads land in the sales team’s CRM inbox without manual CSV imports, with de-duplication and field mapping handled correctly.'
  },
  {
    q: 'Can you white-label a Mautic + SuiteCRM stack for resale?',
    a: 'Yes. I have built an automated Mautic → SuiteCRM sync for a partner who now resells a white-labelled CRM with native Mautic marketing automation to their own downstream customers.'
  }
]

useServiceSeo({
  path: '/services/mautic-suitecrm-integration',
  title: 'Mautic to SuiteCRM Integration | Automated Lead & Contact Sync',
  description:
    'Connect Mautic marketing automation with SuiteCRM. Real-time, automated lead and contact sync with de-duplication and field mapping — no manual CSV imports, no missed follow-ups.',
  serviceName: 'Mautic to SuiteCRM Integration',
  serviceType: [
    'Mautic to SuiteCRM Integration',
    'Marketing Automation Integration',
    'CRM Lead Sync Automation'
  ],
  breadcrumbName: 'Mautic → SuiteCRM Integration',
  faqs
})

const sections = [
  {
    heading: 'Marketing and sales on one pipeline',
    paragraphs: [
      'Mautic is excellent at capturing and nurturing leads; SuiteCRM is where sales actually works them. The gap between the two is where leads go cold — exports, manual imports, and stale lists. I close that gap with an automated, two-way sync so a lead captured in Mautic appears in SuiteCRM the moment it converts.',
      'Because I build SuiteCRM customizations and Mautic integrations directly, the sync is shaped around your funnel — your field names, your stages, your de-duplication rules — not a generic connector’s defaults.'
    ]
  },
  {
    heading: 'What the integration delivers',
    bullets: [
      'Real-time push of new Mautic leads and contacts into SuiteCRM',
      'Form, landing page, and campaign data mapped to the right SuiteCRM fields',
      'De-duplication so the same person is not created twice',
      'Two-way updates so CRM changes can inform Mautic segmentation',
      'Scheduled reconciliation jobs as a safety net for missed events',
      'Optional white-label packaging for partners reselling the stack'
    ]
  },
  {
    heading: 'Built and proven in production',
    paragraphs: [
      'I built an automated Mautic → SuiteCRM sync for a US SuiteCRM partner that pushes new leads and contacts from Mautic forms, campaigns, and landing pages straight into SuiteCRM. The partner now resells a white-labelled CRM with native Mautic integration to their downstream customers — with no manual list imports and no missed follow-ups.'
    ]
  }
]
</script>

<template>
  <ServiceLanding
    eyebrow="Mautic + SuiteCRM"
    h1="Mautic to SuiteCRM Integration"
    lede="Automated, real-time lead and contact sync between Mautic marketing automation and SuiteCRM — de-duplicated, correctly field-mapped, and built around your funnel instead of a generic connector."
    :sections="sections"
    :faqs="faqs"
    :related="[
      { to: '/services/suitecrm-development', label: 'SuiteCRM development & customization' },
      { to: '/services/salesforce-to-suitecrm-migration', label: 'Salesforce to SuiteCRM migration' },
      { to: '/blogs/suitecrm-migration-european-textile-company', label: 'Case study: rebuilding SuiteCRM for a European company' }
    ]"
  />
</template>
