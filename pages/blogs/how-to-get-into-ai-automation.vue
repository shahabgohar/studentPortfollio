<script setup lang="ts">
import {definePageMeta} from "#imports";
import {blogPosts} from "~/data/blogPosts";
import {useJsonLd} from "~/composeables/useJsonLd";

const post = blogPosts.find((item) => item.slug === 'how-to-get-into-ai-automation')!
const siteUrl = 'https://shahabgohar.dev'
const articleUrl = `${siteUrl}/blogs/${post.slug}/`
const articleImage = `${siteUrl}/img/og-image.png`
const seoTitle = 'How to Get Into AI Automation: The Skills You Need in 2026'
const seoDescription =
  'You don’t need a CS degree to get into AI automation. Here’s the real skill stack, from no-code tools and Python to SQL, system design, RAG, and LLM observability, and the order to learn it in.'

definePageMeta({
  title: post.title
})

useHead({
  title: seoTitle,
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
        wordCount: 2400,
        timeRequired: 'PT13M',
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          name: 'Shahab Gohar',
          url: siteUrl,
          jobTitle: 'AI Automation Engineer',
          knowsAbout: [
            'AI automation',
            'Prompt engineering',
            'Retrieval-augmented generation',
            'LLM observability',
            'n8n',
            'Make',
            'SQL',
            'SuiteCRM',
            'Business process automation'
          ]
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
            name: 'What should I learn first for AI automation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Learn to read a business process and its data before any tool. Then pick one automation platform (Make is the best balance for beginners), learn webhooks and JSON, add basic Python and SQL, and only then move to the AI layer: prompt engineering, retrieval-augmented generation, and evaluating model output. Business understanding first, tools second, AI last.'
            }
          },
          {
            '@type': 'Question',
            name: 'How long does it take to learn AI automation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'If you already write Python and understand APIs, three to five months of steady practice can get you to paid work. Starting from scratch, plan for eight to twelve months, especially part-time. Most 2026 AI-engineering roadmaps land in that range. The variable is not the tools; it is how quickly you learn to read a business and ship something that survives real data.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is n8n, Make, or Zapier best for beginners?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Zapier is the easiest first hour and the fastest to get expensive, hitting paywalls the moment you need logic or loops. Make is the best balance: visual, affordable, and powerful enough to grow into. n8n is the hardest to set up but the easiest to scale, it is open source, and you can self-host it for free. Learn on Make, grow into n8n.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do you need to know RAG and vector databases for AI automation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, once you move past simple workflows. Retrieval-augmented generation (RAG) is how you make a model answer from a client’s own documents and data instead of its training memory, which removes most hallucinations. It is one of the top skills hiring managers ask for in 2026, alongside AI agents and evaluation. You do not need it on day one, but you will need it fast.'
            }
          }
        ]
      })
    }
  ]
})
useJsonLd()

const sections = [
  { id: 'short-answer', label: 'The short answer' },
  { id: 'tools', label: 'The tools' },
  { id: 'business', label: 'Read the business' },
  { id: 'data', label: 'Data analysis' },
  { id: 'systems', label: 'System design' },
  { id: 'shipping', label: 'Security and shipping' },
  { id: 'ai-layer', label: 'The AI layer' },
  { id: 'start', label: 'Where to start' },
  { id: 'faq', label: 'FAQ' },
  { id: 'keep-going', label: 'Keep going' }
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
            The no-code tool everyone starts with is the smallest part of the job. Here's the real skill stack behind AI automation, why each layer matters, and the order to learn it in.
          </p>
        </header>

        <div class="prose-content max-w-3xl py-10">
          <section id="short-answer">
            <p class="lead">
              Getting into AI automation takes four things, and only one of them is a tool. You learn to read a business well enough to know what's worth automating, you analyse its data to find where the time leaks out, you design a system that can be watched and trusted, and you learn where a language model actually belongs. The no-code platform everyone obsesses over, n8n or Make or Zapier, is the entry ticket, not the skill.
            </p>
            <p>
              That's the honest version, and it's why most people stall. They learn the tool, build a demo that works once, and never get near the parts a business will pay for. This is a map of the whole stack, written by someone who builds these systems for a living: what each layer is, why it matters, and where a beginner should actually start.
            </p>
          </section>

          <section id="tools">
            <h2>The tools are the easy part</h2>
            <p>
              Every automation, from a two-step notification to an agent that reads invoices, is the same shape: something happens (a trigger), you have some data, you do something with it (an action). No-code platforms give you that shape without code, and you can learn one in a weekend. That's exactly why the tool is where people get stuck. It's the visible 10 percent, so it feels like the whole thing.
            </p>
            <p>
              Three platforms own this space, and picking one paralyses beginners longer than it should. Here's the short version:
            </p>
            <div class="not-prose my-8 overflow-x-auto">
              <table class="w-full border-collapse text-left text-sm">
                <thead>
                  <tr class="border-b border-primary/20 font-ibmMono text-xs uppercase tracking-[0.14em] text-primary/60">
                    <th class="py-3 pr-4 font-medium">Tool</th>
                    <th class="py-3 pr-4 font-medium">Best for</th>
                    <th class="py-3 pr-4 font-medium">The catch</th>
                  </tr>
                </thead>
                <tbody class="align-top">
                  <tr class="border-b border-primary/10">
                    <td class="py-4 pr-4 font-semibold text-info">Zapier</td>
                    <td class="py-4 pr-4 text-primary/75">Your first hour. Thousands of app connections, a guided linear builder, working automation in minutes.</td>
                    <td class="py-4 pr-4 text-primary/65">Gets expensive fast. The moment you need logic, loops, or data reshaping, you hit a paywall, usually in week one.</td>
                  </tr>
                  <tr class="border-b border-primary/10">
                    <td class="py-4 pr-4 font-semibold text-info">Make</td>
                    <td class="py-4 pr-4 text-primary/75">Most beginners. A visual canvas that shows data flowing between steps, far cheaper than Zapier, powerful enough for real work.</td>
                    <td class="py-4 pr-4 text-primary/65">A slightly steeper first few hours. Worth it.</td>
                  </tr>
                  <tr>
                    <td class="py-4 pr-4 font-semibold text-info">n8n</td>
                    <td class="py-4 pr-4 text-primary/75">Growing into. Open source, self-hostable for free, no cap on complexity, and it teaches you the real plumbing.</td>
                    <td class="py-4 pr-4 text-primary/65">Hardest to set up on day one. Easiest to live with after.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              My advice: learn on Make because the visual canvas quietly teaches you how data moves, then grow into n8n when you want to self-host and stop paying per task. Try Zapier for an afternoon so you understand what everyone means when they say "a Zap," then leave it. Whichever you pick, the platform is not the thing you're actually learning. Everything below is.
            </p>
          </section>

          <section id="business">
            <h2>Learn to read the business before you touch the software</h2>
            <p>
              This is the skill nobody sells a course on, and it's the one that separates a freelancer who charges $30 an hour from one who charges $3,000 a project. A tool executes a process. If you don't understand the process, you automate confusion faster. The most expensive mistake beginners make is building something impressive for a problem nobody actually had.
            </p>
            <p>
              Sitting with how a company really works, not how its org chart says it works, is where the value hides. Which task gets done forty times a day? Where does a human copy data from one screen into another? What breaks when the person who "just knows how it works" goes on holiday? You find those answers by asking, listening, and mapping, not by opening n8n.
            </p>
            <h3>The questions that find the automation worth building</h3>
            <p>
              Good discovery is a handful of blunt questions asked in the right order. What does this process actually cost in hours per week? Who touches it, and where does it stall? What happens today when it goes wrong? If this ran perfectly overnight while everyone slept, what would change on Monday? The answers tell you whether an automation is worth building at all, and that judgment is worth more than any tool skill, because it's the difference between saving a client real money and handing them a clever toy.
            </p>
          </section>

          <section id="data">
            <h2>Data analysis is how you find what to automate</h2>
            <p>
              A business will tell you what it thinks is slow. Its data will tell you the truth. Learning to pull, slice, and read data is how you find the process quietly bleeding hours that nobody flagged, and how you prove, afterward, that your automation actually did something. Without it you're guessing; with it you're diagnosing.
            </p>
            <h3>SQL and notebooks are your x-ray on the business</h3>
            <p>
              Learn SQL properly. Almost every business stores its real state in a database, and being able to query it directly, counting how often a status changes, finding the records that never get followed up, spotting the duplicate customers, means you can see the shape of a problem instead of taking someone's word for it. Then pick up a Jupyter notebook with a little Python and pandas, and you can go further: chart how a number moves over time, find the pattern behind the complaints, answer the hidden question the client didn't know to ask. Data analysis doesn't just tell you what to automate. It often changes which questions you ask next, and the good ones surface there.
            </p>
          </section>

          <section id="systems">
            <h2>System design: build it to be tracked, not just to run</h2>
            <p>
              A demo runs once on clean input. A system runs every day on whatever mess arrives, and tells you when something's wrong before the client does. The distance between those two is engineering judgment, and it's the tier where hobby automations either grow up or quietly fail in the dark.
            </p>
            <h3>Database design, because automations have to remember</h3>
            <p>
              The moment an automation does anything beyond fire-and-forget, it needs a memory. Which records has it already processed? What was the last state it saw? Which items are waiting on a human? You need at least basic database design to store and track that reliably, or you get the classic beginner disaster: the automation runs twice, processes the same order twice, and now there are two invoices. Knowing how to model and store state is what makes an automation idempotent, which is a fancy word for "safe to run again."
            </p>
            <h3>Cron, webhooks, and a dashboard that warns you</h3>
            <p>
              Automations fire two ways: on a schedule (cron) or on an event (a webhook). Knowing both, and knowing which fits, is core. But the piece beginners skip entirely is visibility. Build a small frontend or dashboard that shows what the automation is doing: what ran, what succeeded, what's stuck, what threw an error at 3am. When something misbehaves, and it will, that dashboard is the difference between catching it in ten minutes and hearing about it from an angry client three days later. I put a status view on almost everything I ship, because "is it working?" should never be a question you can't answer instantly.
            </p>
          </section>

          <section id="shipping">
            <h2>Security, deployment, and CI/CD</h2>
            <p>
              Once you're touching a client's data, you've crossed into grown-up territory, and casual stops being acceptable. You're holding customer records, API keys, sometimes payment or personal information. Client information security is not optional here: least-privilege access, secrets kept out of the code and out of logs, encryption where it matters, and a clear answer to "who can see this data and why." Get this wrong once and you don't get a second project.
            </p>
            <p>
              Then there's shipping. An automation isn't done when it works on your laptop; it's done when it runs reliably somewhere it won't get switched off. You need to deploy it, whether that's a self-hosted n8n, a small server, or a cloud function, and you want a deployment pipeline (CI/CD) so a change you push gets tested and released without you manually breaking the live system that a business now depends on. Version control with Git underneath all of it, so you can see what changed and roll back when a "small tweak" takes everything down. None of this is glamorous. All of it is why people trust you with the next, bigger job.
            </p>
          </section>

          <section id="ai-layer">
            <h2>The AI layer, done properly</h2>
            <p>
              Everything so far applies to plain automation. The AI layer is what turns "move this field there" into "read this messy email and figure out what the customer actually wants." It's also where beginners do the most damage, because a language model is confident, fast, and wrong just often enough to hurt. Three skills separate a real AI automation from a demo that embarrasses you in production.
            </p>
            <h3>Write prompts with the attention mechanism in mind</h3>
            <p>
              Prompt engineering is more than asking nicely. Models weigh some parts of your input more heavily than others, so structure matters: put the instruction where it lands, keep the critical context close to the task, and don't bury the one rule that matters under three paragraphs of preamble. Understanding, even roughly, how a model attends to its context and where things fall out of that context window is what turns prompting from guesswork into something you can debug. When output goes wrong, you want to know why, not just retype and pray.
            </p>
            <h3>Put an audit around the model</h3>
            <p>
              This is the skill almost no one teaches and the one that will define whether your AI automations are trusted. A model is a black box that drifts, so you wrap it in observability: log every input, every output, and what the model turned one into the other. Then you add evaluation and guardrails, a confidence threshold, a check that the output is even valid JSON before it writes to a CRM, a human review on the risky records, a rule that catches obvious nonsense before it ships. Hiring managers in 2026 list evaluation and reliable, observable AI features right next to RAG and agents, because everyone can call an API and almost no one can prove their AI did the right thing. I've built automations where the entire point was zero unintended writes to the database, and the guardrails were most of the work, not an afterthought.
            </p>
            <h3>RAG, so it answers from their data</h3>
            <p>
              Retrieval-augmented generation is how you stop a model from making things up. Instead of relying on its training memory, you retrieve the client's real documents, policies, or records, usually from a vector database, and hand them to the model as context so its answer is grounded in their truth rather than the internet's average. RAG is one of the most requested skills of the moment, and it's the bridge from "cute chatbot" to "assistant that actually knows this business." Once RAG clicks, AI agents and tool use (the model deciding which action to take, then taking it) are the natural next step, but don't rush there. A grounded, audited single-step automation beats a flashy agent you can't trust.
            </p>
          </section>

          <section id="start">
            <h2>How long it takes, and where to start</h2>
            <p>
              Honest timeline: if you already write Python and understand APIs, three to five months of steady building gets you to paid work. From a standing start, closer to eight to twelve, especially part-time. That's roughly where most 2026 AI-engineering roadmaps land, and it matches what I see in people who actually make the jump.
            </p>
            <p>
              Don't try to learn this list top to bottom like a syllabus; you'll drown. Start in the middle, with the business and the data, because that's where the value and the least competition are. Then build one real automation end to end, something with an ugly input and a result someone cares about, and let it force you to pick up the next skill only when you hit its edge. You'll need a database the first time your automation double-processes something. You'll need error handling the first time it dies silently. You'll reach for AI the first time a rule can't parse a human sentence. Skills learned because a real build demanded them stick; skills learned from a course you're halfway through evaporate.
            </p>
          </section>

          <section id="faq">
            <h2>Frequently asked questions</h2>
            <h3>What should I learn first for AI automation?</h3>
            <p>
              Learn to read a business process and its data before any tool. Then pick one platform (Make is the best balance for beginners), learn webhooks and JSON, add basic Python and SQL, and only then move to the AI layer. Business understanding first, tools second, AI last.
            </p>
            <h3>How long does it take to learn AI automation?</h3>
            <p>
              Three to five months if you already write Python; eight to twelve from scratch, especially part-time. The bottleneck isn't the tools, it's learning to read a business and ship something that survives real, messy data.
            </p>
            <h3>Is n8n, Make, or Zapier best for a beginner?</h3>
            <p>
              Learn on Make, because it's visual and cheap. Grow into n8n, because it's open source and self-hostable with no ceiling. Try Zapier for an hour to understand the basics, but don't build your future on it; it gets pricey the moment you need real logic.
            </p>
            <h3>Do you need RAG and vector databases?</h3>
            <p>
              Once you pass simple workflows, yes. RAG is how you make a model answer from a client's own data instead of its imagination, and it removes most hallucinations. It's one of the top-requested AI skills in 2026. Not day one, but soon after.
            </p>
          </section>

          <section id="keep-going" class="not-prose mt-12 border border-info/50 bg-info/5 p-6 sm:p-8">
            <p class="font-ibmMono text-xs uppercase tracking-[0.22em] text-info">Keep going</p>
            <h2 class="mt-4 text-3xl font-bold leading-tight">See the stack in real builds</h2>
            <p class="mt-4 text-base leading-7 text-primary/70">
              This is the work I do every week: CRM automation, Mautic and SuiteCRM integration, and AI steps that read the messy stuff and hand back clean, checked data. If you want to see these skills play out on real projects instead of practice ones, these go deep on actual builds.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <NuxtLink
                to="/blogs/suitecrm-quote-order-invoice-detection/"
                class="inline-flex items-center gap-2 bg-info px-5 py-3 font-ibmMono text-sm text-secondary transition hover:opacity-90"
              >
                Quote to invoice automation
                <Icon name="mdi:arrow-right" size="18" />
              </NuxtLink>
              <NuxtLink
                to="/blogs/ai-engineering-revolution/"
                class="inline-flex items-center gap-2 border border-primary/15 px-5 py-3 font-ibmMono text-sm text-primary/75 transition hover:border-info hover:text-info"
              >
                Where AI engineering pays off
                <Icon name="mdi:arrow-top-right" size="18" />
              </NuxtLink>
              <NuxtLink
                to="/projects/"
                class="inline-flex items-center gap-2 border border-primary/15 px-5 py-3 font-ibmMono text-sm text-primary/75 transition hover:border-info hover:text-info"
              >
                View projects
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

.prose-content ol {
  margin-top: 1.5rem;
  display: grid;
  gap: 0.9rem;
  padding-left: 1.4rem;
  list-style: decimal;
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

.prose-content table th,
.prose-content table td {
  vertical-align: top;
}
</style>
