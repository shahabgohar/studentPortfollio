<script setup lang="ts">
import { useServiceSeo } from '~/composeables/useServiceSeo'

definePageMeta({ title: 'Odoo Development' })

// Added 2026-10-06 at the owner's request. He builds on Odoo 19, and every
// "What I build" bullet restates Odoo work he has described. The proof
// section restates SuiteCRM, billing and Python work from elsewhere on the
// site. Don't add Odoo client results, partner status or years of Odoo
// experience unless he supplies them. The Odoo Online and tree-to-list facts
// are from Odoo's documentation.
const faqs = [
  {
    q: 'What does an Odoo developer do?',
    a: "An Odoo developer builds add-on modules: Python models and fields stored in PostgreSQL, XML views, menus and actions, access rules, and data files. Most of the work extends Odoo's standard apps through inheritance (new fields on existing models, inherited views, overridden methods), so Odoo's own code stays untouched and the module installs or upgrades on your database like any other app."
  },
  {
    q: 'Can I add custom modules to Odoo Online?',
    a: "No. Odoo's documentation says Odoo Online is incompatible with custom modules and with modules from the Odoo Apps Store; it supports only changes that need no code, such as Odoo Studio. Custom modules need Odoo.sh or your own server. Self-hosting the Community edition is free; Enterprise on Odoo.sh or your own server needs Odoo's Custom plan."
  },
  {
    q: 'Which Odoo versions do you work with?',
    a: 'I build on Odoo 19. Older versions share the same module structure, but some APIs changed between releases (Odoo 18, for example, renamed tree views to list views), so I check your version and installed modules before quoting.'
  },
  {
    q: 'Are you an official Odoo partner?',
    a: 'No, I am an independent developer. You keep your Odoo subscription with Odoo or your partner, and you work directly with the engineer who writes your modules.'
  },
  {
    q: 'How do we start an Odoo project?',
    a: 'Book a 30-minute build call or email the brief, and tell me your Odoo version and where it is hosted. We pick the highest-value change first, I build it as a module against a copy of your database, then we install it on production. You typically see a working demo inside 14 days.'
  }
]

useServiceSeo({
  path: '/services/odoo-development/',
  title: 'Odoo Developer | Custom Modules, Views & Integrations',
  description:
    'Hire an Odoo developer for custom Odoo 19 modules, inherited views and integrations, built by extending Odoo instead of editing its code.',
  serviceName: 'Odoo Development & Customization',
  serviceType: [
    'Odoo Development & Customization',
    'Odoo Custom Module Development',
    'Odoo View Customization',
    'Odoo Integration'
  ],
  breadcrumbName: 'Odoo Development',
  faqs
})

const sections = [
  {
    heading: 'Odoo development that fits your process',
    paragraphs: [
      "Odoo's standard apps cover a lot: CRM, sales, inventory, invoicing. The work starts where your process differs from the standard: a field your team still keeps in a spreadsheet, an approval step, a rule that should stop bad data before it reaches an invoice. I build those as custom Odoo modules, so they install and upgrade like any other app.",
      "I extend Odoo the way it is built to be extended: inherited models and views, and method overrides that call super(), instead of edits to Odoo's own code. Odoo's bug fixes keep applying, and your changes live in their own module, which you can read, review, and keep in version control."
    ]
  },
  {
    heading: 'What I build in Odoo',
    bullets: [
      'Custom modules with their own models, fields, and relations, plus the menus, actions, and form, list, and search views to work with them',
      'Changes to standard apps through inheritance: new fields on existing models, inherited views, and create or write overrides',
      'Business rules in the model: computed fields, constraints that block bad data, and clear error messages for your users',
      'Fields that keep a separate value per company in multi-company databases',
      'Data files and imports that use external IDs, so loading them again updates the same records instead of creating duplicates',
      'Self-hosted Odoo laid out the same way in development and production, with backups that cover both the database and the filestore',
      'Integrations between Odoo and the tools around it: payments, WhatsApp, marketing automation, and AI'
    ]
  },
  {
    heading: 'What I bring from CRM and automation work',
    paragraphs: [
      "My Odoo work builds on CRM engineering I've already shipped elsewhere. Two SuiteCRM add-ons I built at Esper Solutions are live on the SuiteCRM Store. I moved a European textile manufacturer's CRM onto a reproducible Docker deployment with Google SSO, and built a billing system that matches calendar bookings to Stripe payments and creates the Xero invoices, running unattended in production.",
      'Odoo runs on Python and PostgreSQL, the same stack behind my production AI and automation systems, including a WhatsApp-to-CRM lead pipeline with zero unintended writes against a live CRM.'
    ]
  }
]
</script>

<template>
  <ServiceLanding
    eyebrow="Odoo development"
    h1="Odoo Developer for Custom Modules & Integrations"
    lede="Custom Odoo modules, views, and integrations that extend Odoo instead of patching its code. Built by the engineer behind two SuiteCRM Store add-ons and a Stripe-to-Xero billing system running in production."
    :sections="sections"
    :faqs="faqs"
    cta="Send the Odoo change, module idea, integration, or broken workflow. You'll get a clear build path and a working demo in 14 days, or you don't pay."
    :related="[
      { to: '/services/suitecrm-development/', label: 'SuiteCRM development & customization' },
      { to: '/services/ai-development/', label: 'AI development: RAG, LLM apps & agents' },
      { to: '/projects/', label: 'Projects, including the Stripe-to-Xero billing build' }
    ]"
  />
</template>
