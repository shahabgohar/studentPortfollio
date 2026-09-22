<script setup lang="ts">
const year = new Date().getFullYear()

const explore = [
  { label: 'Services', to: '/services/' },
  { label: 'Projects', to: '/projects/' },
  { label: 'Blog', to: '/blogs/' },
]

const serviceLinks = [
  { label: 'AI development', to: '/services/ai-development/' },
  { label: 'SuiteCRM development', to: '/services/suitecrm-development/' },
  { label: 'Mautic and SuiteCRM integration', to: '/services/mautic-suitecrm-integration/' },
  { label: 'Salesforce to SuiteCRM migration', to: '/services/salesforce-to-suitecrm-migration/' },
]

// Re-opens the cookie banner (components/CookieConsent.vue listens to this).
const cookieBannerOpen = useState('cookie-banner-open', () => false)

const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shahabgohardev/', icon: 'ph:linkedin-logo' },
  { label: 'GitHub', href: 'https://github.com/shahabgohar', icon: 'ph:github-logo' },
  { label: 'Email', href: 'mailto:shahab.developer.work@gmail.com', icon: 'ph:envelope-simple' },
]
</script>

<template>
  <footer class="overflow-hidden border-t border-primary print:hidden">
    <div class="mx-auto w-full max-w-page px-5 pt-14 sm:px-8">
      <div class="grid gap-12 md:grid-cols-[1.3fr_0.8fr_1.2fr]">
        <div>
          <p class="label text-primary/65">Shahab Gohar</p>
          <p class="mt-4 max-w-xs leading-7 text-primary/75">
            Production AI engineering, CRM automation, and custom software. Built by one
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
              class="grid h-11 w-11 place-items-center border border-primary/25 text-primary transition-colors hover:border-primary hover:bg-primary hover:text-secondary"
            >
              <Icon :name="s.icon" size="19" />
            </a>
          </div>
        </div>

        <nav aria-label="Site pages">
          <p class="label text-primary/65">Pages</p>
          <ul class="mt-4 grid gap-3">
            <li v-for="link in explore" :key="link.to">
              <NuxtLink :to="link.to" class="text-primary/80 underline-offset-4 transition-colors hover:text-info hover:underline">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <nav aria-label="Services">
          <p class="label text-primary/65">Services</p>
          <ul class="mt-4 grid gap-3">
            <li v-for="link in serviceLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-primary/80 underline-offset-4 transition-colors hover:text-info hover:underline">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="mono mt-14 flex flex-col gap-3 border-t border-primary/15 pt-5 text-primary/70 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; {{ year }} Shahab Gohar. All rights reserved.</p>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <NuxtLink to="/privacy/" class="transition-colors hover:text-info">Privacy</NuxtLink>
          <NuxtLink to="/cookies/" class="transition-colors hover:text-info">Cookies</NuxtLink>
          <NuxtLink to="/legal/" class="transition-colors hover:text-info">Legal</NuxtLink>
          <button type="button" class="transition-colors hover:text-info" @click="cookieBannerOpen = true">
            Privacy settings
          </button>
        </div>
      </div>
    </div>

    <!-- Oversized wordmark, cropped by the bottom edge of the page. -->
    <p
      class="display pointer-events-none mt-10 select-none whitespace-nowrap text-center text-[17vw] leading-[0.74] text-primary"
      aria-hidden="true"
    >
      Shahab Gohar
    </p>
  </footer>
</template>
