<script setup lang="ts">
import {definePageMeta} from "#imports";
import {blogPosts} from "~/data/blogPosts";
import {useJsonLd} from "~/composeables/useJsonLd";

const post = blogPosts.find((item) => item.slug === 'suitecrm-migration-european-textile-company')!
const siteUrl = 'https://shahabgohar.dev'
const articleUrl = `${siteUrl}/blogs/${post.slug}`
const articleImage = `${siteUrl}/img/og-suitecrm-migration.png`
const seoTitle = 'SuiteCRM Migration Case Study for a European Textile Company'
const seoDescription =
  'An anonymized SuiteCRM case study: migrating a fragile Bitnami CRM into a reproducible Docker deployment with Google SSO, calendar sync, OAuth, and multilingual CRM fields.'

definePageMeta({
  title: post.title
})

useHead({
  title: `${seoTitle} | Shahab Gohar`,
  meta: [
    { name: 'description', content: seoDescription },
    {
      name: 'keywords',
      content:
        'SuiteCRM migration case study, SuiteCRM Docker, SuiteCRM Google SSO, SuiteCRM Google Calendar sync, CRM modernization, Docker CRM deployment, PHP CRM developer, European textile CRM'
    },
    { name: 'author', content: 'Shahab Gohar' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { property: 'og:title', content: seoTitle },
    { property: 'og:description', content: seoDescription },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: articleUrl },
    { property: 'og:image', content: articleImage },
    { property: 'article:published_time', content: post.datePublished },
    { property: 'article:modified_time', content: post.dateModified },
    { property: 'article:author', content: 'Shahab Gohar' },
    { property: 'article:section', content: post.category },
    ...post.tags.map((tag) => ({ property: 'article:tag', content: tag })),
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seoTitle },
    { name: 'twitter:description', content: seoDescription },
    { name: 'twitter:image', content: articleImage }
  ],
  link: [
    { rel: 'canonical', href: articleUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl
        },
        headline: post.title,
        description: seoDescription,
        image: [articleImage],
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        articleSection: post.category,
        keywords: post.tags.join(', '),
        wordCount: 1850,
        timeRequired: 'PT10M',
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          name: 'Shahab Gohar',
          url: siteUrl,
          jobTitle: 'Software Engineer',
          knowsAbout: ['SuiteCRM', 'Docker', 'PHP', 'Symfony', 'Google OAuth', 'CRM Automation']
        },
        publisher: {
          '@type': 'Person',
          name: 'Shahab Gohar',
          url: siteUrl
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Portfolio',
            item: siteUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blogs',
            item: `${siteUrl}/blogs`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: articleUrl
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why migrate SuiteCRM from a pre-built image to a custom Docker setup?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A custom Docker setup makes SuiteCRM reproducible, version-controlled, easier to debug, safer to upgrade, and less dependent on undocumented container state.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can SuiteCRM support Google SSO and calendar sync?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. SuiteCRM 8 can support Google OAuth, Google SSO, and calendar synchronization when authentication, token storage, scheduler jobs, and proxy configuration are implemented carefully.'
            }
          }
        ]
      })
    }
  ]
})
useJsonLd()

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'The problem' },
  { id: 'architecture', label: 'New architecture' },
  { id: 'google-sso', label: 'Google SSO' },
  { id: 'calendar-sync', label: 'Calendar sync' },
  { id: 'custom-crm', label: 'Custom CRM' },
  { id: 'results', label: 'Results' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'faq', label: 'FAQ' }
]

const outcomeCards = [
  {
    value: '8.10.1',
    label: 'SuiteCRM upgrade',
    detail: 'Migrated from an older pre-built container to a clean SuiteCRM source deployment.'
  },
  {
    value: '1 command',
    label: 'repeatable operations',
    detail: 'Common tasks were wrapped in Makefile commands for build, logs, shell, cache, and permissions.'
  },
  {
    value: '6',
    label: 'languages supported',
    detail: 'CRM field labels and dropdown values were localized for the client team.'
  },
  {
    value: '0',
    label: 'manual calendar setup',
    detail: 'Calendar accounts are provisioned automatically after Google sign-in.'
  }
]

const comparisonRows = [
  ['Infrastructure', 'Pre-built image with runtime-only configuration', 'Custom Dockerfile, Compose, and Makefile'],
  ['Version control', 'No reliable source history for customizations', 'Git-backed source, config, and custom CRM code'],
  ['Google SSO', 'Fragile legacy flow across multiple layers', 'Single Symfony flow with user provisioning'],
  ['Calendar sync', 'Legacy setup with manual user friction', 'Native sync framework with auto-provisioning'],
  ['Permissions', 'Random cache, session, and ownership failures', 'Self-healing startup and clear ownership model'],
  ['Custom fields', 'Hard to maintain across upgrades', 'SuiteCRM Extension framework with translations']
]
</script>

<template>
  <main class="min-h-screen bg-secondary text-primary">
    <article class="mx-auto grid w-full max-w-[1180px] gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[220px_1fr] lg:px-16">
      <aside class="lg:sticky lg:top-8 lg:h-fit">
        <NuxtLink to="/blogs" class="inline-flex items-center gap-2 font-ibmMono text-sm text-primary/65 transition hover:text-info">
          <Icon name="mdi:arrow-left" size="18" />
          All posts
        </NuxtLink>

        <nav class="mt-10 hidden border-l border-primary/10 pl-5 lg:block">
          <p class="font-ibmMono text-xs uppercase tracking-[0.22em] text-primary/45">Navigate</p>
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="mt-4 block text-sm text-primary/60 transition hover:text-info"
          >
            {{ section.label }}
          </a>
        </nav>
      </aside>

      <div>
        <header class="border-b border-primary/10 pb-10">
          <div class="flex flex-wrap items-center gap-3 font-ibmMono text-xs uppercase tracking-[0.18em] text-primary/55">
            <span>{{ post.category }}</span>
            <span class="h-1 w-1 rounded-full bg-info"></span>
            <span>{{ post.date }}</span>
            <span class="h-1 w-1 rounded-full bg-info"></span>
            <span>{{ post.readingTime }}</span>
          </div>

          <h1 class="mt-5 max-w-4xl font-oswald text-5xl font-black uppercase leading-none sm:text-6xl lg:text-7xl">
            {{ post.title }}
          </h1>
          <p class="mt-6 max-w-3xl text-xl leading-9 text-primary/70">
            An anonymized migration story from a European textile company whose CRM needed to move from a fragile container setup to a reproducible, version-controlled SuiteCRM deployment with Google sign-in, email, calendar sync, and upgrade-safe customization.
          </p>
        </header>

        <div class="prose-content max-w-3xl py-10">
          <section id="overview">
            <p class="lead">
              The first request sounded straightforward: get Google login, email, and calendar integration working inside SuiteCRM. The real problem was deeper. The CRM was running from a pre-built container, managed manually, and carrying business-critical customizations that could disappear during a rebuild.
            </p>
            <p>
              The client was a European textile and apparel company with a sales process spread across multiple markets. Their CRM was not a side tool. It held customer records, scheduling workflows, and day-to-day team coordination. That meant the fix could not be a quick patch on top of an already brittle foundation.
            </p>
            <p>
              I rebuilt the deployment around SuiteCRM 8.10.1, Docker Compose, a custom PHP/Apache image, version-controlled configuration, Google OAuth, automated calendar provisioning, and upgrade-safe SuiteCRM extensions. The outcome was a CRM that could be reproduced, debugged, upgraded, and handed over without relying on memory or container state.
            </p>
          </section>

          <section id="problem">
            <h2>The CRM was working, but it was not maintainable</h2>
            <p>
              The original deployment used a pre-built SuiteCRM image. That made the first installation fast, but it created a black box once the system needed real production customization. Application code, runtime files, uploads, cache, sessions, and custom PHP changes were all mixed together.
            </p>
            <p>
              Key deployment details such as environment variables, mounts, ports, and networking existed only as runtime state. Recreating the container meant guessing how production had been assembled.
            </p>
            <p>
              The goal was to make those decisions explicit in code so the CRM could be rebuilt, reviewed, and upgraded without depending on memory.
            </p>
          </section>

          <section id="architecture">
            <h2>A clean Docker architecture replaced the black box</h2>
            <p>
              I moved the project to a custom Docker setup based on a standard PHP 8.2 Apache image. That gave us control over PHP extensions, Apache modules, Composer, Xdebug, cron, filesystem permissions, and the actual SuiteCRM source layout.
            </p>
            <p>
              The project gained a Dockerfile, Docker Compose configuration, Apache and PHP config, a startup entrypoint, and a Makefile for common operations. Instead of asking the client to remember long Docker commands, the system exposed practical commands for building, restarting, viewing logs, opening a shell, clearing cache, accessing the database, and fixing permissions.
            </p>
            <p>
              The most important infrastructure detail was the entrypoint. It recreates required runtime directories and resets ownership for cache, temp, logs, and uploads whenever the container starts. That prevents a common PHP Docker failure mode where sessions, CSRF tokens, cache rebuilds, or uploads break because a host user or root-owned process touched files.
            </p>

            <div class="not-prose my-8 grid gap-4 sm:grid-cols-2">
              <div
                v-for="outcome in outcomeCards"
                :key="outcome.label"
                class="border border-primary/10 bg-primary/[0.03] p-5"
              >
                <p class="font-oswald text-4xl font-black text-info">{{ outcome.value }}</p>
                <p class="mt-2 text-lg font-semibold">{{ outcome.label }}</p>
                <p class="mt-2 text-sm leading-6 text-primary/60">{{ outcome.detail }}</p>
              </div>
            </div>
          </section>

          <section id="google-sso">
            <h2>Google SSO had to work across SuiteCRM's two worlds</h2>
            <p>
              SuiteCRM 8 has a modern Symfony backend and a legacy CRM layer. Authentication must satisfy both. The old setup relied on several separate files and redirects, which made the flow difficult to reason about and fragile under change.
            </p>
            <p>
              I consolidated the Google sign-in process into a Symfony controller. The controller handles the Google callback, exchanges the authorization code, validates the user's email domain rules, finds or creates the CRM user, creates the Symfony session, creates the legacy session, stores OAuth tokens, and sends the user to the CRM dashboard.
            </p>
            <p>
              Because the SuiteCRM frontend was precompiled, I avoided rebuilding the Angular app. A small JavaScript enhancement injects the Google sign-in button into the login screen after the Angular form renders. It is a pragmatic solution: minimal surface area, no frontend build pipeline, and clear behavior for users.
            </p>
            <p>
              The reverse proxy also needed attention. The CRM was behind TLS termination, while the container saw plain HTTP. Without explicit trusted proxy configuration, Symfony generated HTTP callback URLs and Google rejected them. Configuring trusted proxies and forwarded headers made OAuth redirect URLs match the public HTTPS address.
            </p>
          </section>

          <section id="calendar-sync">
            <h2>Calendar sync became automatic after sign-in</h2>
            <p>
              The previous calendar implementation used legacy Google sync behavior and required more manual setup than the client wanted. SuiteCRM 8.10.1 includes a newer framework around external OAuth providers, OAuth connections, calendar accounts, and scheduler jobs.
            </p>
            <p>
              The problem was discoverability. Calendar account setup is not obvious for a non-technical CRM user, and asking every employee to configure it correctly would create support debt.
            </p>
            <p>
              I added automatic provisioning during Google sign-in. When a user authenticates, the CRM checks whether a Google calendar account already exists for that user. If not, it links the user to the configured Google OAuth connection and creates the calendar account needed by SuiteCRM's sync job. From the user's perspective, signing in once is enough.
            </p>
          </section>

          <section id="custom-crm">
            <h2>Custom CRM fields were built the upgrade-safe way</h2>
            <p>
              The company needed CRM fields for its sales workflow: country coverage, pricing tier, decoration method, and customer type. Those options also needed translations for six languages used by the team.
            </p>
            <p>
              I implemented the fields through SuiteCRM's Extension framework instead of modifying core files. Dropdown values, field definitions, and labels live under the custom extension paths, then SuiteCRM compiles them during repair and rebuild.
            </p>
            <p>
              This matters because CRM customization is a long-term maintenance problem. A core edit may work today and fail during the next upgrade. Extension-based customization keeps the implementation visible, version-controlled, and much easier to carry forward.
            </p>
          </section>

          <section id="results">
            <h2>Before and after</h2>
            <div class="not-prose my-8 overflow-x-auto border border-primary/10">
              <table class="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead class="bg-primary/[0.06] font-ibmMono uppercase tracking-[0.14em] text-primary/60">
                  <tr>
                    <th class="border-b border-primary/10 p-4">Area</th>
                    <th class="border-b border-primary/10 p-4">Before</th>
                    <th class="border-b border-primary/10 p-4">After</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in comparisonRows" :key="row[0]" class="border-b border-primary/10 last:border-b-0">
                    <td class="p-4 font-semibold">{{ row[0] }}</td>
                    <td class="p-4 text-primary/65">{{ row[1] }}</td>
                    <td class="p-4 text-primary/65">{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The final system is not just a CRM with Google login. It is a maintainable application deployment. The client can rebuild it, inspect it, debug it, update it, and continue extending it without treating the production container as the only source of truth.
            </p>
          </section>

          <section id="lessons">
            <h2>Lessons from the migration</h2>
            <ul>
              <li><strong>Pre-built images are useful for demos, not long-term customization.</strong> Once a CRM becomes business-critical, the deployment needs source control and reproducible infrastructure.</li>
              <li><strong>Docker permissions deserve first-class design.</strong> PHP apps write sessions, cache, uploads, and logs constantly. Ownership mistakes become user-facing bugs quickly.</li>
              <li><strong>SuiteCRM 8 authentication crosses multiple layers.</strong> Symfony sessions, legacy sessions, OAuth tokens, and frontend entry points all need to line up.</li>
              <li><strong>Reverse proxies affect OAuth.</strong> If the application does not trust forwarded HTTPS headers, redirect URLs can silently become wrong.</li>
              <li><strong>Automation beats documentation for repeated setup.</strong> Auto-provisioning calendar sync removed a support process before it became one.</li>
              <li><strong>Upgrade-safe customization is non-negotiable.</strong> SuiteCRM's Extension framework is the right place for field definitions, labels, and dropdowns.</li>
            </ul>
          </section>

          <section id="faq">
            <h2>Quick answers</h2>
            <h3>Why not keep using the pre-built SuiteCRM image?</h3>
            <p>
              The pre-built image was fine for a quick start, but it hid too much once the system needed custom Google OAuth, calendar sync, CRM fields, debugging, and reliable upgrades. A custom Docker setup gave the client control and repeatability.
            </p>
            <h3>What made this migration difficult?</h3>
            <p>
              The hard parts were not only installing SuiteCRM. The real complexity was preserving Google integrations, making authentication work across Symfony and legacy SuiteCRM, handling proxy-aware OAuth URLs, keeping Docker volume permissions stable, and making custom fields survive upgrades.
            </p>
          </section>

          <section class="not-prose mt-12 border border-info/50 bg-info/5 p-6 sm:p-8">
            <p class="font-ibmMono text-xs uppercase tracking-[0.22em] text-info">Work with me</p>
            <h2 class="mt-4 text-3xl font-bold leading-tight">Need a CRM migration that can survive production?</h2>
            <p class="mt-4 text-base leading-7 text-primary/70">
              I build and rescue full-stack systems with PHP, Vue, Nuxt, Docker, automation, OAuth, and business workflow integrations. If your CRM or internal platform is too important to keep patching blindly, I can help turn it into a maintainable product.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:shahab.developer.work@gmail.com?subject=CRM%20migration%20project"
                class="inline-flex items-center gap-2 bg-info px-5 py-3 font-ibmMono text-sm text-secondary transition hover:opacity-90"
              >
                Discuss a project
                <Icon name="mdi:email-outline" size="18" />
              </a>
              <NuxtLink
                to="/"
                class="inline-flex items-center gap-2 border border-primary/15 px-5 py-3 font-ibmMono text-sm text-primary/75 transition hover:border-info hover:text-info"
              >
                View portfolio
                <Icon name="mdi:arrow-top-right" size="18" />
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>
    </article>
  </main>
</template>

<style scoped>
.prose-content {
  font-size: 1.0625rem;
  line-height: 1.9;
}

.prose-content section {
  scroll-margin-top: 2rem;
}

.prose-content section + section {
  margin-top: 3rem;
}

.prose-content h2 {
  margin-bottom: 1rem;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.05;
}

.prose-content h3 {
  margin-top: 1.75rem;
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.25;
}

.prose-content p {
  margin-top: 1rem;
  color: color-mix(in srgb, currentColor 72%, transparent);
}

.prose-content ul {
  margin-top: 1.5rem;
  display: grid;
  gap: 0.9rem;
  padding-left: 1.25rem;
  list-style: disc;
  color: color-mix(in srgb, currentColor 74%, transparent);
}

.prose-content li::marker {
  color: var(--fallback-in, oklch(var(--in)));
}

.prose-content .lead {
  margin-top: 0;
  font-size: 1.35rem;
  line-height: 1.7;
  color: currentColor;
}
</style>
