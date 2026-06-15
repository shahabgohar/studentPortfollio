<script setup lang="ts">
interface FaqItem {
  q: string
  a: string
}
interface ContentSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}
interface RelatedLink {
  to: string
  label: string
}

defineProps<{
  eyebrow: string
  h1: string
  lede: string
  sections: ContentSection[]
  faqs?: FaqItem[]
  related?: RelatedLink[]
}>()

const mailto =
  'mailto:shahab.developer.work@gmail.com?subject=Project%20Inquiry'
const callUrl = 'https://cal.com/shahabgohar/build-discussion'
</script>

<template>
  <main class="min-h-screen bg-secondary text-primary">
    <article class="mx-auto w-full max-w-[920px] px-6 py-8 sm:px-10 lg:px-16">
      <!-- Top nav -->
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

      <!-- Hero -->
      <header class="pt-10">
        <p class="font-vt323 text-lg uppercase tracking-wide text-info">
          {{ eyebrow }}
        </p>
        <h1
          class="mt-3 font-oswald text-4xl font-black uppercase leading-tight sm:text-5xl lg:text-6xl"
        >
          {{ h1 }}
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-primary/75">
          {{ lede }}
        </p>
        <div class="mt-8 flex flex-wrap gap-4 font-ibmMono text-sm">
          <a
            :href="callUrl"
            target="_blank"
            rel="noopener"
            class="rounded-md bg-info px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Book a 30-min build call
          </a>
          <a
            :href="mailto"
            class="rounded-md border border-primary/20 px-5 py-3 font-semibold text-primary transition hover:border-info hover:text-info"
          >
            Email the brief
          </a>
        </div>
      </header>

      <!-- Body sections -->
      <section class="mt-14 space-y-12">
        <div v-for="(section, i) in sections" :key="i">
          <h2 class="font-oswald text-2xl font-bold uppercase sm:text-3xl">
            {{ section.heading }}
          </h2>
          <p
            v-for="(p, pi) in section.paragraphs || []"
            :key="pi"
            class="mt-4 text-base leading-7 text-primary/75"
          >
            {{ p }}
          </p>
          <ul
            v-if="section.bullets && section.bullets.length"
            class="mt-4 space-y-2 text-primary/75"
          >
            <li
              v-for="(b, bi) in section.bullets"
              :key="bi"
              class="flex items-start gap-3"
            >
              <Icon
                name="mdi:check-circle-outline"
                size="20"
                class="mt-1 shrink-0 text-info"
              />
              <span>{{ b }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- FAQ -->
      <section v-if="faqs && faqs.length" class="mt-16">
        <h2 class="font-oswald text-2xl font-bold uppercase sm:text-3xl">
          Frequently asked questions
        </h2>
        <div class="mt-6 space-y-6">
          <div
            v-for="(f, fi) in faqs"
            :key="fi"
            class="border-b border-primary/10 pb-5"
          >
            <h3 class="text-lg font-semibold text-primary">{{ f.q }}</h3>
            <p class="mt-2 text-base leading-7 text-primary/75">{{ f.a }}</p>
          </div>
        </div>
      </section>

      <!-- Related -->
      <section v-if="related && related.length" class="mt-14">
        <h2 class="font-oswald text-xl font-bold uppercase">Related</h2>
        <ul class="mt-4 flex flex-col gap-2 font-ibmMono text-sm">
          <li v-for="(r, ri) in related" :key="ri">
            <NuxtLink
              :to="r.to"
              class="inline-flex items-center gap-2 text-info transition hover:underline"
            >
              <Icon name="mdi:arrow-right" size="16" />
              {{ r.label }}
            </NuxtLink>
          </li>
        </ul>
      </section>

      <!-- Closing CTA -->
      <section
        class="mt-16 rounded-lg border border-primary/15 p-8 text-center"
      >
        <h2 class="font-oswald text-2xl font-bold uppercase sm:text-3xl">
          Tell me the CRM problem. I'll tell you what to build first.
        </h2>
        <p class="mx-auto mt-3 max-w-xl text-primary/75">
          Send the SuiteCRM migration, plugin idea, integration, or broken
          workflow. You'll get a clear build path and a working demo in two
          weeks — or you don't pay.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-4 font-ibmMono text-sm">
          <a
            :href="callUrl"
            target="_blank"
            rel="noopener"
            class="rounded-md bg-info px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Book a build discussion
          </a>
          <a
            :href="mailto"
            class="rounded-md border border-primary/20 px-5 py-3 font-semibold text-primary transition hover:border-info hover:text-info"
          >
            shahab.developer.work@gmail.com
          </a>
        </div>
      </section>
    </article>
  </main>
</template>
