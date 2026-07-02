<script setup lang="ts">
import {definePageMeta} from "#imports";
import {blogPosts} from "~/data/blogPosts";
import {useJsonLd} from "~/composeables/useJsonLd";

const post = blogPosts.find((item) => item.slug === 'ai-engineering-revolution')!
const siteUrl = 'https://shahabgohar.dev'
const articleUrl = `${siteUrl}/blogs/${post.slug}/`
const articleImage = `${siteUrl}/img/og-image.png`
const seoTitle = 'AI Engineering Revolution: Foundation Models, ROI, and Business Automation'
const seoDescription =
  'A practical AI engineering guide for founders and CTOs: foundation models, AI ROI metrics, business automation opportunities, implementation risks, and where to invest first.'

definePageMeta({
  title: post.title
})

useHead({
  title: `${seoTitle} | Shahab Gohar`,
  meta: [
    { name: 'description', content: seoDescription },
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
        wordCount: 1700,
        timeRequired: 'PT12M',
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          name: 'Shahab Gohar',
          url: siteUrl,
          jobTitle: 'Software Engineer',
          knowsAbout: ['AI Engineering', 'Nuxt.js', 'Laravel', 'Python', 'Business Automation']
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
            name: 'What is AI engineering?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'AI engineering is the practice of building useful software products on top of foundation models using prompts, retrieval, tools, evaluations, automation, and product design.'
            }
          },
          {
            '@type': 'Question',
            name: 'Where should a business invest in AI first?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Start with repetitive, knowledge-heavy workflows close to revenue, cost, or customer experience, such as support, sales enablement, internal knowledge search, document processing, and software delivery.'
            }
          }
        ]
      })
    }
  ]
})
useJsonLd()

const sections = [
  { id: 'why-now', label: 'Why now' },
  { id: 'business-metrics', label: 'Business metrics' },
  { id: 'business-shift', label: 'The business shift' },
  { id: 'where-ai-wins', label: 'Where AI wins' },
  { id: 'roi-roadmap', label: 'ROI roadmap' },
  { id: 'last-mile', label: 'The last mile' },
  { id: 'decision', label: 'Decision guide' },
  { id: 'faq', label: 'FAQ' },
  { id: 'how-i-help', label: 'How I help' }
]

const metricCards = [
  {
    value: '2x',
    label: 'productivity potential',
    detail: 'Reported for documentation-heavy coding workflows in the source plan.'
  },
  {
    value: '25-50%',
    label: 'code generation lift',
    detail: 'A practical range for routine implementation assistance when used carefully.'
  },
  {
    value: '40%',
    label: 'faster writing',
    detail: 'MIT research cited in the plan found faster completion for writing tasks.'
  },
  {
    value: '18%',
    label: 'quality improvement',
    detail: 'The same writing study found better output quality, not just more speed.'
  },
  {
    value: '74%',
    label: 'use AI to simplify',
    detail: 'Salesforce data in the plan: users often rely on GenAI to distill complex ideas.'
  },
  {
    value: '$100B',
    label: 'US AI investment',
    detail: 'Goldman Sachs estimate cited in the plan for AI investment by 2025.'
  }
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

          <h1 class="mt-5 max-w-4xl font-grotesk text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {{ post.title }}
          </h1>
          <p class="mt-6 max-w-3xl text-xl leading-9 text-primary/70">
            Foundation models did not just make AI more impressive. They changed who can build with AI, how quickly useful products can be tested, and what business leaders should expect from modern software teams.
          </p>
        </header>

        <div class="prose-content max-w-3xl py-10">
          <section id="why-now">
            <p class="lead">
              The simplest way to understand AI after 2020 is scale. Models became larger, training data became broader, and general-purpose capabilities moved from research labs into APIs that product teams can use immediately.
            </p>
            <p>
              That shift matters because the barrier to building AI applications dropped. A small team no longer needs to train a model from scratch before testing an idea. They can start with a foundation model, connect it to the right workflow, and learn from real users faster.
            </p>
            <p>
              For a business, this changes the question from "Can we afford AI research?" to "Which workflow is expensive, repetitive, knowledge-heavy, or slow enough that AI assistance would pay for itself?" That is a much better question. It forces the conversation toward measurable outcomes instead of trend-chasing.
            </p>
          </section>

          <section id="business-metrics">
            <h2>The numbers are already big enough to matter</h2>
            <p>
              AI is now a boardroom topic because the economic signal is difficult to ignore. The content plan behind this article highlights productivity lifts in coding and writing, rising executive attention, and investment estimates large enough to reshape software budgets.
            </p>
            <div class="not-prose my-8 grid gap-4 sm:grid-cols-2">
              <div
                v-for="metric in metricCards"
                :key="metric.value"
                class="border border-primary/10 bg-primary/[0.03] p-5"
              >
                <p class="font-grotesk text-4xl font-bold text-info">{{ metric.value }}</p>
                <p class="mt-2 text-lg font-semibold">{{ metric.label }}</p>
                <p class="mt-2 text-sm leading-6 text-primary/60">{{ metric.detail }}</p>
              </div>
            </div>
            <p>
              These numbers should not be read as a promise that every AI project wins. They should be read as a warning that the opportunity cost of doing nothing is increasing. If competitors reduce response times, ship faster, support more users, or turn internal knowledge into a searchable assistant, the gap compounds quietly.
            </p>
          </section>

          <section id="business-shift">
            <h2>AI engineering is the new delivery layer</h2>
            <p>
              Traditional machine learning projects often started with data collection, labeling, model training, and infrastructure planning. AI engineering starts closer to the product problem. The work is to adapt powerful existing models with prompts, retrieval, tools, evaluations, and user experience.
            </p>
            <p>
              This is why AI has become a business concern, not just a technical trend. It can improve support, writing, research, coding, document processing, internal knowledge access, and decision workflows. The value comes from choosing the right workflow and shipping it with enough quality that people trust it.
            </p>
            <p>
              A useful AI product is rarely "a chatbot" in isolation. It is a business process with intelligence inserted at the right point: intake, classification, drafting, retrieval, review, routing, reporting, or follow-up. The interface matters because the user still needs confidence, control, and a clear next step.
            </p>
          </section>

          <section id="where-ai-wins">
            <h2>Where foundation models create leverage</h2>
            <p>
              AI performs best when the task involves language, pattern recognition, summarization, transformation, or guided generation. A useful application might draft a proposal, classify a lead, summarize a dense document, turn support history into a response, or help a developer move faster through routine implementation.
            </p>
            <p>
              The mistake is treating every AI feature as magic. Strong products still need clear data boundaries, human review where risk is high, reliable UI states, cost controls, and measurement. The model is only one part of the system.
            </p>
            <p>
              The best first projects usually sit close to revenue, cost, or customer experience. Sales teams need better proposal drafts. Support teams need faster answers. Operations teams need less manual document handling. Founders need faster prototypes. Developers need help with repetitive implementation. None of these require replacing the entire company; they require removing friction from work that already matters.
            </p>
          </section>

          <section id="roi-roadmap">
            <h2>Where I would look for ROI first</h2>
            <p>
              If I were auditing a company for AI opportunities, I would start with workflows that happen every week, require reading or writing, depend on internal knowledge, and create delays for customers or staff. That combination usually exposes a practical AI opportunity.
            </p>
            <ul>
              <li><strong>Customer support:</strong> summarize history, draft replies, classify tickets, and surface relevant help content before an agent responds.</li>
              <li><strong>Sales and marketing:</strong> generate first drafts, personalize outreach, repurpose long material, and turn customer pain points into sharper copy.</li>
              <li><strong>Internal knowledge:</strong> connect policies, documents, notes, and previous decisions into a controlled assistant instead of making people search scattered files.</li>
              <li><strong>Software delivery:</strong> speed up boilerplate, documentation, test drafts, code review preparation, and repetitive UI/backend tasks.</li>
              <li><strong>Document processing:</strong> extract structured data from proposals, contracts, invoices, forms, and reports so teams stop copying fields by hand.</li>
            </ul>
            <p>
              This is motivating because a company does not need a giant transformation program to begin. A focused four-week build can validate one workflow, measure time saved, expose edge cases, and show whether the next investment is justified.
            </p>
          </section>

          <section id="last-mile">
            <h2>The hard part is the last mile</h2>
            <p>
              A demo can be built quickly. A dependable AI product takes more care. Teams need to handle messy inputs, slow responses, hallucinations, privacy expectations, analytics, fallback behavior, and the moment when a user asks, "Can I trust this?"
            </p>
            <p>
              This is where engineering judgment matters. The right solution may be prompt engineering, retrieval-augmented generation, fine-tuning, automation around an existing SaaS tool, or a non-AI workflow with one carefully placed AI assist.
            </p>
            <p>
              This is also where many teams lose momentum. The prototype looks exciting, then real users bring incomplete data, strange wording, slow networks, privacy questions, and requests the demo never handled. The last mile is not glamorous, but it is where trust is earned.
            </p>
            <p>
              My bias is to ship AI features with guardrails from day one: clear states, editable outputs, confidence cues where useful, logs for improvement, fallback paths, and analytics tied to business outcomes. That is how an AI feature becomes a product asset instead of a novelty.
            </p>
          </section>

          <section id="decision">
            <h2>A practical decision guide</h2>
            <p>
              The fastest path is not always the most complex one. Prompt engineering can be enough when the task is mostly instruction-following. Retrieval-augmented generation is better when the model needs your documents, policies, product data, or knowledge base. Fine-tuning becomes interesting when you need consistent style, domain behavior, or high-volume specialization.
            </p>
            <p>
              The business decision is simpler: start where the pain is measurable. If a team spends 20 hours a week repeating a knowledge task, a 30% improvement is already meaningful. If a support queue delays revenue or damages retention, faster triage has direct value. If a founder can test a product idea in weeks instead of months, speed itself becomes a competitive advantage.
            </p>
            <p>
              AI rewards companies that move with discipline. You do not need to bet the company. You need a narrow workflow, a clear metric, a strong user experience, and an engineer who can connect the model to the reality of your product.
            </p>
          </section>

          <section id="faq">
            <h2>Quick answers for business leaders</h2>
            <h3>What is AI engineering?</h3>
            <p>
              AI engineering is the practice of building useful software products on top of foundation models. It combines prompts, retrieval, tools, evaluations, automation, backend systems, and user experience so the AI feature works inside a real business process.
            </p>
            <h3>Where should a business invest in AI first?</h3>
            <p>
              Start with repetitive, knowledge-heavy workflows close to revenue, cost, or customer experience. Customer support, sales enablement, internal knowledge search, document processing, and software delivery usually expose the clearest first opportunities.
            </p>
          </section>

          <section id="how-i-help" class="not-prose mt-12 border border-info/50 bg-info/5 p-6 sm:p-8">
            <p class="font-ibmMono text-xs uppercase tracking-[0.22em] text-info">Work with me</p>
            <h2 class="mt-4 text-3xl font-bold leading-tight">Need an AI feature that survives real users?</h2>
            <p class="mt-4 text-base leading-7 text-primary/70">
              I build full-stack products with Vue, Nuxt, Laravel, Python, automation, and AI workflows. If you need someone who can shape the product, build the interface, connect the backend, and keep the AI part practical, that is the work I do.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:shahab.developer.work@gmail.com?subject=AI%20product%20project"
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
