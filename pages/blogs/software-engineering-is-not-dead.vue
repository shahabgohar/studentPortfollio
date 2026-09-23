<script setup lang="ts">
import {definePageMeta} from "#imports";
import {blogPosts} from "~/data/blogPosts";
import {useJsonLd} from "~/composeables/useJsonLd";

// A story post, so it borrows the homepage's parts (poster headline, datasheet,
// ruler, hazard-tape CTA) instead of the older sidebar article layout.
const post = blogPosts.find((item) => item.slug === 'software-engineering-is-not-dead')!
const siteUrl = 'https://shahabgohar.dev'
const articleUrl = `${siteUrl}/blogs/${post.slug}/`
const articleImage = `${siteUrl}/img/og-software-engineering-is-not-dead.png`
const screenshotImage = `${siteUrl}/img/claude-code-accountability-exchange.jpg`
const seoTitle = 'Software Engineering Isn’t Dead. 33 Dropped Calls Show Why'
const seoDescription =
  'Claude Code built a fix for dropped calls on my AI voice bots. Every test passed, and 33 calls dropped anyway. Why the person who answers keeps the job.'
const tweetUrl = 'https://x.com/shahab1230/status/2102763733298909550'
const calBookingUrl = 'https://cal.com/shahabgohar/build-discussion'

// Every fact below comes from the session transcript of the incident.
const sheet = [
  { param: 'System', value: 'AI voice bots on live phone calls' },
  { param: 'Built with', value: 'Claude Code' },
  { param: 'The fix', value: 'Keep each bot off the phones until its audio is on the call server' },
  { param: 'Covered', value: 'New bots' },
  { param: 'Broke on', value: 'A script edit on bots already live' },
  { param: 'Impact', big: '33', unit: 'dropped calls' },
  { param: 'Found, fixed', big: '2 / 4', unit: 'min, once I asked' },
  { param: 'Who answers', stamp: 'Me' }
]

type Tone = 'drop' | 'plan' | 'pass' | 'fixed'

// Pakistan time (UTC+5).
const timeline: { day: string; time: string; iso: string; tone: Tone; tag: string; text: string }[] = [
  {
    day: 'Sep 22',
    time: '00:41',
    iso: '2026-09-22T00:41+05:00',
    tone: 'drop',
    tag: 'Calls drop',
    text: 'A new step in a script has no audio on the call server yet. Two calls hit it and drop.'
  },
  {
    day: 'Sep 22',
    time: '07:42',
    iso: '2026-09-22T07:42+05:00',
    tone: 'plan',
    tag: 'Plan approved',
    text: 'The fix: new bots stay Inactive until their audio ships. Script edits aren’t in the plan.'
  },
  {
    day: 'Sep 22',
    time: '13:28',
    iso: '2026-09-22T13:28+05:00',
    tone: 'pass',
    tag: 'Test passed',
    text: 'A new test bot waits, Inactive, until its audio ships, then switches itself on.'
  },
  {
    day: 'Sep 22',
    time: '22:37',
    iso: '2026-09-22T22:37+05:00',
    tone: 'pass',
    tag: 'Check passed',
    text: 'All 354 bots the team created that evening come out right.'
  },
  {
    day: 'Sep 23',
    time: '02:54',
    iso: '2026-09-23T02:54+05:00',
    tone: 'drop',
    tag: 'Calls drop',
    text: 'A script edit sends six live bots back for new audio. 33 calls drop before it lands.'
  },
  {
    day: 'Sep 23',
    time: '18:56',
    iso: '2026-09-23T18:56+05:00',
    tone: 'fixed',
    tag: 'Gap found',
    text: 'Two minutes after I ask, Claude finds the gap. At 19:00 script edits are gated too, and at 19:03 I type the message.'
  }
]

const toneSwatch: Record<Tone, string> = {
  drop: 'hazard',
  plan: 'bg-primary/40',
  pass: 'bg-go',
  fixed: 'bg-primary'
}

const toneText: Record<Tone, string> = {
  drop: 'text-info',
  plan: 'text-primary/75',
  pass: 'text-go',
  fixed: 'text-primary'
}

const practices = [
  {
    title: 'Hold the plan against the incident',
    text: 'The diagnosis said a script edit had added a step. The plan said new bots. Reading one against the other takes a minute, and neither of us did it.'
  },
  {
    title: 'Replay the failure first',
    text: 'Before any other test, do the thing that broke: edit a script on a live test bot and check that it stays off the phones until its audio lands. Every check we ran passed, and not one of them did that.'
  },
  {
    title: 'Put a scope next to every strong word',
    text: '“Impossible”, “tested end-to-end” and “can no longer” were each true for new bots. Nobody wrote “for new bots” beside them, so they read as true for everything, including to me.'
  },
  {
    title: 'Answer for it',
    text: 'This is the part that doesn’t move to a tool, however good the tool gets. The tool said so itself.'
  }
]

// Shared by the visible section and the FAQPage schema so they cannot drift.
const faqs = [
  {
    question: 'Is software engineering dead because of AI?',
    answer:
      'No. AI tools can write much of the code, but someone still has to decide what a change must cover, prove that it covers it, and answer to the people affected when it doesn’t. In the incident above, the AI built a working fix for the wrong scope, and every test passed. Catching that is engineering.'
  },
  {
    question: 'Can an AI coding assistant be held accountable for a production bug?',
    answer:
      'No. As Claude put it in this exchange, it’s a tool. Accountability stays with the engineer who approved and shipped the change, and with the team behind them.'
  },
  {
    question: 'How should you test a fix written with an AI coding assistant?',
    answer:
      'Start by replaying the exact failure that prompted the fix, then test every other path the plan claims to cover. Here, every test used newly created bots, while the calls had dropped after a script edit on bots that were already live.'
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
        'is software engineering dead, AI coding assistant, Claude Code, AI accountability, AI-written code, production incident, AI voice agents'
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
        image: [articleImage, screenshotImage],
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        articleSection: post.category,
        keywords: post.tags.join(', '),
        wordCount: 1600,
        timeRequired: 'PT7M',
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          name: 'Shahab Gohar',
          url: siteUrl,
          jobTitle: 'Software Engineer',
          knowsAbout: ['AI engineering', 'AI coding assistants', 'Voice agents', 'Production operations', 'SuiteCRM']
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
</script>

<template>
  <main class="bg-secondary text-primary">
    <!-- HEADER : poster headline + the incident at a glance -->
    <header class="border-b border-primary">
      <div class="mx-auto w-full max-w-page px-5 sm:px-8">
        <div class="flex items-center justify-between gap-4 border-b border-primary/15 py-3">
          <NuxtLink to="/blogs/" class="label inline-flex items-center gap-2 text-primary/70 transition-colors hover:text-info">
            <Icon name="ph:arrow-left" size="14" />
            All posts
          </NuxtLink>
          <p class="label hidden whitespace-nowrap text-primary/70 sm:block">
            {{ post.category }} <span class="mx-1.5 text-info" aria-hidden="true">/</span>
            {{ post.date }} <span class="mx-1.5 text-info" aria-hidden="true">/</span>
            {{ post.readingTime }}
          </p>
        </div>

        <h1 class="display post-title pt-8 sm:pt-12">
          <!-- The trailing space keeps the heading's text from reading "fix.I". -->
          <span class="block">The AI wrote <br class="sm:hidden" />the fix.{{ ' ' }}</span>
          <span class="mt-[0.09em] block"><span class="stamp">I answered <br class="sm:hidden" />for it.</span></span>
        </h1>
        <p class="label mt-6 text-primary/70 sm:hidden">
          {{ post.category }} <span class="mx-1 text-info" aria-hidden="true">/</span> {{ post.date }}
          <span class="mx-1 text-info" aria-hidden="true">/</span> {{ post.readingTime }}
        </p>

        <div class="grid grid-cols-1 gap-12 pb-14 pt-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-14 lg:pb-20 lg:pt-12">
          <div>
            <p class="max-w-xl text-xl leading-8 text-primary/80">
              Claude Code built a fix for dropped calls on the AI voice bots I work on. Every test passed, and 33 calls dropped the following night anyway. This is what the AI missed, what I missed, and why the person who answers for it is the reason software engineering isn’t dead.
            </p>
            <div class="mt-8 flex items-center gap-4">
              <picture>
                <source srcset="/img/shahab-gohar-160.webp" type="image/webp" />
                <img
                  src="/img/shahab-gohar-160.jpg"
                  width="64"
                  height="64"
                  alt="Shahab Gohar"
                  decoding="async"
                  class="h-16 w-16 border border-primary object-cover"
                />
              </picture>
              <div>
                <p class="wd-88 text-lg font-bold leading-6">Shahab Gohar</p>
                <p class="mono mt-1 text-primary/70">AI engineer, 5+ years. Based in Pakistan (UTC+5).</p>
              </div>
            </div>
          </div>

          <div class="border border-primary">
            <div class="hazard h-1.5" aria-hidden="true"></div>
            <div class="flex items-center justify-between gap-4 border-b border-primary/20 px-5 py-3 sm:px-6">
              <p class="label">Incident sheet</p>
              <p class="mono text-primary/70">Sep 22–23, 2026</p>
            </div>
            <dl class="px-5 sm:px-6">
              <div
                v-for="(row, i) in sheet"
                :key="row.param"
                class="grid grid-cols-[7rem_minmax(0,1fr)] gap-x-4 py-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-5"
                :class="[i > 0 ? 'border-t border-primary/15' : '', row.stamp ? 'items-center' : 'items-baseline']"
              >
                <dt class="label text-primary/70">{{ row.param }}</dt>
                <dd v-if="row.big" class="flex flex-wrap items-baseline gap-x-2.5">
                  <span class="display tabular text-[2.6rem] leading-[0.85]">{{ row.big }}</span>
                  <span class="mono text-primary/70">{{ row.unit }}</span>
                </dd>
                <dd v-else-if="row.stamp">
                  <span class="display stamp text-[2.2rem]">{{ row.stamp }}</span>
                </dd>
                <dd v-else class="wd-88 font-semibold leading-6">{{ row.value }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </header>

    <!-- EXHIBIT : the exchange -->
    <section id="exhibit" class="border-b border-primary py-16 lg:py-24">
      <div class="mx-auto grid w-full max-w-page gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10">
        <p class="label flex items-center gap-3 self-start text-primary/70 lg:pt-2">
          <span class="h-2 w-2 bg-hot" aria-hidden="true"></span>
          Exhibit A
        </p>
        <div>
          <p class="max-w-3xl text-[clamp(1.3rem,2.2vw,1.7rem)] font-medium leading-[1.5]">
            On the evening of September 23 I told an AI I would hold it legally responsible. It wasn’t a sensible message, and the typos show how calm I was: a fix I had approved had let 33 calls drop that morning, and I was the one who had to face my team.
          </p>

          <figure class="mt-10">
            <!-- Links to the full-size file: the text is too small to read on a phone. -->
            <a
              href="/img/claude-code-accountability-exchange.jpg"
              target="_blank"
              rel="noopener"
              class="block border border-primary transition-colors hover:border-info"
              aria-label="Open the screenshot at full size"
            >
              <picture>
                <source
                  type="image/webp"
                  srcset="/img/claude-code-accountability-exchange-1000.webp 1000w, /img/claude-code-accountability-exchange.webp 1688w"
                  sizes="(min-width: 1240px) 870px, (min-width: 1024px) 70vw, 100vw"
                />
                <img
                  src="/img/claude-code-accountability-exchange.jpg"
                  width="1688"
                  height="1092"
                  loading="lazy"
                  decoding="async"
                  class="block h-auto w-full"
                  alt="Screenshot of the conversation in Claude Code. My message: “i soecifically told you that it should be on script update as well. and because of that i have to be ashamed infront of team.. I have to be legally held you in place.” Claude’s reply owns the miss, says “I’m a tool, so there’s nothing to hold there; but I get that it’s you who’s accountable to your team”, and offers an incident note and proof that the drops have stopped."
                />
              </picture>
            </a>
            <figcaption class="mono mt-3 text-primary/70">
              The exchange at 19:03, as I
              <a :href="tweetUrl" target="_blank" rel="noopener" class="text-info underline decoration-info/40 underline-offset-4 hover:decoration-info">posted it on X</a>.
              The typos are mine.
            </figcaption>
          </figure>

          <figure class="mt-14 max-w-3xl">
            <blockquote class="wd-75 text-balance text-[clamp(1.6rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-tight">
              <span class="display mb-2 block text-[5rem] leading-[0.6] text-hot" aria-hidden="true">&ldquo;</span>
              I’m a tool, so there’s nothing to hold there; but I get that it’s you who’s accountable to your team.
            </blockquote>
            <figcaption class="mono mt-5 text-primary/70">Claude Code, in its reply</figcaption>
          </figure>

          <div class="essay mt-10 max-w-2xl">
            <p>
              It’s right, and I think that one sentence answers the question people keep asking about my job. Software engineering isn’t dead, and it won’t be, because somebody still has to be that “you”.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 01 : what happened -->
    <section id="what-happened" class="border-b border-primary py-16 lg:py-24">
      <div class="mx-auto grid w-full max-w-page gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10">
        <p class="label flex items-center gap-3 self-start text-primary/70 lg:pt-3">
          <span class="h-2 w-2 bg-hot" aria-hidden="true"></span>
          01 <span class="text-info" aria-hidden="true">/</span> The bug
        </p>
        <div>
          <h2 class="display text-balance text-[clamp(2.4rem,5vw,4.25rem)]">What happened, in plain terms</h2>
          <div class="essay mt-8 max-w-2xl">
            <p>
              I work on a platform that makes phone calls with AI voice bots. Each bot follows a call script, and every step of the script has an audio clip, which the platform generates in advance and copies to the server handling the calls. If a call reaches a step whose clip isn’t on that server yet, the bot has nothing to say and the call drops.
            </p>
            <p>
              Just after midnight on September 22 that happened to two calls. The script’s change history, which I went through with Claude Code, told the whole story: a colleague had added a step, two calls reached it about twenty minutes later, and the missing clip only arrived after the next edit regenerated the audio.
            </p>
            <p>
              My idea for the fix was simple. When a script changes, take its bots off the phones, let the new audio generate, and put them back once it’s on the server. Claude’s recommendation agreed, and it put the check where the problem had happened: on script updates. We confirmed the one fact the idea depended on (the call servers only load bots marked Active, so an Inactive bot never gets a call), and I said: keep it simple, make them inactive.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 02 : the fix, and the ruler of checks that all passed -->
    <section id="every-check-passed" class="border-b border-primary py-16 lg:py-24">
      <div class="mx-auto grid w-full max-w-page gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10">
        <p class="label flex items-center gap-3 self-start text-primary/70 lg:pt-3">
          <span class="h-2 w-2 bg-hot" aria-hidden="true"></span>
          02 <span class="text-info" aria-hidden="true">/</span> The fix
        </p>
        <div>
          <h2 class="display text-balance text-[clamp(2.4rem,5vw,4.25rem)]">Every check passed</h2>
          <div class="essay mt-8 max-w-2xl">
            <p>
              The plan Claude put in front of me said new bots would start Inactive, whether they came from bulk add, from an import, or from linking a server to a campaign. Those are the three ways a bot comes into existence on the platform. Script edits weren’t on the list, and nothing said it was leaving them for later. I approved it, and the summary that came back said: “The drop we saw becomes impossible.”
            </p>
          </div>

          <ol class="mt-12 border-t border-primary" aria-label="Timeline, Pakistan time">
            <li
              v-for="event in timeline"
              :key="event.iso"
              class="relative grid grid-cols-[5.25rem_minmax(0,1fr)] gap-x-5 border-b border-primary/20 py-5 pl-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-x-8 sm:py-6 sm:pl-6"
            >
              <span
                class="absolute inset-y-0 left-0 w-1.5"
                :class="event.tone === 'drop' ? 'hazard' : ''"
                aria-hidden="true"
              ></span>
              <time :datetime="event.iso" class="block">
                <span class="mono block text-primary/70">{{ event.day }}</span>
                <span class="display tabular mt-1 block text-[2.3rem] sm:text-[3rem]">{{ event.time }}</span>
              </time>
              <div>
                <p class="label flex items-center gap-3" :class="toneText[event.tone]">
                  <span class="h-3 w-6 shrink-0 border border-primary" :class="toneSwatch[event.tone]" aria-hidden="true"></span>
                  {{ event.tag }}
                </p>
                <p class="mt-2.5 max-w-xl leading-7 text-primary/80">{{ event.text }}</p>
              </div>
            </li>
          </ol>
          <p class="mono mt-3 text-primary/70">Times are Pakistan time (UTC+5).</p>

          <div class="essay mt-10 max-w-2xl">
            <p>
              Look at what those checks had in common. The test bot, the manual test cases it wrote for me and the evening check of 354 bots all used new bots; not one of them edited a script on a bot that was already live, which is exactly how the first two calls had dropped. The update Claude drafted for my team said a bot “can no longer take a call before its audio is on the server.” For new bots, it couldn’t.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 03 : the miss -->
    <section id="the-miss" class="border-b border-primary py-16 lg:py-24">
      <div class="mx-auto grid w-full max-w-page gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10">
        <p class="label flex items-center gap-3 self-start text-primary/70 lg:pt-3">
          <span class="h-2 w-2 bg-hot" aria-hidden="true"></span>
          03 <span class="text-info" aria-hidden="true">/</span> The miss
        </p>
        <div>
          <h2 class="display text-balance text-[clamp(2.4rem,5vw,4.25rem)]">Then the calls dropped again</h2>
          <div class="essay mt-8 max-w-2xl">
            <p>
              Around 2:54 the next morning, someone updated a script and sent its bots back for new audio. Six of those bots were live, and they stayed live while the system generated the new clip. 33 calls reached the new step before its audio did; the clip landed about 19 minutes later.
            </p>
            <p>
              That evening I asked Claude to investigate the missing-audio alerts. It found the gap in about two minutes and said it plainly: the gate made new bots wait for their audio, but did nothing when a script edit sent live bots back for new audio. Four minutes later it had gated that path too. Then I typed the message in the screenshot.
            </p>
            <p>
              Its apology owned the miss, with one claim that wasn’t true. It said it had flagged script edits as “deferred” when it built the gate. There’s no such flag anywhere in the transcript, so even the post-mortem needed a person to check it against the record.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 04 : ownership -->
    <section id="whose-miss" class="border-b border-primary py-16 lg:py-24">
      <div class="mx-auto grid w-full max-w-page gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10">
        <p class="label flex items-center gap-3 self-start text-primary/70 lg:pt-3">
          <span class="h-2 w-2 bg-hot" aria-hidden="true"></span>
          04 <span class="text-info" aria-hidden="true">/</span> Ownership
        </p>
        <div>
          <h2 class="display text-balance text-[clamp(2.4rem,5vw,4.25rem)]">Whose miss was it?</h2>
          <div class="essay mt-8 max-w-2xl">
            <p class="essay-lead">Both of ours, and the part that counts is mine.</p>
            <p>
              I asked for the fix on script updates, and the tool narrowed it to new bots without saying so. Anyone using these tools should expect that. An AI agent will sometimes solve a smaller problem than the one you gave it, then describe the result in the words of the bigger one.
            </p>
            <p>
              But the plan listed its scope, and I approved it. I reviewed the code too, and that review caught a real bug: as first written, re-saving a campaign’s bot list would have switched live bots off, with nothing to switch them back on. I read the code carefully and never held the plan up against the incident, and it was the plan that dropped the calls.
            </p>
            <p>
              When calls drop, nobody on the team asks the model what happened. They ask me.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 : the job that stays -->
    <section id="the-job" class="border-b border-primary py-16 lg:py-24">
      <div class="mx-auto grid w-full max-w-page gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10">
        <p class="label flex items-center gap-3 self-start text-primary/70 lg:pt-3">
          <span class="h-2 w-2 bg-hot" aria-hidden="true"></span>
          05 <span class="text-info" aria-hidden="true">/</span> The job
        </p>
        <div>
          <h2 class="display text-balance text-[clamp(2.4rem,5vw,4.25rem)]">The part AI didn’t take</h2>
          <div class="essay mt-8 max-w-2xl">
            <p>
              Give the AI its due. Over those two days it matched a script’s change history to the dropped calls minute by minute, worked out how the call servers pick their bots by reading the processes running on them, and added a flag so the fix would never switch on a bot that someone had turned off on purpose. Once it saw the real gap, it closed it in four minutes. What it didn’t do is the part with no code in it.
            </p>
          </div>

          <ol class="mt-12 grid border-t border-primary sm:grid-cols-2">
            <li
              v-for="(practice, i) in practices"
              :key="practice.title"
              class="reveal border-b border-primary/20 py-8 sm:py-9"
              :class="i % 2 === 1 ? 'sm:border-l sm:pl-7' : 'sm:pr-7'"
            >
              <p class="display tabular text-[2.75rem] leading-none text-info">0{{ i + 1 }}</p>
              <h3 class="wd-75 mt-4 text-[1.6rem] font-extrabold leading-[1.1] tracking-tight">{{ practice.title }}</h3>
              <p class="mt-3 leading-7 text-primary/75">{{ practice.text }}</p>
            </li>
          </ol>

          <div class="essay mt-10 max-w-2xl">
            <p>
              That’s why I don’t buy “software engineering is dead.” Typing code was never the whole job. Deciding what a change has to cover, proving that it does, and standing behind it when it doesn’t: that’s the job, and it matters more now that code is cheap.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 06 : for buyers -->
    <section id="hiring" class="border-b border-primary py-16 lg:py-24">
      <div class="mx-auto grid w-full max-w-page gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10">
        <p class="label flex items-center gap-3 self-start text-primary/70 lg:pt-3">
          <span class="h-2 w-2 bg-hot" aria-hidden="true"></span>
          06 <span class="text-info" aria-hidden="true">/</span> Hiring
        </p>
        <div>
          <h2 class="display text-balance text-[clamp(2.4rem,5vw,4.25rem)]">If you’re hiring someone to build with AI</h2>
          <div class="essay mt-8 max-w-2xl">
            <p>
              Anyone building with AI will tell you they’re fast, and they probably are. Ask them two other things. How do you test a fix: do you start by replaying the failure that caused it? And when a change you made with AI breaks something at 2:54 in the morning, who answers for it? If the second answer is vague, the first one doesn’t matter much.
            </p>
            <p>
              For the record, I gave Claude its next task about fifteen minutes after that message, and I still use it every day. The difference now is that I read its plans against the problem, not just its code against the plan.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ : every answer visible -->
    <section id="faq" class="border-b border-primary py-16 lg:py-24">
      <div class="mx-auto w-full max-w-page px-5 sm:px-8">
        <div class="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10">
          <p class="label flex items-center gap-3 self-start text-primary/70 lg:pt-3">
            <span class="h-2 w-2 bg-hot" aria-hidden="true"></span>
            FAQ
          </p>
          <h2 class="display text-balance text-[clamp(2.4rem,5vw,4.25rem)]">Quick answers</h2>
        </div>

        <dl class="mt-12 border-t border-primary">
          <div
            v-for="faq in faqs"
            :key="faq.question"
            class="reveal grid gap-x-10 gap-y-4 border-b border-primary/20 py-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-10"
          >
            <dt class="wd-75 text-[1.6rem] font-extrabold leading-[1.1] tracking-tight">{{ faq.question }}</dt>
            <dd class="leading-7 text-primary/75">{{ faq.answer }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- CTA : inverted poster block behind hazard tape -->
    <section id="work-with-me" class="bg-primary text-secondary">
      <div class="hazard h-3" aria-hidden="true"></div>
      <div class="mx-auto w-full max-w-page px-5 py-20 sm:px-8 lg:py-28">
        <p class="label text-secondary/70">Work with me</p>
        <h2 class="display mt-7 text-[clamp(2.6rem,6vw,6rem)]">
          <span class="block">AI writes a lot <br class="sm:hidden" />of my code.{{ ' ' }}</span>
          <span class="mt-[0.09em] block"><span class="stamp">I answer for <br class="sm:hidden" />all of it.</span></span>
        </h2>
        <p class="mt-10 max-w-2xl text-xl leading-8 text-secondary/80">
          I build AI systems, CRM automation and voice agents for small teams, and I use AI tools every day to build them faster. What you’re paying me for is the part that doesn’t move to a tool: making sure the change fixes the problem you actually have, and answering for it when something breaks.
          It’s how I run my <NuxtLink to="/services/ai-development/" class="text-secondary underline decoration-secondary/40 underline-offset-4 hover:decoration-secondary">AI development</NuxtLink> work.
        </p>
        <div class="mt-9 flex flex-wrap items-center gap-4">
          <a :href="calBookingUrl" target="_blank" rel="noreferrer" class="btn btn-hot !shadow-[4px_4px_0_rgb(var(--c-paper))]">
            Book a call
          </a>
          <a
            href="mailto:shahab.developer.work@gmail.com?subject=Building%20with%20AI"
            class="btn border-secondary/40 text-secondary hover:border-secondary hover:bg-secondary hover:text-primary"
          >
            <Icon name="ph:envelope-simple" size="17" />
            Email me
          </a>
          <NuxtLink
            to="/blogs/"
            class="btn border-secondary/40 text-secondary hover:border-secondary hover:bg-secondary hover:text-primary"
          >
            More posts
            <Icon name="ph:arrow-right" size="17" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Sized so "THE AI WROTE THE FIX." (about 8.85em wide) fits the content column:
   four stacked lines on phones, two on wider screens. */
.post-title {
  font-size: 16.5vw;
}

@media (min-width: 640px) {
  .post-title {
    font-size: min(9.6vw, 8rem);
  }
}

.essay {
  font-size: 1.125rem;
  line-height: 1.8;
}

.essay p {
  color: rgb(var(--c-ink) / 0.8);
}

.essay p + p {
  margin-top: 1.25rem;
}

.essay .essay-lead {
  font-size: clamp(1.3rem, 2.2vw, 1.6rem);
  font-weight: 700;
  line-height: 1.35;
  color: rgb(var(--c-ink));
}
</style>
