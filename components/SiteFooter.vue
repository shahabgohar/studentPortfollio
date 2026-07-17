<script setup lang="ts">
const year = new Date().getFullYear()

const explore = [
  { label: 'Services', to: '/services/' },
  { label: 'Projects', to: '/projects/' },
  { label: 'Blog', to: '/blogs/' },
  { label: 'Automation audit', to: '/automation-audit/' },
]

const serviceLinks = [
  { label: 'AI development', to: '/services/ai-development/' },
  { label: 'SuiteCRM development', to: '/services/suitecrm-development/' },
  { label: 'Mautic and SuiteCRM integration', to: '/services/mautic-suitecrm-integration/' },
  { label: 'Salesforce to SuiteCRM migration', to: '/services/salesforce-to-suitecrm-migration/' },
]

const social = [
  { label: 'GitHub', href: 'https://github.com/engineershahabgohar', icon: 'ph:github-logo' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shahabgohar/', icon: 'ph:linkedin-logo' },
  { label: 'Email', href: 'mailto:shahab.developer.work@gmail.com', icon: 'ph:envelope-simple' },
]
</script>

<template>
  <footer class="border-t border-primary/10">
    <div class="mx-auto w-full max-w-[1120px] px-6 py-14 sm:px-8">
      <div class="grid gap-10 md:grid-cols-[1.2fr_0.9fr_1.1fr]">
        <div>
          <NuxtLink to="/" class="font-grotesk text-lg font-bold tracking-tight">
            Shahab<span class="text-info">.</span>dev
          </NuxtLink>
          <p class="mt-4 max-w-xs text-sm leading-6 text-primary/55">
            AI automation, CRM integration, and custom software. Built by one
            engineer, demoed on your real workflow in 14 days.
          </p>
          <div class="mt-6 flex gap-2">
            <a
              v-for="s in social"
              :key="s.label"
              :href="s.href"
              :aria-label="s.label"
              target="_blank"
              rel="noreferrer"
              class="grid h-10 w-10 place-items-center rounded-xl border border-primary/15 text-primary/70 transition hover:border-info hover:text-info"
            >
              <Icon :name="s.icon" size="19" />
            </a>
          </div>
        </div>

        <nav aria-label="Site pages">
          <p class="text-sm font-semibold">Pages</p>
          <ul class="mt-4 grid gap-2.5 text-sm text-primary/60">
            <li v-for="link in explore" :key="link.to">
              <NuxtLink :to="link.to" class="transition hover:text-info">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <nav aria-label="Services">
          <p class="text-sm font-semibold">Services</p>
          <ul class="mt-4 grid gap-2.5 text-sm text-primary/60">
            <li v-for="link in serviceLinks" :key="link.to">
              <NuxtLink :to="link.to" class="transition hover:text-info">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="mt-12 flex flex-col gap-3 border-t border-primary/10 pt-6 text-[13px] text-primary/45 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; {{ year }} Shahab Gohar. All rights reserved.</p>
        <div class="flex gap-6">
          <NuxtLink to="/privacy/" class="transition hover:text-info">Privacy</NuxtLink>
          <NuxtLink to="/cookies/" class="transition hover:text-info">Cookies</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
