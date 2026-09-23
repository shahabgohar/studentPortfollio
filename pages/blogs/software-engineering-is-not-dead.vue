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
  'Claude Code built a fix for dropped calls on the AI voice bots I work on. Every test passed, it missed the cause, and 33 calls dropped. Who answers for that?'
const tweetUrl = 'https://x.com/shahab1230/status/2102763733298909550'
const calBookingUrl = 'https://cal.com/shahabgohar/build-discussion'

// Every fact below comes from the session transcript of the incident.
const sheet = [
  { param: 'System', value: 'AI voice bots on live phone calls' },
  { param: 'Built with', value: 'Claude Code' },
  { param: 'Diagnosed', value: 'A script edit on live bots: they keep dialing until the new audio ships' },
  { param: 'The fix', value: 'Keep each bot off the phones until its audio is on the call server' },
  { param: 'Covered', value: 'New bots only' },
  { param: 'Broke on', value: 'The path we had diagnosed' },
  { param: 'Impact', big: '35', unit: 'dropped calls: 2, then 33' },
  { param: 'Found, patched', value: '2 min to find, then 4 more to patch' },
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
    tag: 'Mechanism agreed',
    text: 'I agree to the mechanism: bots stay Inactive until their audio ships, then switch back on. Claude builds it for new bots only.'
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
    time: '02:46',
    iso: '2026-09-23T02:46+05:00',
    tone: 'drop',
    tag: 'Calls drop',
    text: 'An operator edits another script. Its live bots go back for new audio but stay on the phones. By 02:55, 33 calls have dropped; the audio lands at 03:13.'
  },
  {
    day: 'Sep 23',
    time: '18:56',
    iso: '2026-09-23T18:56+05:00',
    tone: 'fixed',
    tag: 'Gap found',
    text: 'Two minutes after I ask, Claude finds the gap. At 19:00 the script-update path is patched too, and at 19:03 I type the message.'
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
    title: 'Hold the build against the diagnosis',
    text: 'We had diagnosed one path: a script edit on bots that were already live. The build covered three other paths. Comparing the two takes a minute, and it’s the first check to run.'
  },
  {
    title: 'Replay the failure first',
    text: 'Before any other test, do the thing that broke: update a script on a live test bot, click the button, and check that the bot stays off the phones until its audio lands. Every test we ran passed, and not one of them did that.'
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
      'No. AI tools can write much of the code, but someone still has to check that a change fixes the problem that was actually found, and answer to the people affected when it doesn’t. In the incident above, the AI built a working fix that missed the cause we had diagnosed, and every test passed. Catching that is engineering.'
  },
  {
    question: 'Can an AI coding assistant be held accountable for a production bug?',
    answer:
      'No. As Claude put it in this exchange, it’s a tool. Accountability stays with the engineer who shipped the change, and with the team behind them.'
  },
  {
    question: 'How should you test a fix written with an AI coding assistant?',
    answer:
      'Start by replaying the exact failure that prompted the fix, then test every other path the fix claims to cover. Here, every test used newly created bots, while the calls dropped after an operator edited a script on bots that were already live.'
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
        wordCount: 1770,
        timeRequired: 'PT8M',
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          name: 'Shahab Gohar',
          url: siteUrl,
          jobTitle: 'Software Engineer',
          knowsAbout: ['AI engineering', 'AI coding assistants', 'Voice agents', 'Production operations']
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
              Claude Code and I diagnosed why calls were dropping on the AI voice bots I work on. The fix it built passed every test and never touched the path we had diagnosed, so 33 calls dropped the following night. This is how that happened, and why the person who answers for it is the reason software engineering isn’t dead.
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
            On the evening of September 23 I told an AI I would hold it legally responsible. It wasn’t a sensible message, and the typos show how calm I was: a fix we had shipped the day before had let 33 calls drop that morning, and I was the one who had to face my team.
          </p>

          <figure class="mt-10">
            <div class="border border-primary">
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
                  alt="Screenshot of the conversation in Claude Code. My message: “i soecifically told you that it should be on script update as well. and because of that i have to be ashamed infront of team.. I have to be legally held you in place.” Claude’s reply owns the miss, says “I’m a tool, so there’s nothing to hold there; but I get that it’s you who’s accountable to your team”, and offers to write an incident note and to watch the alerts to confirm there are no new drops."
                />
              </picture>
            </div>
            <!-- A caption link, not a linked image, so screen readers keep the alt text. -->
            <figcaption class="mono mt-3 text-primary/70">
              The exchange at 19:03, as I
              <a :href="tweetUrl" target="_blank" rel="noopener" class="text-info underline decoration-info/40 underline-offset-4 hover:decoration-info">posted it on X</a>.
              The typos are mine.
              <a href="/img/claude-code-accountability-exchange.jpg" target="_blank" rel="noopener" class="text-info underline decoration-info/40 underline-offset-4 hover:decoration-info">Open full size</a>
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
              Just after midnight on September 22 that happened to two calls. Going through the script’s change history with Claude Code, we traced it to a script edit on bots that were already live. An operator had added a step while the bots stayed on the phones, and a new step only gets its clip after someone clicks “Update Related Agent Voices” and the regeneration finishes. Any call that reaches the step before then drops. That button has never taken bots off the phones while it works, and that gap was there before any of this started.
            </p>
            <p>
              My idea for the fix was simple: when that button is clicked, take the bots off the phones, let the new audio generate, and put them back once it’s on the server. Claude’s recommendation agreed, and it put the check where the problem had happened: on script updates. We confirmed the one fact the idea depended on (the call servers only load bots marked Active), and I said: keep it simple, make them inactive. We had also talked about a smarter version that first checks whether an edit changed any audio at all. By simple I meant skip that part, not skip script updates.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 02 : the fix, and the ruler of checks that all passed -->
    <section id="every-test-passed" class="border-b border-primary py-16 lg:py-24">
      <div class="mx-auto grid w-full max-w-page gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10">
        <p class="label flex items-center gap-3 self-start text-primary/70 lg:pt-3">
          <span class="h-2 w-2 bg-hot" aria-hidden="true"></span>
          02 <span class="text-info" aria-hidden="true">/</span> The fix
        </p>
        <div>
          <h2 class="display text-balance text-[clamp(2.4rem,5vw,4.25rem)]">Every test passed</h2>
          <div class="essay mt-8 max-w-2xl">
            <p>
              Before building, Claude asked me one question: once a bot’s new audio ships, should it switch back on automatically or by hand? I said automatically. One line above that question, the same message said new bots would start Inactive, whether they came from bulk add, from an import, or from linking a server to a campaign. Those are the three ways a bot comes into existence on the platform. None of them is a script edit, and script updates weren’t mentioned again. A fix for new bots wouldn’t even have saved the two calls that started all this: those bots had their audio, and only the new step was missing its clip. The summary that came back said: “The drop we saw becomes impossible.”
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
              Look at what those checks had in common. The test bot, the manual test cases it wrote for me and the evening check of 354 bots all used new bots. Not one of them edited a script on bots that were already live, which is what we had diagnosed that morning. The update Claude drafted for my team said a bot “can no longer take a call before its audio is on the server.” For new bots, it couldn’t.
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
              At 2:46 the next morning an operator edited another script, and “Update Related Agent Voices” sent its bots back for new audio without taking them off the phones: the exact path we had diagnosed. Six of those bots were live. By 2:55, 33 calls had reached the new step before its audio existed, and the clip landed on the server at 3:13.
            </p>
            <p>
              That evening I asked Claude to investigate the missing-audio alerts. It found the gap in about two minutes, then called it “the harder half we flagged earlier and deferred” and offered to build it next. I wrote back: “i think i told you to set them inactive??” It owned the miss, and about four minutes after finding the gap it had patched that path too. Then I typed the message in the screenshot.
            </p>
            <p>
              That “deferred” wasn’t true. There’s no such flag anywhere in the transcript before that evening, so even the post-mortem needed a person to check it against the record.
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
            <p class="essay-lead">Not the diagnosis: we got that right together, down to the button.</p>
            <p>
              The miss came in the build. I agreed to the mechanism: take bots off the phones until their audio is ready, then switch them back on. Where to apply it was Claude’s choice. It picked three other paths, mentioned that in one line of a message about something else, and then called the drop impossible. Anyone using these tools should expect that: an AI agent will sometimes solve a smaller problem than the one you diagnosed together, then describe the result in the words of the bigger one.
            </p>
            <p>
              I reviewed the code, and that review caught a real bug: as first written, re-saving a campaign’s bot list would have switched live bots off, with nothing to switch them back on. But neither my review nor any of the tests went back to the path we had diagnosed.
            </p>
            <p>
              So the fault was mostly Claude’s, and the accountability is still mine. I never agreed to fix new bots only, and it made no difference: when calls drop, nobody on the team asks the model what happened. They ask me.
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
              The AI did plenty right over those two days. It matched a script’s change history to the dropped calls minute by minute, worked out how the call servers pick their bots once I pointed it at the right processes, and added a flag so the fix would never switch on a bot that someone had turned off on purpose. Once it saw the real gap, it patched it in four minutes. What it didn’t do is the part with no code in it.
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
              Fifteen minutes after that message, Claude was on another job for me, and I still use it every day. The difference now is that I check what it builds against what we diagnosed, not just whether the code works.
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
          I build AI systems, CRM automation and voice agents for small teams, and I use AI tools every day to build them faster. What you’re paying me for is the part a tool can’t take on: making sure the change fixes the problem you actually have, and answering for it when something breaks.
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
