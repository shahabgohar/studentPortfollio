<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, resolveComponent } from "vue";
import { useJsonLd } from "~/composeables/useJsonLd";
import { useMetaTags } from "~/composeables/useMetaTags";

useMetaTags();
useJsonLd();

// Resolve NuxtLink to a real component so <component :is> renders a crawlable
// <a href> during prerender. Passing the string "NuxtLink" does not resolve at
// SSR time and leaks a literal <NuxtLink> element with no href.
const NuxtLinkComp = resolveComponent("NuxtLink");

const showFloatBtnFlg = ref(false);

// The track record as a key-specifications table. Every value and note here
// restates something the site already said; do not add new claims.
const specs = [
  { param: "Client rating", value: "5.0", unit: "/ 5.0", cond: "Average across 36 client reviews" },
  { param: "Time to a working demo", value: "14", unit: "days", cond: "Running against your real workflow, or you don't pay" },
  { param: "Unintended writes", value: "0", unit: "", cond: "Live WhatsApp-to-CRM system, in production" },
  { param: "Countries served", value: "10", unit: "", cond: "Including the US, the UK, and Germany" },
  { param: "Shipping software", value: "5+", unit: "years", cond: "" },
  { param: "Pricing model", value: "Fixed", unit: "", cond: "One written quote before work starts. Never hourly" },
];

// Every line below restates something the owner said or the site already
// claims. Sources: consulting + SuiteCRM/Mautic SMS campaigns, WooCommerce
// plugins and native Android are the owner's own words (2026-09-21); approval
// gates, safety auditing and cost ceilings are from his resume; the Store
// add-ons were built at Esper Solutions and are published under that name.
const services = [
  {
    kind: "Build",
    title: "AI engineering",
    to: "/services/ai-development/",
    summary:
      "Assistants, RAG pipelines, and agent workflows that run behind real guardrails: approval gates, dry-run writes, and cost ceilings.",
    proof: "Latest build: WhatsApp leads into a live CRM with 0 unintended writes.",
    stack: "LangChain, FastAPI, OpenAI, Claude",
  },
  {
    kind: "Harden",
    title: "AI prototypes made production-ready",
    summary:
      "A demo that works on a laptop is not a system. I add what is missing: testing against your real data, an approval gate before any live write, safety auditing, and per-run cost ceilings.",
    stack: "Python, FastAPI, LangChain, PostgreSQL",
  },
  {
    kind: "Advise",
    title: "Open-source stack consulting",
    summary:
      "Which tool should run this part of your business? I help you choose the open-source stack, then set it up and extend it.",
    proof: "Example: SuiteCRM with Mautic for a client's SMS campaigns.",
    stack: "SuiteCRM, Mautic, WooCommerce",
  },
  {
    kind: "Build",
    title: "Plugins & custom development",
    summary:
      "WooCommerce plugins, SuiteCRM add-ons, and custom modules for when the off-the-shelf tool stops short.",
    proof: "Two add-ons I built at Esper Solutions are live on the SuiteCRM Store.",
    stack: "WooCommerce, SuiteCRM, PHP",
  },
  {
    kind: "Build",
    title: "Apps, backends & automation",
    summary:
      "Vue and Nuxt frontends, hybrid and native Android apps, desktop apps, and the APIs, integrations, and internal tools behind them. Built end to end without a handoff chain.",
    stack: "Vue, Nuxt, React, Quasar, Laravel, Python, Node, Android (Java)",
  },
];

const buildSteps = [
  {
    badge: "Day 0",
    swatch: "bg-primary",
    title: "Book a 30-minute call",
    text: "Bring the manual process that eats your time, or the idea with no build yet. You leave with a plain-language plan for what to automate or build first.",
  },
  {
    badge: "Days 1-2",
    swatch: "bg-primary/40",
    title: "Fixed scope, fixed price",
    text: "You get a written scope with one price and one deadline. No hourly billing, and nothing starts until you approve it.",
  },
  {
    badge: "Days 3-14",
    swatch: "hazard",
    title: "Build behind a dry-run gate",
    text: "I build against your real data with live writes disabled until you approve them. You watch the system work before it can touch anything that matters.",
  },
  {
    badge: "Go-live",
    swatch: "bg-go",
    title: "Deploy, train, hand over",
    text: "Your team gets a walkthrough, documentation, and a handover video. I stay reachable after launch so nobody is left guessing.",
  },
];

const caseStudies = [
  {
    result: "0 unintended writes in production",
    title: "WhatsApp leads become CRM deals, no human in the loop",
    text: "Reads inbound WhatsApp chats and turns them into structured, deduplicated CRM deals. A provider-agnostic LLM engine extracts 13 fields per conversation behind a fail-closed write gate.",
    href: "/projects/",
  },
  {
    result: "100+ Xero invoices in the first month",
    title: "Bookings matched to payments, then invoiced in Xero",
    text: "Mirrors 13 practitioners' Google Calendars, matches bookings to their Stripe payments, writes the clinic's monthly settlement sheet and raises the Xero invoices. Ambiguous cases wait in a review dashboard, and no invoice is created twice for the same payment.",
    href: "/projects/",
  },
  {
    result: "Agents and RAG live in production",
    title: "Campaign data into expert-reviewed articles",
    text: "A full-stack AI pipeline (FastAPI, Vue 3, PostgreSQL, LangChain) that turns campaign data into reviewed, SEO-ready articles with human approval gates and per-run cost ceilings.",
    href: "/services/ai-development/",
  },
  {
    result: "Reproducible in 1 command",
    title: "Enterprise SuiteCRM migration with a modern UI",
    text: "Moved a brittle deployment onto versioned Docker Compose with SSO, calendar sync, and 6-language localization. Operations now run with a single command.",
    href: "/blogs/suitecrm-migration-european-textile-company/",
  },
  {
    result: "Quote to invoice, zero re-entry",
    title: "Sales workflow automation for a US client",
    text: "Automated the quote, order, and invoice pipeline so the sales team stopped re-typing the same data three times. The client review came back 5.0.",
    href: "/blogs/suitecrm-quote-order-invoice-detection/",
  },
];

const packages = [
  {
    name: "Automation Sprint",
    book: "sprint-1900",
    price: "$1,900",
    tagline: "One painful workflow, automated end to end.",
    duration: "2 weeks",
    popular: false,
    features: [
      "Workflow audit and mapping session",
      "One automation built and integrated (CRM, email, WhatsApp, sheets)",
      "Dry-run safety gate before any live writes",
      "Docs plus a handover video",
      "30 days of post-launch support",
    ],
  },
  {
    name: "Custom Build",
    book: "custom-6500",
    price: "$6,500",
    tagline: "A full product or AI system, owned end to end by one engineer.",
    duration: "4-8 weeks",
    popular: true,
    features: [
      "Web, mobile, or desktop app, or an applied AI workflow",
      "Design, build, and deploy with no team to coordinate",
      "AI guardrails: human approval, fail-closed writes",
      "Integrations with your existing stack",
      "60 days of post-launch support",
    ],
  },
  {
    name: "CRM Ownership",
    book: "crm-retainer",
    price: "$950",
    per: "/mo",
    tagline: "Your SuiteCRM or Mautic, kept fast, integrated, and improving.",
    duration: "monthly, cancel anytime",
    popular: false,
    features: [
      "Small fixes and tweaks handled continuously",
      "One automation improvement shipped every month",
      "Upgrades, monitoring, and backups covered",
      "Priority response when something breaks",
      "No lock-in. The documentation stays yours",
    ],
  },
];

const products = [
  {
    title: "AI Dashlet Generator",
    label: "SuiteCRM add-on",
    url: "https://store.suitecrm.com/addons/ai-dashlet-generator",
    video: "/img/products/ai-dashlet-generator.mp4",
    poster: "/img/products/ai-dashlet-generator-poster.jpg",
    width: 1080,
    height: 512,
    portrait: false,
    alt: "AI Dashlet Generator demo: a text prompt turning into a SuiteCRM dashboard widget",
    summary:
      "Type a prompt, get a SuiteCRM dashboard widget. It replaces manual report configuration with one sentence.",
  },
  {
    title: "Business Card Reader",
    label: "SuiteCRM add-on",
    url: "https://store.suitecrm.com/addons/business-card-reader",
    video: "/img/products/business-card-reader.mp4",
    poster: "/img/products/business-card-reader-poster.jpg",
    width: 400,
    height: 880,
    portrait: true,
    alt: "Business Card Reader demo: scanning a business card and creating a SuiteCRM contact",
    summary:
      "Scans a business card, creates the contact, and queues the follow-up. OCR and QR scanning built for event season.",
  },
];

// Two written references from former/current employers (quoted verbatim from
// the signed letters, dated as stated) and one client review. Do not edit the
// quotes; the letters are the source of truth and referees may be contacted.
const testimonials = [
  {
    client: "Motoki Aoki",
    detail: "CEO, Motocle Inc., Fukuoka, Japan",
    source: "Written reference, June 2023. Full-stack developer at Motocle, 2021 to 2023.",
    quote:
      "His approach to work was characterized by a strong sense of self-management, quick comprehension of requirements, and a work ethic that often reduced the need for extensive communication.",
  },
  {
    client: "Abdul Moeed Khalid",
    detail: "CEO, EsperTech Solutions",
    source: "Written reference. Full Stack Engineer at EsperTech since 2024.",
    quote:
      "His innovative thinking and problem-solving capabilities were instrumental in overcoming technical challenges and achieving project milestones.",
  },
  {
    client: "michaelh622",
    detail: "Client, Germany. CRM & automation",
    source: "One of 36 client reviews, 5.0 average.",
    quote:
      "Proactive, communicative, and deeply committed to the best result. A true star who will fight for your success.",
  },
];

const linkedInUrl = "https://www.linkedin.com/in/shahabgohardev/";

const contactLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shahabgohardev/",
    icon: "ph:linkedin-logo",
  },
  {
    label: "Email",
    href: "mailto:shahab.developer.work@gmail.com?subject=Project%20Inquiry",
    icon: "ph:envelope-simple",
  },
];

const calBookingUrl = "https://cal.com/shahabgohar/build-discussion";

const faqs = [
  {
    q: "We already have a CRM and tools. Do we have to switch?",
    a: "No. I build on top of what you already run. Most projects are integrations and automations around your existing CRM, inbox, WhatsApp, and spreadsheets, not replacements. If your stack genuinely blocks you, I'll say so on the call and tell you the cheapest way out.",
  },
  {
    q: "What does “demo in 14 days or you don't pay” actually mean?",
    a: "After the scoping call you get a written deliverable, one price, and a demo date 14 days out. If I don't show you a working demo running against your real workflow by that date, you owe nothing. The risk sits with me, not you.",
  },
  {
    q: "How much of my team's time will this take?",
    a: "About two hours total for a sprint: the 30-minute call, a short follow-up for access and questions, and a demo review. I handle the build, integration, testing, and documentation.",
  },
  {
    q: "Is AI safe to run against our live business data?",
    a: "Only if it's engineered that way, which is the point. My AI builds run behind dry-run gates and fail-closed writes, with human approval where the risk calls for it. One production system I built processed live WhatsApp leads into a CRM with zero unintended writes.",
  },
  {
    q: "What does it cost?",
    a: "Automation sprints start at $1,900, full custom builds at $6,500, and CRM ownership retainers at $950 a month. Every project gets a fixed written quote before work starts. No hourly billing, no surprise invoices.",
  },
];

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    },
  ],
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// The back-to-top button shows between the hero and the closing CTA (where it
// would otherwise sit on top of the footer wordmark). An IntersectionObserver
// does this without a scroll listener or a library.
const hero = ref<HTMLElement | null>(null);
const closing = ref<HTMLElement | null>(null);
let heroObserver: IntersectionObserver | null = null;

onMounted(() => {
  if (localStorage.getItem("shahab-analytics-consent") === "granted") {
    const { gtag } = useGtag();
    gtag("event", "screen_view", {
      app_name: "Shahab Portfolio",
      screen_name: "Home",
    });
  }

  const visible = new Map<Element, boolean>();
  heroObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) visible.set(entry.target, entry.isIntersecting);
    showFloatBtnFlg.value = ![...visible.values()].some(Boolean);
  });
  // The footer is rendered by app.vue, outside this page's template.
  for (const el of [hero.value, closing.value, document.querySelector("footer")]) {
    if (el) {
      visible.set(el, el === hero.value);
      heroObserver.observe(el);
    }
  }
});

onBeforeUnmount(() => heroObserver?.disconnect());
</script>

<template>
  <div class="min-h-[100dvh] bg-secondary font-inter text-primary">

    <button
      v-if="showFloatBtnFlg"
      class="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center border border-primary bg-secondary text-primary shadow-[4px_4px_0_rgb(var(--c-ink))] transition-colors hover:bg-hot hover:text-[rgb(var(--c-on-hot))]"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <Icon name="ph:arrow-up" size="20" />
    </button>

    <main>
      <!-- HERO : poster headline + a working model of the offer -->
      <section ref="hero" class="border-b border-primary">
        <div class="mx-auto w-full max-w-page px-5 sm:px-8">
          <div class="flex items-center justify-between gap-4 border-b border-primary/15 py-3">
            <p class="label flex items-center gap-2.5 whitespace-nowrap">
              <span class="relative flex h-2 w-2" aria-hidden="true">
                <span class="status-ping absolute inline-flex h-full w-full rounded-full bg-go"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-go"></span>
              </span>
              Open for new builds
            </p>
            <p class="label hidden whitespace-nowrap text-primary/70 lg:block">
              Fixed price <span class="mx-1.5 text-info" aria-hidden="true">/</span> Fixed deadline
              <span class="mx-1.5 text-info" aria-hidden="true">/</span> Fail-closed by design
            </p>
          </div>

          <h1 class="display hero-title pt-7 sm:pt-10">
            <!-- The trailing spaces matter: the lines are display:block spans, so
                 without them the heading's text reads "automation.Working". -->
            <span class="block">Production AI <br class="sm:hidden" />engineering.{{ " " }}</span>
            <span class="block">Working demo <br class="sm:hidden" />in 14 days,{{ " " }}</span>
            <span class="mt-[0.09em] block"><span class="stamp hero-stamp">or you <br class="sm:hidden" />don't pay.</span></span>
          </h1>

          <div
            class="grid grid-cols-1 gap-12 pb-14 pt-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-14 lg:pb-20 lg:pt-12"
          >
            <div>
              <!-- A real person, stated plainly: Western buyers look you up before replying. -->
              <div class="flex items-center gap-4">
                <picture>
                  <source srcset="/img/shahab-gohar-160.webp" type="image/webp" />
                  <img
                    src="/img/shahab-gohar-160.jpg"
                    width="80"
                    height="80"
                    alt="Shahab Gohar"
                    decoding="async"
                    class="h-20 w-20 border border-primary object-cover"
                  />
                </picture>
                <div>
                  <p class="wd-88 text-lg font-bold leading-6">Shahab Gohar</p>
                  <p class="mono mt-1 text-primary/70">AI engineer, 5+ years. Based in Pakistan (UTC+5).</p>
                  <a
                    :href="linkedInUrl"
                    target="_blank"
                    rel="noreferrer"
                    class="mono mt-1.5 inline-flex items-center gap-1.5 text-info underline decoration-info/40 underline-offset-4 hover:decoration-info"
                  >
                    <Icon name="ph:linkedin-logo" size="14" />
                    LinkedIn profile
                  </a>
                </div>
              </div>
              <p class="mt-6 max-w-md text-xl leading-8 text-primary/80">
                I'm Shahab. I build AI systems that hold up in production: agents,
                RAG, and CRM automation, plus the software around them.
              </p>
              <div class="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">
                <a :href="calBookingUrl" target="_blank" rel="noreferrer" class="btn btn-hot">
                  Book a call
                </a>
                <a href="#Work" class="link-arrow">
                  See the work
                  <Icon name="ph:arrow-down" size="16" />
                </a>
              </div>
              <p class="mono mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-primary/70">
                <span class="flex gap-0.5 text-info" aria-hidden="true">
                  <Icon v-for="n in 5" :key="n" name="ph:star-fill" size="14" />
                </span>
                5.0 from 36 client reviews
              </p>
              <p class="mono mt-3 text-primary/70">
                Live overlap every weekday: US Eastern mornings, UK and EU afternoons.
              </p>

              <div class="mt-10 hidden border border-primary/25 lg:block">
                <div class="hazard h-1.5" aria-hidden="true"></div>
                <div class="p-5">
                  <p class="label text-primary/80">The guarantee, in full</p>
                  <p class="mt-3 text-[0.9375rem] leading-[1.6] text-primary/80">
                    You get a written scope, one price, and a demo date 14 days
                    out. No working demo on your real workflow by that date?
                    You owe nothing. The risk sits with me, not you.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <DryRunDemo />
              <p class="mono mt-5 max-w-xl text-primary/65">
                Try it. Simulated run with sample data. On real builds, live
                writes stay disabled until you approve them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- SPECS : the track record as a datasheet table -->
      <section aria-labelledby="specs-title" class="border-b border-primary">
        <div class="mx-auto grid w-full max-w-page gap-x-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]">
          <div class="pt-10 lg:py-12">
            <h2 id="specs-title" class="label text-primary/70">Key specifications</h2>
            <p class="mt-3 hidden max-w-[22ch] text-sm leading-6 text-primary/70 lg:block">
              What each number refers to.
            </p>
          </div>
          <dl class="pb-4 pt-5 lg:py-7">
            <div
              v-for="(spec, i) in specs"
              :key="spec.param"
              class="spec-row grid items-baseline gap-x-6 py-4 lg:py-[1.125rem]"
              :class="i > 0 ? 'border-t border-primary/15' : ''"
            >
              <dt class="spec-param wd-88 text-lg font-bold leading-6">{{ spec.param }}</dt>
              <dd v-if="spec.cond" class="spec-cond text-[0.9375rem] leading-6 text-primary/70">{{ spec.cond }}</dd>
              <dd class="spec-value flex items-baseline justify-end gap-2 whitespace-nowrap text-right">
                <span class="display tabular text-[clamp(2.5rem,4.6vw,3.75rem)] leading-[0.8]">{{ spec.value }}</span>
                <span v-if="spec.unit" class="mono text-primary/70">{{ spec.unit }}</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- SERVICES : index rows -->
      <section id="Services" class="border-b border-primary py-20 lg:py-28">
        <div class="mx-auto w-full max-w-page px-5 sm:px-8">
          <SectionHead kicker="Services" title="One engineer. The whole build.">
            <p>
              AI, frontend, backend, and the glue between them, so you don't
              coordinate three people to ship one system.
            </p>
            <p class="mt-4">
              One vertical I know especially well is CRM:
              <NuxtLink to="/services/suitecrm-development/" class="font-semibold text-info underline decoration-info/40 underline-offset-4 transition hover:decoration-info">SuiteCRM development</NuxtLink>,
              <NuxtLink to="/services/mautic-suitecrm-integration/" class="font-semibold text-info underline decoration-info/40 underline-offset-4 transition hover:decoration-info">Mautic and SuiteCRM integration</NuxtLink>,
              and <NuxtLink to="/services/salesforce-to-suitecrm-migration/" class="font-semibold text-info underline decoration-info/40 underline-offset-4 transition hover:decoration-info">Salesforce-to-SuiteCRM migration</NuxtLink>.
            </p>
          </SectionHead>

          <ol class="-mx-5 mt-14 border-t border-primary sm:-mx-8">
            <li v-for="service in services" :key="service.title" class="reveal border-b border-primary/20">
              <component
                :is="service.to ? NuxtLinkComp : 'div'"
                :to="service.to"
                class="group grid gap-x-10 gap-y-4 px-5 py-8 transition-colors sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,5.4fr)_minmax(0,3.6fr)] lg:py-10"
                :class="service.to ? 'hover:bg-primary hover:text-secondary' : ''"
              >
                <p class="label pt-1.5 text-primary/70 group-hover:text-inherit">
                  {{ service.kind }}
                </p>
                <div>
                  <h3 class="wd-75 text-[clamp(1.85rem,3.2vw,2.75rem)] font-extrabold leading-[1.02] tracking-tight">
                    {{ service.title }}
                  </h3>
                  <p class="mt-4 max-w-xl leading-7 text-primary/75 group-hover:text-inherit">{{ service.summary }}</p>
                  <p v-if="service.proof" class="mt-3 max-w-xl text-sm leading-6 text-primary/70 group-hover:text-inherit">
                    {{ service.proof }}
                  </p>
                </div>
                <div class="flex items-start justify-between gap-6 lg:flex-col lg:items-end">
                  <p class="mono text-primary/70 group-hover:text-inherit lg:text-right">{{ service.stack }}</p>
                  <span
                    v-if="service.to"
                    class="grid h-11 w-11 shrink-0 place-items-center border border-current transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    <Icon name="ph:arrow-up-right" size="20" />
                  </span>
                </div>
              </component>
            </li>
          </ol>
        </div>
      </section>

      <!-- PROCESS : a 14-day ruler -->
      <section id="Process" class="border-b border-primary py-20 lg:py-28">
        <div class="mx-auto w-full max-w-page px-5 sm:px-8">
          <SectionHead kicker="Process" title="Two weeks from first call to working demo.">
            <p>
              A fixed process with a fixed price, built so you see it working
              before it touches your live systems.
            </p>
          </SectionHead>

          <div class="mt-14 hidden md:block" aria-hidden="true">
            <div class="flex h-4 border border-primary">
              <span class="bg-primary" style="flex: 1"></span>
              <span class="bg-primary/40" style="flex: 2"></span>
              <span class="hazard" style="flex: 12"></span>
            </div>
            <div class="mono tabular mt-2 grid grid-cols-[repeat(15,minmax(0,1fr))] text-primary/65">
              <span v-for="d in 15" :key="d" class="border-l border-primary/30 pl-1.5">{{ d - 1 }}</span>
            </div>
          </div>

          <ol class="mt-10 grid border-t border-primary md:mt-8 md:grid-cols-2 lg:grid-cols-4">
            <li
              v-for="(step, i) in buildSteps"
              :key="step.title"
              class="reveal border-b border-primary/20 py-8 md:px-7 md:first:pl-0 lg:border-b-0 lg:py-9"
              :class="[i > 0 ? 'lg:border-l lg:border-primary/20' : '', i % 2 === 1 ? 'md:border-l md:border-primary/20' : 'md:pl-0 lg:pl-7', i === 0 ? 'lg:!pl-0' : '']"
            >
              <p class="label flex items-center gap-3 text-primary/80">
                <span class="h-3 w-6 border border-primary" :class="step.swatch" aria-hidden="true"></span>
                {{ step.badge }}
              </p>
              <h3 class="wd-75 mt-5 text-[1.75rem] font-extrabold leading-[1.05] tracking-tight">{{ step.title }}</h3>
              <p class="mt-4 leading-7 text-primary/75">{{ step.text }}</p>
            </li>
          </ol>
        </div>
      </section>

      <!-- WORK : editorial rows -->
      <section id="Work" class="border-b border-primary py-20 lg:py-28">
        <div class="mx-auto w-full max-w-page px-5 sm:px-8">
          <SectionHead kicker="Work" title="Recent builds, measured by what they changed." />

          <div class="-mx-5 mt-14 border-t border-primary sm:-mx-8">
            <component
              :is="item.href ? (item.href.startsWith('http') ? 'a' : NuxtLinkComp) : 'article'"
              v-for="item in caseStudies"
              :key="item.title"
              :href="item.href && item.href.startsWith('http') ? item.href : undefined"
              :to="item.href && !item.href.startsWith('http') ? item.href : undefined"
              class="reveal group grid gap-x-10 gap-y-4 border-b border-primary/20 px-5 py-9 transition-colors hover:bg-primary hover:text-secondary sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:py-11"
            >
              <p class="display text-[1.65rem] leading-[0.95] text-info transition-colors group-hover:text-hot lg:max-w-[14ch] lg:text-[2rem]">
                {{ item.result }}
              </p>
              <div class="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
                <div>
                  <h3 class="wd-75 text-[clamp(1.6rem,2.7vw,2.25rem)] font-extrabold leading-[1.05] tracking-tight">
                    {{ item.title }}
                  </h3>
                  <p class="mt-4 max-w-2xl leading-7 text-primary/75 group-hover:text-inherit">{{ item.text }}</p>
                </div>
                <span
                  class="hidden h-11 w-11 shrink-0 place-items-center border border-current transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:grid"
                >
                  <Icon name="ph:arrow-up-right" size="20" />
                </span>
              </div>
            </component>
          </div>

          <NuxtLink to="/projects/" class="link-arrow mt-10">
            View all projects
            <Icon name="ph:arrow-right" size="18" />
          </NuxtLink>
        </div>
      </section>

      <!-- PRICING : one ruled table + the math -->
      <section id="Pricing" class="border-b border-primary py-20 lg:py-28">
        <div class="mx-auto w-full max-w-page px-5 sm:px-8">
          <SectionHead kicker="Pricing" title="Three ways to work with me. All fixed price.">
            <p>
              You know the price and the deadline before anything starts. Exact
              quote after the first call, never hourly.
            </p>
          </SectionHead>

          <div class="mt-14 grid border border-primary lg:grid-cols-3">
            <article
              v-for="(pkg, i) in packages"
              :key="pkg.name"
              class="reveal relative flex flex-col p-7 sm:p-9"
              :class="[
                pkg.popular ? 'bg-primary text-secondary' : '',
                i > 0 ? 'border-t border-primary lg:border-l lg:border-t-0' : '',
              ]"
            >
              <div class="flex min-h-[1.75rem] items-start justify-between gap-4">
                <h3 class="label pt-1.5" :class="pkg.popular ? 'text-secondary/75' : 'text-primary/75'">{{ pkg.name }}</h3>
                <span v-if="pkg.popular" class="label stamp !px-2 !py-1">Most popular</span>
              </div>
              <p class="mt-7 flex items-baseline gap-2">
                <span class="label" :class="pkg.popular ? 'text-secondary/65' : 'text-primary/65'">from</span>
                <span class="display tabular text-[clamp(3.5rem,6vw,4.75rem)]">{{ pkg.price }}</span>
                <span v-if="pkg.per" class="wd-75 text-2xl font-bold">{{ pkg.per }}</span>
              </p>
              <p class="mono mt-3 uppercase" :class="pkg.popular ? 'text-secondary/70' : 'text-primary/70'">
                {{ pkg.duration }}
              </p>
              <p class="mt-6 min-h-[3.5rem] text-lg leading-7">{{ pkg.tagline }}</p>
              <ul
                class="mt-6 grid gap-3 border-t pt-6"
                :class="pkg.popular ? 'border-secondary/25' : 'border-primary/20'"
              >
                <li
                  v-for="feature in pkg.features"
                  :key="feature"
                  class="flex items-start gap-3 text-[0.9375rem] leading-6"
                  :class="pkg.popular ? 'text-secondary/85' : 'text-primary/80'"
                >
                  <Icon name="ph:check" class="mt-1 text-info" :class="pkg.popular ? '!text-hot' : ''" size="15" />
                  {{ feature }}
                </li>
              </ul>
              <div class="flex-1 pt-9" aria-hidden="true"></div>
              <a
                :href="`${calBookingUrl}?utm_source=portfolio&utm_medium=pricing&utm_campaign=book_a_call&utm_content=${pkg.book}`"
                target="_blank"
                rel="noreferrer"
                class="btn w-full"
                :class="pkg.popular ? 'btn-hot !shadow-none' : 'btn-line'"
              >
                Book a call
              </a>
            </article>
          </div>

          <!-- ROI : do the math with your own numbers -->
          <div class="reveal mt-20 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10">
            <div>
              <p class="label text-primary/70">Do the math</p>
              <h3 class="wd-75 mt-4 text-[1.9rem] font-extrabold leading-[1.05] tracking-tight">
                What is the copy-paste costing you?
              </h3>
              <p class="mt-4 text-sm leading-6 text-primary/70">
                Typical example for a small team. On the call we'll do this math
                with your actual numbers. If the automation doesn't pay for
                itself, I'll tell you not to build it.
              </p>
            </div>
            <RoiCalculator />
          </div>
        </div>
      </section>

      <!-- PRODUCTS : real footage, loaded on approach -->
      <section id="Products" class="border-b border-primary py-20 lg:py-28">
        <div class="mx-auto w-full max-w-page px-5 sm:px-8">
          <SectionHead kicker="Products" title="Add-ons I built, live on the SuiteCRM Store.">
            <p>
              I built these at Esper Solutions. They are published on the official
              SuiteCRM Store under that name.
            </p>
          </SectionHead>

          <div class="mt-14 grid gap-px border border-primary bg-primary lg:grid-cols-[1.75fr_1fr]">
            <article
              v-for="product in products"
              :key="product.title"
              class="reveal flex flex-col bg-secondary"
            >
              <div
                class="flex flex-1 items-center justify-center border-b border-primary bg-well"
                :class="product.portrait ? 'px-6 py-7' : 'p-4 sm:p-7'"
              >
                <DemoVideo
                  :src="product.video"
                  :poster="product.poster"
                  :width="product.width"
                  :height="product.height"
                  :label="product.alt"
                  class="border border-primary"
                  :class="product.portrait ? 'h-[23rem]' : 'w-full'"
                />
              </div>
              <div class="p-7 sm:p-9">
                <p class="label text-primary/70">{{ product.label }}</p>
                <h3 class="wd-75 mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-tight">{{ product.title }}</h3>
                <p class="mt-4 max-w-md leading-7 text-primary/75">{{ product.summary }}</p>
                <a :href="product.url" target="_blank" rel="noreferrer" class="link-arrow mt-6">
                  View on the Store
                  <Icon name="ph:arrow-up-right" size="16" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- PROOF : one loud quote, two quiet ones -->
      <section id="Proof" class="border-b border-primary py-20 lg:py-28">
        <div class="mx-auto w-full max-w-page px-5 sm:px-8">
          <SectionHead kicker="Proof" title="What employers and clients say.">
            <p>Two written references from the companies I have worked for, and one of 36 client reviews with a 5.0 average.</p>
          </SectionHead>

          <div class="mt-14 grid gap-px border border-primary bg-primary lg:grid-cols-[1.5fr_1fr]">
            <figure class="reveal flex flex-col justify-between bg-secondary p-7 sm:p-11 lg:row-span-2">
              <blockquote
                class="wd-75 text-balance text-[clamp(1.6rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-tight"
              >
                <span class="display mb-2 block text-[5rem] leading-[0.6] text-hot" aria-hidden="true">&ldquo;</span>
                {{ testimonials[0].quote }}
              </blockquote>
              <figcaption class="mt-10 flex items-center gap-4">
                <span class="display grid h-12 w-12 place-items-center bg-primary text-xl text-secondary">
                  {{ testimonials[0].client.charAt(0) }}
                </span>
                <div>
                  <p class="font-semibold">{{ testimonials[0].client }}</p>
                  <p class="text-sm text-primary/80">{{ testimonials[0].detail }}</p>
                  <p class="mono mt-1 text-primary/70">{{ testimonials[0].source }}</p>
                </div>
              </figcaption>
            </figure>
            <figure
              v-for="review in testimonials.slice(1)"
              :key="review.client"
              class="reveal flex flex-col justify-between bg-secondary p-7 sm:p-9"
            >
              <blockquote class="text-lg leading-8 text-primary/85">&ldquo;{{ review.quote }}&rdquo;</blockquote>
              <figcaption class="mt-7 flex items-center gap-4">
                <span class="display grid h-10 w-10 place-items-center border border-primary text-lg">
                  {{ review.client.charAt(0) }}
                </span>
                <div>
                  <p class="font-semibold">{{ review.client }}</p>
                  <p class="text-sm text-primary/80">{{ review.detail }}</p>
                  <p class="mono mt-1 text-primary/70">{{ review.source }}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <!-- FAQ : every answer visible -->
      <section id="FAQ" class="border-b border-primary py-20 lg:py-28">
        <div class="mx-auto w-full max-w-page px-5 sm:px-8">
          <SectionHead kicker="FAQ" title="Common questions." />

          <dl class="mt-14 border-t border-primary">
            <div
              v-for="faq in faqs"
              :key="faq.q"
              class="reveal grid gap-x-10 gap-y-4 border-b border-primary/20 py-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-10"
            >
              <dt class="wd-75 text-[1.6rem] font-extrabold leading-[1.1] tracking-tight">{{ faq.q }}</dt>
              <dd class="leading-7 text-primary/75">{{ faq.a }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- CTA : inverted poster block behind hazard tape -->
      <section id="Contact" ref="closing" class="bg-primary text-secondary">
        <div class="hazard h-3" aria-hidden="true"></div>
        <div class="mx-auto w-full max-w-page px-5 py-20 sm:px-8 lg:py-28">
          <p class="label text-secondary/70">Start here</p>
          <h2 class="display text-balance mt-7 max-w-[15ch] text-[clamp(3rem,9vw,8rem)]">
            Bring me the workflow that <span class="stamp">eats your day.</span>
          </h2>
          <div class="mt-10 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
            <div>
              <div class="flex items-start gap-6">
                <picture class="hidden shrink-0 sm:block">
                  <source srcset="/img/shahab-gohar-480.webp" type="image/webp" />
                  <img
                    src="/img/shahab-gohar-480.jpg"
                    width="160"
                    height="160"
                    alt="Shahab Gohar"
                    loading="lazy"
                    decoding="async"
                    class="h-32 w-32 border border-secondary/40 object-cover"
                  />
                </picture>
                <p class="max-w-xl text-xl leading-8 text-secondary/80">
                  Send a manual process that costs hours, a half-broken system, or
                  an idea with no build yet. You'll get a straight answer on what
                  to build first.
                </p>
              </div>
              <div class="mt-8 flex flex-wrap items-center gap-4">
                <a :href="calBookingUrl" target="_blank" rel="noreferrer" class="btn btn-hot !shadow-[4px_4px_0_rgb(var(--c-paper))]">
                  Book a call
                </a>
                <a
                  v-for="link in contactLinks"
                  :key="link.label"
                  :href="link.href"
                  target="_blank"
                  rel="noreferrer"
                  class="btn border-secondary/40 text-secondary hover:border-secondary hover:bg-secondary hover:text-primary"
                >
                  <Icon :name="link.icon" size="17" />
                  {{ link.label }}
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>

  </div>
</template>

<style scoped>
/* Spec rows: parameter + condition stack on phones, sit side by side on desktop,
   with the value always pinned to the right edge like a datasheet column. */
.spec-row {
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    'param value'
    'cond value';
}

.spec-param {
  grid-area: param;
}

.spec-cond {
  grid-area: cond;
}

.spec-value {
  grid-area: value;
  align-self: center;
}

@media (min-width: 768px) {
  .spec-row {
    grid-template-columns: minmax(0, 4fr) minmax(0, 6fr) minmax(7rem, auto);
    grid-template-areas: 'param cond value';
  }
}

/* Sized so the longest line ("WORKING DEMO IN 14 DAYS,") spans the content
   width: five stacked lines on phones, three on wider screens. */
.hero-title {
  font-size: 14.4vw;
}

@media (min-width: 640px) {
  .hero-title {
    /* the vh term keeps the demo in view on short laptop screens */
    /* sized to the longest line, "PRODUCTION AI ENGINEERING." (10.95em wide) */
    font-size: min(8.15vw, 6.7rem, 15.5vh);
  }
}

/* The orange block wipes in behind text that is already painted, so the
   headline (the LCP element) is never hidden waiting for an animation. */
@media (prefers-reduced-motion: no-preference) {
  .hero-stamp {
    animation: stamp-in 700ms cubic-bezier(0.65, 0, 0.2, 1) 250ms backwards;
  }

  .status-ping {
    animation: status-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
}

@keyframes stamp-in {
  from {
    background-size: 0% 100%;
  }
  to {
    background-size: 100% 100%;
  }
}

.hero-stamp {
  background-color: transparent;
  background-image: linear-gradient(rgb(var(--c-hot)), rgb(var(--c-hot)));
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

@keyframes status-ping {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  70%,
  100% {
    transform: scale(2.8);
    opacity: 0;
  }
}
</style>
