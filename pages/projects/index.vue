<script setup lang="ts">
import { definePageMeta } from '#imports'
import { projects, publishedProducts } from '~/data/projects'

const siteUrl = 'https://shahabgohar.dev'
const title = 'Projects | Shahab Gohar — AI, full-stack & automation'
const description =
  'Selected projects by Shahab Gohar: AI lead automation, LLM extraction pipelines, AI voice-agent platforms, real-time analytics, and CRM automation — built end to end.'

definePageMeta({ title: 'Projects' })

const calUrl = 'https://cal.com/shahabgohar/build-discussion'

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: `${siteUrl}/projects/` },
    { property: 'og:image', content: `${siteUrl}/img/og-image.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [{ rel: 'canonical', href: `${siteUrl}/projects/` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Projects — Shahab Gohar',
        url: `${siteUrl}/projects/`,
        description,
        isPartOf: { '@type': 'WebSite', url: siteUrl, name: 'Shahab Gohar' },
        about: [
          'AI lead automation',
          'LLM extraction',
          'WhatsApp to CRM',
          'AI voice agents',
          'CRM automation',
          'full-stack development',
        ],
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: projects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'CreativeWork',
              name: p.title,
              headline: p.tagline,
              description: p.description,
              keywords: p.tags.join(', '),
              creator: { '@type': 'Person', name: 'Shahab Gohar', url: siteUrl },
            },
          })),
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/projects/` },
        ],
      }),
    },
  ],
})
</script>

<template>
  <main class="min-h-screen bg-secondary font-inter text-primary">
    <div class="mx-auto w-full max-w-[1120px] px-6 sm:px-8">
      <nav class="flex items-center justify-between border-b border-primary/10 py-5 text-sm">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info">
          <Icon name="mdi:arrow-left" size="18" />
          Home
        </NuxtLink>
        <a
          :href="calUrl"
          target="_blank"
          rel="noreferrer"
          class="rounded-lg border border-info px-4 py-2 font-medium text-info transition hover:bg-info hover:text-secondary"
        >
          Book a call
        </a>
      </nav>

      <header class="py-16 lg:py-20">
        <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-info">Projects</p>
        <h1 class="mt-3 max-w-3xl font-grotesk text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          AI, full-stack &amp; automation projects.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-primary/65">
          Things I've designed, built, and shipped — end-to-end work across AI lead automation,
          LLM extraction pipelines, AI voice agents, full-stack product, and CRM automation, each
          taken from problem to a system real teams use in production.
        </p>
      </header>

      <section class="grid gap-4 pb-8 lg:grid-cols-2">
        <component
          :is="p.href ? (p.href.startsWith('http') ? 'a' : 'NuxtLink') : 'article'"
          v-for="p in projects"
          :key="p.title"
          :href="p.href && p.href.startsWith('http') ? p.href : undefined"
          :to="p.href && !p.href.startsWith('http') ? p.href : undefined"
          :target="p.href && p.href.startsWith('http') ? '_blank' : undefined"
          :rel="p.href && p.href.startsWith('http') ? 'noreferrer' : undefined"
          class="flex flex-col rounded-2xl border border-primary/10 bg-primary/[0.02] p-6 transition hover:border-info/70"
          :class="[p.featured ? 'lg:col-span-2 border-info/40 bg-info/[0.04]' : '', p.href ? 'cursor-pointer' : '']"
        >
          <div class="flex items-center gap-3">
            <span class="rounded-full border border-info/40 px-3 py-1 font-ibmMono text-[11px] uppercase tracking-[0.1em] text-info">
              {{ p.category }}
            </span>
            <span v-if="p.featured" class="font-ibmMono text-[11px] uppercase tracking-[0.1em] text-primary/45">Flagship</span>
            <Icon v-if="p.href" name="mdi:arrow-top-right" class="ml-auto text-info" size="20" />
          </div>
          <h2 class="mt-4 font-grotesk text-2xl font-semibold leading-snug">{{ p.title }}</h2>
          <p class="mt-1 font-ibmMono text-[12.5px] text-primary/50">{{ p.tagline }}</p>
          <p class="mt-4 leading-7 text-primary/65">{{ p.description }}</p>
          <p class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-info">
            <Icon name="mdi:check-circle-outline" size="16" />
            {{ p.result }}
          </p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="tag in p.tags"
              :key="tag"
              class="rounded-md border border-primary/10 px-2.5 py-1 font-ibmMono text-xs text-primary/60"
            >
              {{ tag }}
            </span>
          </div>
        </component>
      </section>

      <section class="border-t border-primary/10 py-16">
        <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-info">Published products</p>
        <h2 class="mt-3 font-grotesk text-3xl font-bold tracking-tight">Live on a public marketplace.</h2>
        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            v-for="prod in publishedProducts"
            :key="prod.title"
            :href="prod.url"
            target="_blank"
            rel="noreferrer"
            class="group rounded-2xl border border-primary/10 bg-primary/[0.02] p-6 transition hover:border-info/70"
          >
            <div class="flex items-center justify-between">
              <h3 class="font-grotesk text-xl font-semibold">{{ prod.title }}</h3>
              <Icon name="mdi:arrow-top-right" class="text-info" size="20" />
            </div>
            <p class="mt-3 leading-7 text-primary/65">{{ prod.blurb }}</p>
          </a>
        </div>
      </section>

      <section class="pb-20">
        <div class="rounded-3xl border border-info/40 bg-info/[0.06] p-8 text-center sm:p-12">
          <h2 class="font-grotesk text-3xl font-bold tracking-tight sm:text-4xl">
            Have something like this to build?
          </h2>
          <p class="mx-auto mt-4 max-w-xl text-lg leading-8 text-primary/65">
            Send the problem and I'll tell you what to build, automate, or fix first — working demo
            in two weeks, or you don't pay.
          </p>
          <a
            :href="calUrl"
            target="_blank"
            rel="noreferrer"
            class="mt-6 inline-flex items-center gap-2 rounded-xl bg-info px-5 py-3 font-semibold text-secondary transition hover:opacity-90"
          >
            Book a 30-min build call
            <Icon name="mdi:calendar-arrow-right" size="18" />
          </a>
        </div>
      </section>
    </div>
  </main>
</template>
