<script setup lang="ts">
import { useServiceSeo } from '~/composeables/useServiceSeo'

definePageMeta({ title: 'Salesforce to SuiteCRM Migration' })

const faqs = [
  {
    q: 'Why migrate from Salesforce to SuiteCRM?',
    a: 'The most common reason is cost: Salesforce per-seat licensing scales painfully as a team grows. SuiteCRM is open source and self-hosted, so you keep custom modules, automation, and integrations without the recurring license bill, and you own your data and deployment.'
  },
  {
    q: 'Will I lose my data or customizations in the migration?',
    a: 'No — that is the whole point of doing it carefully. Accounts, contacts, leads, opportunities, activities, and attachments are mapped and migrated with validation, and Salesforce automations and custom objects are re-implemented as SuiteCRM modules, workflows, and logic hooks.'
  },
  {
    q: 'How long does a Salesforce to SuiteCRM migration take?',
    a: 'It depends on data volume and how much custom logic exists in Salesforce. A focused migration of core records plus the highest-value workflows can produce a working SuiteCRM environment in a few weeks; complex orgs take longer and are best done in phases.'
  },
  {
    q: 'Can SuiteCRM do what my Salesforce setup does?',
    a: 'For most B2B sales and operations workflows, yes. SuiteCRM supports custom modules, fields, relationships, workflow automation, reporting, role-based security, and API integrations. Where Salesforce uses proprietary features, I re-build the equivalent natively in SuiteCRM.'
  }
]

useServiceSeo({
  path: '/services/salesforce-to-suitecrm-migration',
  title: 'Salesforce to SuiteCRM Migration | Cut CRM Licensing Costs',
  description:
    'Migrate from Salesforce to open-source SuiteCRM without losing data or workflows. Records, custom objects, and automations re-built natively — Salesforce-grade results without the Salesforce bill.',
  serviceName: 'Salesforce to SuiteCRM Migration',
  serviceType: [
    'Salesforce to SuiteCRM Migration',
    'CRM Data Migration',
    'CRM Re-platforming'
  ],
  breadcrumbName: 'Salesforce to SuiteCRM Migration',
  faqs
})

const sections = [
  {
    heading: 'Keep the workflow, drop the licensing bill',
    paragraphs: [
      'Migrating from Salesforce to SuiteCRM is not about settling for less — it is about owning your CRM. SuiteCRM is open source and self-hosted, so you keep custom modules, automation, reporting, and integrations while removing the per-seat license cost that grows every time you hire.',
      'A migration done well preserves everything that matters: your records, your relationships, and the business rules your team relies on. The difference is in the engineering — clean data mapping, validation, and re-implementing automations natively rather than bolting on fragile workarounds.'
    ]
  },
  {
    heading: 'How the migration works',
    bullets: [
      'Audit your Salesforce org: objects, fields, automations, and integrations',
      'Map and migrate accounts, contacts, leads, opportunities, activities, and attachments',
      'Re-build custom objects as SuiteCRM modules with the right relationships',
      'Re-implement Salesforce flows and validation as SuiteCRM workflows and logic hooks',
      'Reconnect integrations (marketing, ERP, telephony) via SuiteCRM APIs',
      'Deploy on a reproducible, version-controlled Docker setup for safe upgrades'
    ]
  },
  {
    heading: 'Reproducible, upgrade-safe deployments',
    paragraphs: [
      'I deploy SuiteCRM on versioned, Docker-based infrastructure so the system is reproducible, easy to debug, and safe to upgrade — the same approach I used to rebuild a European manufacturer’s SuiteCRM into a clean SuiteCRM 8 deployment with Google SSO, calendar sync, and multilingual fields. Your migrated CRM is something you can maintain with confidence, not a black box.'
    ]
  }
]
</script>

<template>
  <ServiceLanding
    eyebrow="Salesforce → SuiteCRM"
    h1="Salesforce to SuiteCRM Migration"
    lede="Move off Salesforce to open-source SuiteCRM without losing data or workflows. Records, custom objects, and automations re-built natively — Salesforce-grade results without the recurring Salesforce bill."
    :sections="sections"
    :faqs="faqs"
    :related="[
      { to: '/services/suitecrm-development', label: 'SuiteCRM development & customization' },
      { to: '/services/mautic-suitecrm-integration', label: 'Mautic → SuiteCRM integration' },
      { to: '/blogs/suitecrm-migration-european-textile-company', label: 'Case study: rebuilding SuiteCRM for a European company' }
    ]"
  />
</template>
