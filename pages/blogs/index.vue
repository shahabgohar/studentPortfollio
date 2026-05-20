<script lang="ts" setup>
import {definePageMeta} from "#imports";
import {useJsonLd} from "~/composeables/useJsonLd";
import {blogPosts} from "~/data/blogPosts";

const siteUrl = 'https://shahabgohar.dev'
const pageTitle = 'AI Engineering Blog | Shahab Gohar'
const pageDescription = 'Practical AI engineering articles for founders, CTOs, and teams exploring AI ROI, business automation, foundation models, and product delivery.'
definePageMeta({
  title: 'Blogs'
})

useJsonLd()
useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:url', content: `${siteUrl}/blogs` },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: `${siteUrl}/img/og-image.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: `${siteUrl}/img/og-image.png` }
  ],
  link: [
    { rel: 'canonical', href: `${siteUrl}/blogs` }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: pageTitle,
        description: pageDescription,
        url: `${siteUrl}/blogs`,
        author: {
          '@type': 'Person',
          name: 'Shahab Gohar',
          url: siteUrl
        },
        blogPost: blogPosts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          url: `${siteUrl}/blogs/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          author: {
            '@type': 'Person',
            name: 'Shahab Gohar',
            url: siteUrl
          }
        }))
      })
    }
  ]
})
</script>

<template>
  <main class="min-h-screen bg-secondary text-primary">
    <section class="mx-auto flex w-full max-w-[1180px] flex-col px-6 py-8 sm:px-10 lg:px-16">
      <nav class="flex items-center justify-between border-b border-primary/10 pb-5 font-ibmMono text-sm">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info">
          <Icon name="mdi:arrow-left" size="18" />
          Portfolio
        </NuxtLink>
        <a href="mailto:shahab.developer.work@gmail.com" class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info">
          Hire Shahab
          <Icon name="mdi:arrow-top-right" size="18" />
        </a>
      </nav>

      <header class="grid gap-8 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div class="max-w-3xl">
          <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">Field notes</p>
          <h1 class="mt-4 font-oswald text-5xl font-black uppercase leading-none sm:text-6xl lg:text-7xl">
            AI, product, and software delivery
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-primary/70">
            Practical AI engineering writing for founders and technical teams who need sharper AI strategy, better product delivery, and a developer who can turn business automation ideas into shipped systems.
          </p>
        </div>

        <aside class="border-l-2 border-info pl-6">
          <p class="font-ibmMono text-sm text-primary/60">Why read this?</p>
          <p class="mt-3 text-2xl font-semibold leading-snug">
            Each article is written from an engineer's lens: what matters, what breaks, and how to make the next move useful.
          </p>
        </aside>
      </header>

      <section class="grid gap-6">
        <article
          v-for="post in blogPosts"
          :key="post.slug"
          class="group border border-primary/10 bg-primary/[0.03] p-6 transition hover:-translate-y-1 hover:border-info/70 hover:bg-info/5 sm:p-8"
        >
          <div class="flex flex-wrap items-center gap-3 font-ibmMono text-xs uppercase tracking-[0.18em] text-primary/55">
            <span>{{ post.category }}</span>
            <span class="h-1 w-1 rounded-full bg-info"></span>
            <span>{{ post.date }}</span>
            <span class="h-1 w-1 rounded-full bg-info"></span>
            <span>{{ post.readingTime }}</span>
          </div>

          <div class="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 class="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl">
                {{ post.title }}
              </h2>
              <p class="mt-4 max-w-3xl text-base leading-7 text-primary/70">
                {{ post.description }}
              </p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="border border-primary/10 px-3 py-1 font-ibmMono text-xs text-primary/65"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <NuxtLink
              :to="`/blogs/${post.slug}`"
              class="inline-flex items-center justify-center gap-2 border border-info px-5 py-3 font-ibmMono text-sm text-info transition group-hover:bg-info group-hover:text-secondary"
            >
              Read article
              <Icon name="mdi:arrow-right" size="18" />
            </NuxtLink>
          </div>
        </article>
      </section>
    </section>
  </main>
</template>
