<script setup lang="ts">
import {definePageMeta} from "#imports";
import {blogPosts} from "~/data/blogPosts";
import {useJsonLd} from "~/composeables/useJsonLd";

const post = blogPosts.find((item) => item.slug === 'suitecrm-quote-order-invoice-detection')!
const siteUrl = 'https://shahabgohar.dev'
const articleUrl = `${siteUrl}/blogs/${post.slug}/`
const articleImage = `${siteUrl}/img/og-suitecrm-migration.png`
const seoTitle = 'SuiteCRM Quote to Order to Invoice Detection Case Study'
const seoDescription =
  'How I built a SuiteCRM workflow that converts accepted quotes to orders, invoices order deltas, and detects when changes need supplemental invoices.'

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
        'SuiteCRM quote to order, SuiteCRM invoicing, SuiteCRM invoice detection, CRM automation, PHP logic hooks, SuiteCRM credit notes, SuiteCRM order workflow'
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
        wordCount: 1650,
        timeRequired: 'PT9M',
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          name: 'Shahab Gohar',
          url: siteUrl,
          jobTitle: 'Software Engineer',
          knowsAbout: ['SuiteCRM', 'PHP', 'CRM Automation', 'Invoicing', 'Business Workflow Automation']
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
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How can SuiteCRM detect order changes after an invoice exists?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Store an invoice snapshot on each order line item after invoicing, then compare current quantity, unit price, product, and deletion state against that snapshot when line items change.'
            }
          },
          {
            '@type': 'Question',
            name: 'When should a SuiteCRM order create a credit note?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A credit note is needed when a previously invoiced item is reduced, removed, or swapped for another product, because the original invoice has over-billed the customer.'
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
  { id: 'quote-to-order', label: 'Quote to order' },
  { id: 'invoice-service', label: 'Invoice service' },
  { id: 'detection', label: 'Detection' },
  { id: 'edge-cases', label: 'Edge cases' },
  { id: 'suitecrm', label: 'SuiteCRM choices' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'faq', label: 'FAQ' }
]

const workflowCards = [
  {
    value: 'Closed Accepted',
    label: 'quote trigger',
    detail: 'The quote after_save hook only runs when the stage changes into the accepted state.'
  },
  {
    value: '1 join table',
    label: 'duplicate guard',
    detail: 'A quote is converted once by checking the Quote to Order relationship before creating anything.'
  },
  {
    value: '4 snapshot fields',
    label: 'invoice memory',
    detail: 'Each order line stores invoiced quantity, price, product ID, and name after billing.'
  },
  {
    value: '2 flags',
    label: 'next action',
    detail: 'Orders expose invoice update and credit note flags so users know what to do next.'
  }
]

const detectionRows = [
  ['New line item after invoice', 'No invoiced quantity or price exists', 'Create supplemental invoice'],
  ['Quantity or price increase', 'Current total is greater than snapshot total', 'Create supplemental invoice for the delta'],
  ['Quantity or price reduction', 'Current total is lower than snapshot total', 'Create credit note'],
  ['Product swap', 'Current product ID differs from invoiced product ID', 'Create both invoice and credit note'],
  ['Deleted invoiced item', 'Deleted row still has invoiced snapshot values', 'Create credit note'],
  ['Free item quantity change', 'Totals remain zero, so quantity is compared directly', 'Invoice or credit based on quantity direction']
]
</script>

<template>
  <main class="min-h-screen bg-secondary text-primary">
    <article class="mx-auto grid w-full max-w-[1180px] gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[220px_1fr] lg:px-16">
      <aside class="lg:sticky lg:top-8 lg:h-fit">
        <NuxtLink to="/blogs/" class="inline-flex items-center gap-2 font-ibmMono text-sm text-primary/65 transition hover:text-info">
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

          <h1 class="mt-5 max-w-4xl font-grotesk text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {{ post.title }}
          </h1>
          <p class="mt-6 max-w-3xl text-xl leading-9 text-primary/70">
            A SuiteCRM case study about turning a quote into an order, turning an order into an invoice, and detecting what changed after billing so the CRM can create the right follow-up document.
          </p>
        </header>

        <div class="prose-content max-w-3xl py-10">
          <section id="overview">
            <p class="lead">
              A CRM workflow is easy to describe and harder to make reliable: quote, order, invoice. The real work is not only moving data from one module to another. The system also has to remember what was billed, detect later changes, and decide whether the next document should be a supplemental invoice, a credit note, or both.
            </p>
            <p>
              I built this flow for a SuiteCRM installation that used the standard AOS quote and invoice modules plus a custom A3000 Orders module. The business needed accepted quotes to become service orders automatically, orders to invoice according to customer billing rules, and line item changes after invoicing to be visible without users manually comparing records.
            </p>
            <p>
              That last part became the most important design decision. Instead of treating an invoice as a one-time copy of the order, the system stores a billing snapshot on each order line item. Later, when the order changes, the CRM compares the current line item against the invoiced snapshot and raises the correct action flag.
            </p>

            <div class="not-prose my-8 grid gap-4 sm:grid-cols-2">
              <div
                v-for="item in workflowCards"
                :key="item.label"
                class="border border-primary/10 bg-primary/[0.03] p-5"
              >
                <p class="font-grotesk text-4xl font-bold text-info">{{ item.value }}</p>
                <p class="mt-2 text-lg font-semibold">{{ item.label }}</p>
                <p class="mt-2 text-sm leading-6 text-primary/60">{{ item.detail }}</p>
              </div>
            </div>
          </section>

          <section id="quote-to-order">
            <h2>Quote to order starts with a narrow trigger</h2>
            <p>
              The first automation runs from an after_save hook on AOS_Quotes. It only fires when the quote stage changes to <strong>Closed Accepted</strong>. If the quote was already accepted before the save, the hook exits. That keeps ordinary quote edits from creating duplicate orders.
            </p>
            <p>
              There is a second guard before any order is created. The hook checks the Quote to Order join table to see whether an order is already linked to the quote. If a relationship already exists, conversion stops. This matters because CRM users often save the same record many times after a deal is accepted.
            </p>
            <p>
              Once the guards pass, the hook creates an A3000 Orders record with practical defaults: procurement status, not billed billing status, per-request service frequency, one-time job type, copied service dates, copied description, and the same assigned user.
            </p>
            <p>
              The line items need special handling. In SuiteCRM's quote save process, the parent record can be saved before grouped line items have finished writing to the database. The conversion logic explicitly saves the quote's line item groups first, then clones the groups and line items onto the order with new IDs and a remapped group structure.
            </p>
            <p>
              The order also inherits the important business relationships: account, products, vendors derived from product-vendor relationships, and site location. That makes the order operationally useful instead of being only a copied quote header.
            </p>
          </section>

          <section id="invoice-service">
            <h2>The invoice service bills deltas, not guesses</h2>
            <p>
              The order-to-invoice service creates AOS_Invoices records from A3000 Orders. It supports normal invoices, credit notes, and a combined path for mixed changes. The combined path is important for product swaps because the system may need to invoice a new product and credit the old product from the same order change.
            </p>
            <p>
              The first invoice includes all unbilled order lines. Later invoices only include the difference. If a line item quantity increases, the service invoices the extra quantity. If the price increases with the same quantity, it creates a price adjustment line. If a new item is added after the first invoice, only that new item is invoiced.
            </p>
            <p>
              After invoice creation, the service links the invoice back to the order and updates the line item snapshot. The snapshot stores what the invoice just covered: quantity, unit price, product ID, and product name. From that point forward, the order has memory.
            </p>
          </section>

          <section id="detection">
            <h2>Detection is a comparison against invoice memory</h2>
            <p>
              The detection hook runs on AOS_Products_Quotes line items, but only when the parent type is A3000_Orders. That scope is deliberate. The same line item module is used by quotes and invoices, so the hook must avoid firing on unrelated records.
            </p>
            <p>
              When an order line changes, the hook asks whether the order has ever had an invoice linked. If no invoice exists yet, snapshot fields are intentionally empty and should not be treated as a change. The hook clears both action flags and simply recalculates order totals.
            </p>
            <p>
              Once invoices exist, the hook compares current line item values to the snapshot. An increase means the customer has not been billed enough, so the order gets an invoice update flag. A decrease means the customer has been billed too much, so the order gets a credit note flag. A product swap means both can be true at once.
            </p>

            <div class="not-prose my-8 overflow-x-auto border border-primary/10">
              <table class="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead class="bg-primary/[0.06] font-ibmMono uppercase tracking-[0.14em] text-primary/60">
                  <tr>
                    <th class="border-b border-primary/10 p-4">Change</th>
                    <th class="border-b border-primary/10 p-4">Detection signal</th>
                    <th class="border-b border-primary/10 p-4">CRM action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in detectionRows" :key="row[0]" class="border-b border-primary/10 last:border-b-0">
                    <td class="p-4 font-semibold">{{ row[0] }}</td>
                    <td class="p-4 text-primary/65">{{ row[1] }}</td>
                    <td class="p-4 text-primary/65">{{ row[2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="edge-cases">
            <h2>The edge cases shaped the final design</h2>
            <p>
              Deletions needed their own hook because mark_deleted does not behave like an ordinary save. A removed line item can still carry invoiced snapshot values, and those values are exactly what the credit note calculation needs. The after_delete path reads the deleted row directly from the database and decides whether the removal created an over-billing situation.
            </p>
            <p>
              Service lines needed another adjustment. Some service-style rows use product ID 0 and may not store quantity or unit price in the same way as product rows. The invoice service normalizes those rows by treating empty service quantity as one and using total price as the effective unit price when needed.
            </p>
            <p>
              Free items also needed explicit handling. If both the old and new prices are zero, comparing totals cannot detect a quantity change. The hook compares quantity directly in that case so the CRM can still document added or removed free work.
            </p>
          </section>

          <section id="suitecrm">
            <h2>SuiteCRM customization needs to survive repair and rebuild</h2>
            <p>
              The implementation uses SuiteCRM's extension framework for hook registration and vardef additions instead of editing compiled extension files directly. That is an important distinction. Compiled files under Ext output paths can be regenerated during repair and rebuild. The source customizations belong in the Extension framework files that SuiteCRM compiles from.
            </p>
            <p>
              The action flags are stored on the main A3000 Orders table and are visible in Studio. The snapshot fields live on the line item table because detection has to happen at line-item granularity, not only at the order header. The result is a CRM that can answer a practical question quickly: what needs to happen next on this order?
            </p>
            <p>
              The detail view then turns those flags into user-facing banners. New or increased charges show a Create Invoice action. Reductions show a Create Credit Note action. Mixed changes show Process All Changes so both documents are created before the snapshot is updated.
            </p>
          </section>

          <section id="lessons">
            <h2>What this workflow taught me</h2>
            <ul>
              <li><strong>Lifecycle automation is not enough.</strong> Moving data from quote to order to invoice only solves the happy path.</li>
              <li><strong>Invoices need memory.</strong> Without a per-line snapshot, every later comparison becomes unreliable or manual.</li>
              <li><strong>Flags are better than silent behavior.</strong> Users should see whether the next step is an invoice, credit note, or combined process.</li>
              <li><strong>Mixed changes must be processed atomically.</strong> Product swaps can need both documents before the snapshot changes.</li>
              <li><strong>SuiteCRM extension discipline matters.</strong> Repair and rebuild should preserve the customization, not erase it.</li>
            </ul>
          </section>

          <section id="faq">
            <h2>Quick answers</h2>
            <h3>Why not just regenerate the invoice from the order?</h3>
            <p>
              Because previous invoices may already exist, and replacing them can create accounting problems. The safer pattern is to leave existing invoices alone and create a supplemental invoice or credit note for the difference.
            </p>
            <h3>Why store snapshot fields on line items?</h3>
            <p>
              Order totals alone cannot explain what changed. A line-level snapshot can detect added items, removed items, quantity changes, price changes, free item changes, and product swaps.
            </p>
          </section>

          <aside class="not-prose mt-12 border border-primary/15 bg-primary/[0.03] p-6 sm:p-8">
            <p class="font-ibmMono text-xs uppercase tracking-[0.22em] text-info">Free checklist</p>
            <h2 class="mt-4 text-3xl font-bold leading-tight">Still doing any of this by hand?</h2>
            <p class="mt-4 text-base leading-7 text-primary/70">
              The automation audit lists 12 manual processes with what each one
              costs per year and the build that removes it. Ten minutes to
              score your own stack.
            </p>
            <NuxtLink
              to="/automation-audit/"
              class="mt-6 inline-flex items-center gap-2 border border-info px-5 py-3 font-ibmMono text-sm text-info transition hover:bg-info hover:text-secondary"
            >
              Get the checklist
              <Icon name="mdi:arrow-right" size="18" />
            </NuxtLink>
          </aside>

          <section class="not-prose mt-12 border border-info/50 bg-info/5 p-6 sm:p-8">
            <p class="font-ibmMono text-xs uppercase tracking-[0.22em] text-info">Work with me</p>
            <h2 class="mt-4 text-3xl font-bold leading-tight">Need CRM automation that matches how your business bills?</h2>
            <p class="mt-4 text-base leading-7 text-primary/70">
              I build SuiteCRM and PHP workflow systems that connect real business operations: quotes, orders, invoices, payments, dashboards, permissions, and automation that survives production use.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:shahab.developer.work@gmail.com?subject=SuiteCRM%20workflow%20automation"
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
