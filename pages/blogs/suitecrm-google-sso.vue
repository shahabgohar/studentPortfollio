<script setup lang="ts">
import {definePageMeta} from "#imports";
import {blogPosts} from "~/data/blogPosts";
import {useJsonLd} from "~/composeables/useJsonLd";

const post = blogPosts.find((item) => item.slug === 'suitecrm-google-sso')!
const siteUrl = 'https://shahabgohar.dev'
const articleUrl = `${siteUrl}/blogs/${post.slug}/`
const articleImage = `${siteUrl}/img/og-suitecrm-google-sso.png`
const seoTitle = 'SuiteCRM Google SSO: What It Really Takes in SuiteCRM 8'
const seoDescription =
  'Google sign-in for SuiteCRM 8: when the built-in SAML sign-in is enough, and what a custom build adds, from two sessions to automatic Gmail and Calendar setup.'

// The FAQ answers are shared by the visible section and the FAQPage schema,
// so the two can never drift apart.
const faqs = [
  {
    question: 'Does SuiteCRM support Google single sign-on?',
    answer:
      'Yes. SuiteCRM 8 includes SAML sign-in, which Google Workspace can act as the identity provider for, and the SuiteCRM Store lists Google login add-ons. If the same sign-in should also connect each person’s Gmail and Google Calendar and set up calendar sync, that is where a custom integration like the one described here comes in.'
  },
  {
    question: 'Do I need custom development for Google sign-in on SuiteCRM?',
    answer:
      'Not always. For sign-in alone, start with SuiteCRM 8’s built-in SAML sign-in or an add-on that supports your SuiteCRM version. Custom development makes sense when sign-in should also connect Gmail and Google Calendar and set every user up automatically.'
  },
  {
    question: 'Will users’ calendars sync on their own?',
    answer:
      'They can. When the sign-in is wired into the calendar framework in SuiteCRM 8.10, a calendar account is created on first sign-in and its connection is refreshed at every sign-in after that, so users configure nothing.'
  }
]

definePageMeta({
  title: post.title
})

useHead({
  title: seoTitle,
  meta: [
    { name: 'description', content: seoDescription },
    {
      name: 'keywords',
      content:
        'SuiteCRM Google SSO, SuiteCRM single sign-on, SuiteCRM 8 SSO, SuiteCRM SAML, SuiteCRM OAuth, SuiteCRM Google login, SuiteCRM Google Calendar sync'
    },
    { name: 'author', content: 'Shahab Gohar' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { property: 'og:title', content: seoTitle },
    { property: 'og:description', content: seoDescription },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: articleUrl },
    { property: 'og:image', content: articleImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
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
        wordCount: 1560,
        timeRequired: 'PT7M',
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          name: 'Shahab Gohar',
          url: siteUrl,
          jobTitle: 'Software Engineer',
          knowsAbout: ['SuiteCRM', 'OAuth', 'Google Workspace', 'Symfony', 'Single Sign-On', 'CRM Automation']
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
            item: `${siteUrl}/blogs/`
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
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      })
    }
  ]
})
useJsonLd()

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'options', label: 'Do you need a build?' },
  { id: 'two-worlds', label: 'Two sessions' },
  { id: 'login', label: 'The login flow' },
  { id: 'calendar', label: 'Calendar sync' },
  { id: 'proxy', label: 'Behind a proxy' },
  { id: 'evaluating', label: 'If you’re evaluating it' },
  { id: 'faq', label: 'FAQ' }
]

const outcomeCards = [
  {
    value: '8.10.1',
    label: 'SuiteCRM version',
    detail: 'Built on SuiteCRM 8.10.1, with its Angular frontend and Symfony backend.'
  },
  {
    value: 'OAuth 2.0',
    label: 'Google sign-in',
    detail: 'A standard authorization-code flow, so passwords never pass through the CRM.'
  },
  {
    value: '2 sessions',
    label: 'signed in together',
    detail: 'One Google login signs the user into both the modern and the legacy layer.'
  },
  {
    value: 'Auto',
    label: 'calendar on first login',
    detail: 'A Google Calendar connection is set up the first time a user signs in.'
  }
]

const comparisonRows = [
  ['Login button', 'Edit it into the login page', 'Added by a small script, without rebuilding the compiled login screen'],
  ['Session', 'One login cookie', 'A modern and a legacy session, set together on each login'],
  ['User accounts', 'Created by hand', 'Created on first sign-in, company domain only'],
  ['Google access', 'Sign-in is enough', 'The same consent also covers mailbox and calendar'],
  ['Calendar sync', 'Works once connected', 'A per-user, encrypted connection wired to the sync job'],
  ['Behind a proxy', 'Just works', 'Proxy settings so the address Google sends users back to stays HTTPS']
]
</script>

<template>
  <main class="min-h-screen bg-secondary text-primary">
    <article class="mx-auto grid w-full max-w-[1180px] gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[220px_1fr] lg:px-16">
      <aside class="lg:sticky lg:top-24 lg:h-fit">
        <NuxtLink to="/blogs/" class="inline-flex items-center gap-2 font-ibmMono text-sm text-primary/65 transition hover:text-info">
          <Icon name="mdi:arrow-left" size="18" />
          All posts
        </NuxtLink>

        <nav class="mt-10 hidden border-l border-primary/10 pl-5 lg:block">
          <p class="font-ibmMono text-xs uppercase tracking-[0.22em] text-primary/65">Navigate</p>
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
          <div class="flex flex-wrap items-center gap-3 font-ibmMono text-xs uppercase tracking-[0.18em] text-primary/65">
            <span>{{ post.category }}</span>
            <span class="h-1 w-1 rounded-full bg-info"></span>
            <span>{{ post.date }}</span>
            <span class="h-1 w-1 rounded-full bg-info"></span>
            <span>{{ post.readingTime }}</span>
          </div>

          <h1 class="mt-5 max-w-4xl font-grotesk text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Google SSO in SuiteCRM 8, and what it really takes
          </h1>
          <p class="mt-6 max-w-3xl text-xl leading-9 text-primary/70">
            Plain "sign in with Google" for SuiteCRM 8 can often be set up without custom code. It becomes an engineering job when the same sign-in also has to bring each person's Gmail and Google Calendar into the CRM. Here is what that involves, from a production build for a European textile company.
          </p>
        </header>

        <div class="prose-content max-w-3xl py-10">
          <section id="overview">
            <p class="lead">
              A client asked for three things inside SuiteCRM: sign in with Google, their email, and their calendar. The first one on its own is a common request with more than one ready-made answer. All three together, working from a single sign-in, is where the real work was.
            </p>
            <p>
              This is a companion to my
              <NuxtLink to="/blogs/suitecrm-migration-european-textile-company/" class="text-info underline decoration-info/40 underline-offset-4 transition hover:decoration-info">SuiteCRM migration case study</NuxtLink>,
              where single sign-on was one piece of a larger rebuild. That post told the project story. This one stays on the sign-in itself: when you do not need a build, why this one did, and the parts that decide whether it holds up in production.
            </p>
          </section>

          <section id="options">
            <h2>First, check whether you need a build at all</h2>
            <p>
              If all you want is for people to log in with their company Google account, start with what already exists. SuiteCRM 8 has
              <a href="https://docs.suitecrm.com/8.x/admin/configuration/saml/" rel="noopener" class="text-info underline decoration-info/40 underline-offset-4 transition hover:decoration-info">SAML sign-in built in</a>,
              switched on in its configuration, and Google Workspace can act as the identity provider for it. The SuiteCRM Store also lists Google login add-ons. If you go that way, check that the one you pick supports your exact SuiteCRM version before you buy it.
            </p>
            <p>
              This project needed more than sign-in. The client also wanted their email and calendar inside the CRM. For that, the CRM needs each person's permission to use their Google data, and every user needs a calendar connection set up. Asking every employee to set that up by hand was the thing to avoid, so the sign-in itself does it. That part is a build, and it is what the rest of this post is about.
            </p>

            <div class="not-prose my-8 grid gap-4 sm:grid-cols-2">
              <div
                v-for="outcome in outcomeCards"
                :key="outcome.label"
                class="border border-primary/10 bg-primary/[0.03] p-5"
              >
                <p class="font-grotesk text-4xl font-bold text-info">{{ outcome.value }}</p>
                <p class="mt-2 text-lg font-semibold">{{ outcome.label }}</p>
                <p class="mt-2 text-sm leading-6 text-primary/60">{{ outcome.detail }}</p>
              </div>
            </div>
          </section>

          <section id="two-worlds">
            <h2>The core of the job: one login, two sessions</h2>
            <p>
              Building your own sign-in route runs straight into how SuiteCRM 8 is put together. It is effectively two applications sharing one codebase: a modern layer built on Angular and the Symfony framework, and underneath it the long-standing legacy CRM engine that still runs most of the business logic. A login has to be recognised by both, from the same click, in the same request. They use different session mechanisms, so the sign-in quietly does the work twice and keeps them in step. Miss either one and the user is only half signed in.
            </p>
            <p>
              Two details matter even at a high level. The session identifier is replaced at the moment of sign-in, which closes a common session-hijacking trick. And the sign-in only accepts accounts on the company's own Google domain: a personal Gmail address is turned away before any CRM account is created.
            </p>
            <p>
              When a colleague signs in for the first time, their CRM user is created from their Google profile as a normal, non-admin user. Nobody has to create accounts in advance or send invitations. When someone leaves, suspending their Google account stops them signing in with Google. It is still worth deactivating their CRM user too, because Google is not the only way in while password login stays switched on.
            </p>
          </section>

          <section id="login">
            <h2>The login flow, without the plumbing</h2>
            <p>
              SuiteCRM 8's login screen ships as a compiled frontend, so you cannot simply edit a button into it. Rebuilding that frontend from source for one button is a heavy commitment. The pragmatic answer is a small, self-contained script that adds a "Sign in with Google" button to the existing screen once it has loaded. There is nothing to maintain in a frontend build pipeline, and the button sits naturally on the page. The trade-off is that it hooks into SuiteCRM's own login page, so it is one of the things to check after every SuiteCRM upgrade.
            </p>
            <p>
              From there it is the standard Google sign-in flow: the user is sent to Google, approves access, and comes back with a one-time code that the server exchanges for tokens behind the scenes. The user's password is only ever seen by Google.
            </p>
            <p>
              What the CRM asks for is worth naming, because a Google Workspace admin sees exactly this on the consent screen and should ask you to justify it. This build requests the user's identity and email address, their Google Calendar and, because the client wanted email inside the CRM, access to their mailbox. That last one is a broad permission. It is there because the business asked for it, and it is exactly the scope a Workspace admin should question, so have a clear answer ready.
            </p>
          </section>

          <section id="calendar">
            <h2>Calendar sync is where the care goes</h2>
            <p>
              Signing in is the visible half. The half that needs the most care is calendar sync. The promise to the user is simple: sign in once, and your Google Calendar shows up in the CRM without you configuring anything.
            </p>
            <p>
              SuiteCRM 8.10 has a newer calendar sync framework, and SuiteCRM keeps Google tokens in more than one place. Only the newer framework's own connection records drive its sync job, so tokens saved where the older Google sync used to look are never seen by it. The first version of this build saved tokens the way the older sync expected. The final version gives each user their own encrypted Google connection, wired to the new sync job and refreshed every time they sign in.
            </p>
            <p>
              For the user, a calendar account is created the first time they sign in, and its connection is refreshed every time they sign in again. For the business, "it just works" is something you build and verify, not something you assume.
            </p>

            <div class="not-prose my-8 overflow-x-auto border border-primary/10">
              <table class="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead class="bg-primary/[0.06] font-ibmMono uppercase tracking-[0.14em] text-primary/60">
                  <tr>
                    <th class="border-b border-primary/10 p-4">Piece</th>
                    <th class="border-b border-primary/10 p-4">The easy assumption</th>
                    <th class="border-b border-primary/10 p-4">What this build had to do</th>
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
          </section>

          <section id="proxy">
            <h2>The infrastructure detail that silently breaks OAuth</h2>
            <p>
              One more detail, because it stays invisible until it bites. Many production CRMs sit behind a reverse proxy that handles HTTPS, while the application itself receives plain internal traffic. Google is strict about the address it sends users back to after sign-in: it has to match an address registered for the app exactly, including the https.
            </p>
            <p>
              Left unconfigured, the application does not know it is being served over HTTPS, builds an http address, and Google rejects the sign-in. It looks like a problem with the Google setup when the real cause is the proxy. The fix is a few lines of standard configuration that tell the application to trust the proxy's "this was HTTPS" signal. It is easy to lose time on if you do not know to look for it.
            </p>
          </section>

          <section id="evaluating">
            <h2>If you are evaluating SuiteCRM SSO</h2>
            <ul>
              <li><strong>Decide what you actually need.</strong> For sign-in only, look at SuiteCRM 8's built-in SAML sign-in or a Store add-on that supports your version. If sign-in should also set up email and calendar for every user automatically, that is where a custom build like this one comes in, unless an add-on covers it for your version.</li>
              <li><strong>The value is real.</strong> Company Google login, accounts created on first sign-in, company domain only, and email and calendar ready without anyone configuring them.</li>
              <li><strong>The risk is in the invisible parts.</strong> The second session, where the tokens live, the proxy signal. None of them show up in a quick demo, and all of them decide whether it holds up in production.</li>
              <li><strong>Plan for upgrades.</strong> Anything that hooks into SuiteCRM's own screens, like the added sign-in button, needs a check after each upgrade. Keep the custom pieces few and in known places so that check is quick.</li>
            </ul>
            <p>
              Google sign-in for SuiteCRM 8 is very achievable. When it is finished it is the least dramatic feature in the system: people click one button and they are in. Getting to undramatic is the work.
            </p>
          </section>

          <section id="faq">
            <h2>Quick answers</h2>
            <template v-for="faq in faqs" :key="faq.question">
              <h3>{{ faq.question }}</h3>
              <p>{{ faq.answer }}</p>
            </template>
          </section>

          <section class="not-prose mt-12 border border-info/50 bg-info/5 p-6 sm:p-8">
            <p class="font-ibmMono text-xs uppercase tracking-[0.22em] text-info">Work with me</p>
            <h2 class="mt-4 text-3xl font-bold leading-tight">Want Google sign-in on your SuiteCRM, with email and calendar inside it?</h2>
            <p class="mt-4 text-base leading-7 text-primary/70">
              I build SuiteCRM sign-in, OAuth and Google integrations. If your team wants to sign in with Google and have their email and calendars in the CRM, I can scope it with you, including telling you when you do not need a build at all. It is part of my <NuxtLink to="/services/suitecrm-development/" class="text-info underline decoration-info/40 underline-offset-4 transition hover:decoration-info">SuiteCRM development</NuxtLink> work.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:shahab.developer.work@gmail.com?subject=SuiteCRM%20Google%20SSO"
                class="inline-flex items-center gap-2 bg-info px-5 py-3 font-ibmMono text-sm text-secondary transition hover:opacity-90"
              >
                Discuss a project
                <Icon name="mdi:email-outline" size="18" />
              </a>
              <NuxtLink
                to="/blogs/suitecrm-migration-european-textile-company/"
                class="inline-flex items-center gap-2 border border-primary/15 px-5 py-3 font-ibmMono text-sm text-primary/75 transition hover:border-info hover:text-info"
              >
                Read the full case study
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
