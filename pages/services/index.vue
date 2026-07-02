<script setup lang="ts">
definePageMeta({ title: 'Services' })

const siteUrl = 'https://shahabgohar.dev'
const title =
  'SuiteCRM & AI Engineering Services | Custom Modules, Integrations, Migration'
const description =
  'SuiteCRM development, Mautic integration, Salesforce-to-SuiteCRM migration, and AI engineering for B2B teams. Hire one engineer to own the whole outcome.'

const services = [
  {
    to: '/services/ai-development',
    title: 'Custom AI Software (RAG, LLM, Agents)',
    blurb:
      'Production AI software: RAG systems over your data, LLM applications, AI agents and chatbots, and AI features embedded into your app or CRM.'
  },
  {
    to: '/services/suitecrm-development',
    title: 'SuiteCRM Developer & Customization',
    blurb:
      'Custom modules, plugins, workflows, and SuiteCRM 8 Angular customization shaped around how your team actually sells.'
  },
  {
    to: '/services/mautic-suitecrm-integration',
    title: 'Mautic → SuiteCRM Integration',
    blurb:
      'Automated, real-time lead and contact sync between Mautic and SuiteCRM — no manual CSV imports, no missed follow-ups.'
  },
  {
    to: '/services/salesforce-to-suitecrm-migration',
    title: 'Salesforce → SuiteCRM Migration',
    blurb:
      'Move off Salesforce to open-source SuiteCRM without losing data or workflows — and drop the per-seat licensing bill.'
  }
]

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: `${siteUrl}/services/` },
    { property: 'og:image', content: `${siteUrl}/img/og-image.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description }
  ],
  link: [{ rel: 'canonical', href: `${siteUrl}/services/` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'SuiteCRM & AI Engineering Services',
        url: `${siteUrl}/services/`,
        description,
        hasPart: services.map((s) => ({
          '@type': 'Service',
          name: s.title,
          url: `${siteUrl}${s.to}`
        }))
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${siteUrl}/services/`
          }
        ]
      })
    }
  ]
})

const mailto =
  'mailto:shahab.developer.work@gmail.com?subject=Project%20Inquiry'
</script>

<template>
  <main class="min-h-screen bg-secondary text-primary">
    <article class="mx-auto w-full max-w-[920px] px-6 py-8 sm:px-10 lg:px-16">
      <nav
        class="flex items-center justify-between border-b border-primary/10 pb-5 font-ibmMono text-sm"
      >
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info"
        >
          <Icon name="mdi:arrow-left" size="18" />
          Home
        </NuxtLink>
        <NuxtLink
          to="/blogs"
          class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info"
        >
          Blog
          <Icon name="mdi:arrow-top-right-bold-box-outline" size="18" />
        </NuxtLink>
      </nav>

      <header class="pt-10">
        <p class="font-ibmMono text-sm font-semibold uppercase tracking-[0.1em] text-info">
          What I build
        </p>
        <h1
          class="mt-3 font-grotesk text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          Software, AI &amp; CRM engineering services
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-primary/75">
          Hire one engineer to own the whole outcome — custom SuiteCRM,
          marketing automation integration, CRM migration, and the AI layer on
          top. Salesforce-grade results without the Salesforce bill.
        </p>
      </header>

      <section class="mt-12 grid gap-6 sm:grid-cols-2">
        <NuxtLink
          v-for="s in services"
          :key="s.to"
          :to="s.to"
          class="group rounded-lg border border-primary/15 p-6 transition hover:border-info"
        >
          <h2
            class="font-grotesk text-xl font-semibold transition group-hover:text-info"
          >
            {{ s.title }}
          </h2>
          <p class="mt-3 text-sm leading-6 text-primary/70">{{ s.blurb }}</p>
          <span
            class="mt-4 inline-flex items-center gap-2 font-ibmMono text-sm text-info"
          >
            Learn more <Icon name="mdi:arrow-right" size="16" />
          </span>
        </NuxtLink>
      </section>

      <section
        class="mt-14 rounded-lg border border-primary/15 p-8 text-center"
      >
        <h2 class="font-grotesk text-2xl font-semibold sm:text-3xl">
          Not sure which one you need?
        </h2>
        <p class="mx-auto mt-3 max-w-xl text-primary/75">
          Send the CRM problem or product idea and I'll tell you what to build,
          automate, or migrate first.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-4 font-ibmMono text-sm">
          <a
            href="https://cal.com/shahabgohar/build-discussion"
            target="_blank"
            rel="noopener"
            class="rounded-md bg-info px-5 py-3 font-semibold text-secondary transition hover:opacity-90"
          >
            Book a build discussion
          </a>
          <a
            :href="mailto"
            class="rounded-md border border-primary/20 px-5 py-3 font-semibold text-primary transition hover:border-info hover:text-info"
          >
            Email the brief
          </a>
        </div>
      </section>
    </article>
  </main>
</template>
