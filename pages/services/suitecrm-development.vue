<script setup lang="ts">
import { useServiceSeo } from '~/composeables/useServiceSeo'

definePageMeta({ title: 'SuiteCRM Development' })

const faqs = [
  {
    q: 'What does a SuiteCRM developer actually do?',
    a: 'A SuiteCRM developer builds custom modules, fields, and relationships, writes logic hooks and scheduler jobs, customizes the Angular (SuiteCRM 8) and legacy views, builds workflows and reports, and integrates SuiteCRM with other tools through its APIs. The goal is to bend SuiteCRM around your real sales and operations process instead of forcing your team to work around the CRM.'
  },
  {
    q: 'Can you customize both SuiteCRM 7 and SuiteCRM 8?',
    a: 'Yes. I work across SuiteCRM 7.x legacy views and the SuiteCRM 8 Angular front end, including re-implementing old custom JavaScript as native SuiteCRM 8 field actions so business rules survive the upgrade.'
  },
  {
    q: 'Is SuiteCRM a real alternative to Salesforce?',
    a: 'For many B2B teams, yes. SuiteCRM is open source, self-hosted, and free of per-seat licensing, so you get custom modules, automation, and integrations without the recurring Salesforce bill. The trade-off is that it needs an experienced developer to customize and maintain — which is exactly the work I do.'
  },
  {
    q: 'How do we start a SuiteCRM project?',
    a: 'Book a 30-minute build call or email the brief. We define the highest-value workflow first, I build a working version with real data paths, then we harden it for production. You typically see a working demo within two weeks.'
  },
  {
    q: 'Do you offer ongoing SuiteCRM support and maintenance?',
    a: 'Yes — upgrades, bug fixes, new modules, performance work, and integration maintenance can be handled on a retainer or per-project basis after the initial build.'
  }
]

useServiceSeo({
  path: '/services/suitecrm-development/',
  title:
    'SuiteCRM Developer & Customization | Modules & Plugins',
  description:
    'Hire an experienced SuiteCRM developer for custom modules, plugins, workflows, SuiteCRM 8 Angular work, and integrations — without the Salesforce bill.',
  serviceName: 'SuiteCRM Customization & Development',
  serviceType: [
    'SuiteCRM Customization & Development',
    'SuiteCRM Plugin Development',
    'SuiteCRM 8 Angular Customization',
    'SuiteCRM Workflow & Automation'
  ],
  breadcrumbName: 'SuiteCRM Development',
  faqs
})

const sections = [
  {
    heading: 'SuiteCRM development that fits your process',
    paragraphs: [
      'Most teams do not need more CRM features — they need the CRM to match how they actually sell, quote, and follow up. I build custom SuiteCRM modules, fields, relationships, logic hooks, and scheduler jobs so the system does the work your spreadsheets and manual steps do today.',
      'I work across the full SuiteCRM stack: the SuiteCRM 8 Angular front end, the legacy 7.x views, PHP back-end logic, and the REST and v8 APIs used for integrations. That means one person can own the outcome instead of you coordinating a designer, a back-end developer, and an integrator.'
    ]
  },
  {
    heading: 'What I build in SuiteCRM',
    bullets: [
      'Custom modules, fields, panels, and relationships tailored to your sales and operations data',
      'Quote-to-order-to-invoice automation with line-item change detection',
      'Logic hooks, workflow automation, and scheduler jobs that remove manual follow-up',
      'SuiteCRM 8 Angular field actions, detail/edit view customization, and full re-theming',
      'Custom dashlets, reports, and AI-assisted reporting add-ons',
      'Integrations with Mautic, marketing tools, ERPs, and external APIs'
    ]
  },
  {
    heading: 'Why open-source SuiteCRM instead of Salesforce',
    paragraphs: [
      'SuiteCRM is open source and self-hosted, so there is no per-seat licensing tax that grows with your team. You own the data and the deployment, and you can customize anything without waiting on a vendor roadmap.',
      'The catch is that SuiteCRM rewards good engineering. Done carelessly it becomes brittle; done well it becomes a durable, version-controlled system that survives upgrades. That engineering discipline — Docker-based deployments, clean customizations, and tested upgrade paths — is the core of how I work.'
    ]
  },
  {
    heading: 'Proof from real SuiteCRM work',
    paragraphs: [
      'Recent SuiteCRM projects include migrating a European textile manufacturer to a reproducible SuiteCRM 8 Docker deployment with Google SSO and multilingual fields, automating a US client’s quote-to-order-to-invoice pipeline, and re-theming SuiteCRM 8 into a white-labelled product a partner now resells. Two productized SuiteCRM add-ons — an AI Dashlet Generator and a Business Card Reader — are published on the SuiteCRM Store.'
    ]
  }
]
</script>

<template>
  <ServiceLanding
    eyebrow="SuiteCRM development"
    h1="SuiteCRM Developer & Customization Services"
    lede="Custom SuiteCRM modules, plugins, workflows, and SuiteCRM 8 Angular customization — built by an engineer who has shipped real SuiteCRM products for B2B teams across the US, UK, and Europe."
    :sections="sections"
    :faqs="faqs"
    :related="[
      { to: '/services/mautic-suitecrm-integration/', label: 'Mautic → SuiteCRM integration' },
      { to: '/services/salesforce-to-suitecrm-migration/', label: 'Salesforce to SuiteCRM migration' },
      { to: '/blogs/suitecrm-migration-european-textile-company/', label: 'Case study: rebuilding SuiteCRM for a European company' }
    ]"
  />
</template>
