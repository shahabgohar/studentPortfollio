<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useJsonLd } from "~/composeables/useJsonLd";
import { useMetaTags } from "~/composeables/useMetaTags";

useMetaTags();
useJsonLd();

const showFloatBtnFlg = ref(false);

const metrics = [
  { value: "5.0", label: "average client rating" },
  { value: "35+", label: "five-star reviews" },
  { value: "10", label: "countries served" },
  { value: "6+", label: "years shipping software" },
];

const services = [
  {
    title: "AI development",
    icon: "ph:brain",
    featured: true,
    summary:
      "Assistants, RAG pipelines, and agent workflows that run behind real guardrails: approval gates, dry-run writes, and cost ceilings.",
    proof: "Latest build: WhatsApp leads into a live CRM with 0 unintended writes.",
    stack: "LangChain, FastAPI, OpenAI, Claude",
  },
  {
    title: "Web, mobile & desktop apps",
    icon: "ph:devices",
    featured: false,
    summary:
      "Vue and Nuxt frontends, hybrid mobile, and desktop apps. Built end to end without a handoff chain.",
    stack: "Vue, Nuxt, React, Quasar",
  },
  {
    title: "Backend & automation",
    icon: "ph:plugs-connected",
    featured: false,
    summary:
      "APIs, integrations, and internal tools that remove repetitive manual work from your team's week.",
    stack: "Laravel, Python, Node",
  },
];

const buildSteps = [
  {
    badge: "Day 0",
    title: "Book a 30-minute call",
    text: "Bring the manual process that eats your time, or the idea with no build yet. You leave with a plain-language plan for what to automate or build first.",
  },
  {
    badge: "Days 1-2",
    title: "Fixed scope, fixed price",
    text: "You get a written scope with one price and one deadline. No hourly billing, and nothing starts until you approve it.",
  },
  {
    badge: "Days 3-14",
    title: "Build behind a dry-run gate",
    text: "I build against your real data with live writes disabled until you approve them. You watch the system work before it can touch anything that matters.",
  },
  {
    badge: "Go-live",
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
    href: "",
  },
];

const packages = [
  {
    name: "Automation Sprint",
    book: "sprint-1900",
    price: "from $1,900",
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
    price: "from $6,500",
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
    price: "from $950/mo",
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

const roiStats = [
  { value: "2 h/day", label: "typical manual copy-paste between inbox, sheets, and CRM" },
  { value: "$13,000+", label: "what that costs per year at $25 an hour" },
  { value: "< 2 months", label: "typical payback on an automation sprint" },
];

const products = [
  {
    title: "AI Dashlet Generator",
    label: "SuiteCRM add-on",
    url: "https://store.suitecrm.com/addons/ai-dashlet-generator",
    video: "/img/products/ai-dashlet-generator.mp4",
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
    width: 400,
    height: 880,
    portrait: true,
    alt: "Business Card Reader demo: scanning a business card and creating a SuiteCRM contact",
    summary:
      "Scans a business card, creates the contact, and queues the follow-up. OCR and QR scanning built for event season.",
  },
];

const testimonials = [
  {
    client: "michaelh622",
    country: "Germany",
    type: "CRM & automation",
    featured: true,
    quote:
      "Proactive, communicative, and deeply committed to the best result. A true star who will fight for your success.",
  },
  {
    client: "kininvestments",
    country: "United States",
    type: "Sales automation",
    featured: false,
    quote:
      "Customized a full quote-to-order-to-invoice flow with change detection and hosting fixes.",
  },
  {
    client: "devin_lester",
    country: "United Kingdom",
    type: "Full-stack build",
    featured: false,
    quote:
      "Clean code, strong problem-solving, no bugs, and work that went beyond expectations.",
  },
];

const contactLinks = [
  {
    label: "Email",
    href: "mailto:shahab.developer.work@gmail.com?subject=Project%20Inquiry",
    icon: "ph:envelope-simple",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shahabgohar/",
    icon: "ph:linkedin-logo",
  },
  {
    label: "Skype",
    href: "https://join.skype.com/invite/ve8oN0kKdvXQ",
    icon: "ph:skype-logo",
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

function scrollToSection(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

let gsapCtx: gsap.Context | null = null;

function setupAnimations(reduceMotion: boolean) {
  gsapCtx = gsap.context(() => {
    // Visibility toggle for the back-to-top button (not an animation, so it
    // runs regardless of the reduced-motion preference).
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        showFloatBtnFlg.value = self.scroll() > 640;
      },
    });

    if (reduceMotion) {
      document
        .querySelectorAll<HTMLVideoElement>("[data-product-video]")
        .forEach((v) => v.pause());
      return;
    }

    gsap
      .timeline({ defaults: { ease: "power3.out", duration: 0.7 } })
      .from("[data-hero-item]", { y: 26, opacity: 0, stagger: 0.09 });

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 26,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  });
}

onMounted(() => {
  if (localStorage.getItem("shahab-analytics-consent") === "granted") {
    const { gtag } = useGtag();
    gtag("event", "screen_view", {
      app_name: "Shahab Portfolio",
      screen_name: "Home",
    });
  }
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  nextTick(() => setupAnimations(reduceMotion));
});

onBeforeUnmount(() => {
  gsapCtx?.revert();
});
</script>

<template>
  <main class="min-h-[100dvh] bg-secondary font-inter text-primary">
    <button
      v-if="showFloatBtnFlg"
      class="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-xl border border-primary/15 bg-secondary text-primary shadow-lg transition hover:border-info hover:text-info active:scale-[0.97]"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <Icon name="ph:arrow-up" size="20" />
    </button>

    <!-- NAV -->
    <nav
      class="sticky top-0 z-40 border-b border-primary/10 bg-secondary/85 backdrop-blur-md"
    >
      <div
        class="mx-auto flex w-full max-w-[1120px] items-center justify-between px-6 py-4 text-sm sm:px-8"
      >
        <button
          class="font-grotesk text-lg font-bold tracking-tight"
          aria-label="Back to top"
          @click="scrollToTop"
        >
          Shahab<span class="text-info">.</span>dev
        </button>
        <div class="hidden items-center gap-7 font-medium text-primary/65 md:flex">
          <button class="transition hover:text-info" @click="scrollToSection('Services')">Services</button>
          <button class="transition hover:text-info" @click="scrollToSection('Work')">Work</button>
          <button class="transition hover:text-info" @click="scrollToSection('Pricing')">Pricing</button>
          <NuxtLink to="/projects/" class="transition hover:text-info">Projects</NuxtLink>
          <NuxtLink to="/blogs/" class="transition hover:text-info">Blog</NuxtLink>
        </div>
        <a
          :href="calBookingUrl"
          target="_blank"
          rel="noreferrer"
          class="rounded-xl border border-info px-4 py-2 font-medium text-info transition hover:bg-info hover:text-secondary active:scale-[0.98]"
        >
          Book a call
        </a>
      </div>
    </nav>

    <!-- HERO -->
    <header
      class="relative overflow-hidden bg-[radial-gradient(70%_90%_at_20%_0%,rgba(52,211,153,0.09),transparent_60%)]"
    >
      <div class="mx-auto w-full max-w-[1120px] px-6 pb-16 pt-16 sm:px-8 lg:pb-24 lg:pt-24">
        <div data-hero-item>
          <span
            class="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-3.5 py-1.5 text-[13px] font-medium text-info"
          >
            <span class="h-2 w-2 rounded-full bg-info" aria-hidden="true"></span>
            Open for new builds
          </span>
        </div>
        <h1
          data-hero-item
          class="text-balance mt-7 max-w-5xl font-grotesk text-[2.6rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl"
        >
          AI automation. Working demo in 14 days,
          <span class="text-info">or you don't pay.</span>
        </h1>
        <p data-hero-item class="mt-7 max-w-xl text-lg leading-8 text-primary/65">
          I'm Shahab. I build the AI workflows, CRM automations, and custom
          apps that end your team's copy-paste work.
        </p>
        <div data-hero-item class="mt-9 flex flex-wrap gap-3">
          <a
            :href="calBookingUrl"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-2 rounded-xl bg-info px-5 py-3 font-semibold text-secondary transition hover:opacity-90 active:scale-[0.98]"
          >
            Book a call
            <Icon name="ph:arrow-right" size="18" />
          </a>
          <button
            class="inline-flex items-center gap-2 rounded-xl border border-primary/15 px-5 py-3 font-medium transition hover:border-info hover:text-info active:scale-[0.98]"
            @click="scrollToSection('Work')"
          >
            See the work
          </button>
        </div>
      </div>
    </header>

    <!-- METRICS BAND -->
    <section
      aria-label="Track record"
      class="border-y border-primary/10"
    >
      <div
        class="mx-auto grid w-full max-w-[1120px] grid-cols-2 gap-x-8 gap-y-8 px-6 py-10 sm:px-8 lg:grid-cols-4"
      >
        <div v-for="m in metrics" :key="m.label" class="flex flex-col">
          <span class="tabular font-grotesk text-3xl font-bold tracking-tight sm:text-4xl">{{ m.value }}</span>
          <span class="mt-1.5 text-[13px] leading-5 text-primary/55">{{ m.label }}</span>
        </div>
      </div>
    </section>

    <div class="mx-auto w-full max-w-[1120px] px-6 sm:px-8">
      <!-- SERVICES : asymmetric bento -->
      <section id="Services" class="py-24">
        <h2 class="max-w-2xl font-grotesk text-4xl font-bold tracking-tight sm:text-5xl">
          One engineer. The whole build.
        </h2>
        <p class="mt-5 max-w-xl text-lg leading-8 text-primary/60">
          AI, frontend, backend, and the glue between them, so you don't
          coordinate three people to ship one system.
        </p>
        <div class="mt-12 grid gap-4 lg:grid-cols-[1.45fr_1fr]">
          <article
            class="reveal flex flex-col justify-between rounded-2xl border border-info/30 bg-gradient-to-br from-info/[0.12] via-info/[0.04] to-transparent p-8 lg:row-span-2 lg:p-10"
          >
            <div>
              <span class="grid h-12 w-12 place-items-center rounded-xl border border-info/40 bg-secondary/60 text-info">
                <Icon :name="services[0].icon" size="26" />
              </span>
              <h3 class="mt-7 font-grotesk text-3xl font-semibold">{{ services[0].title }}</h3>
              <p class="mt-4 max-w-md text-lg leading-8 text-primary/70">{{ services[0].summary }}</p>
            </div>
            <div class="mt-10">
              <p class="text-sm leading-6 text-primary/60">{{ services[0].proof }}</p>
              <p class="mt-4 border-t border-primary/10 pt-4 font-ibmMono text-[13px] text-primary/50">
                {{ services[0].stack }}
              </p>
            </div>
          </article>
          <article
            v-for="service in services.slice(1)"
            :key="service.title"
            class="reveal rounded-2xl border border-primary/10 bg-primary/[0.02] p-7 transition hover:border-info/60"
          >
            <div class="flex items-center gap-4">
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/10 text-info">
                <Icon :name="service.icon" size="22" />
              </span>
              <h3 class="font-grotesk text-xl font-semibold">{{ service.title }}</h3>
            </div>
            <p class="mt-4 leading-7 text-primary/60">{{ service.summary }}</p>
            <p class="mt-5 border-t border-primary/10 pt-4 font-ibmMono text-[13px] text-primary/50">
              {{ service.stack }}
            </p>
          </article>
        </div>
      </section>

      <!-- PROCESS : timeline -->
      <section id="Process" class="border-t border-primary/10 py-24">
        <h2 class="max-w-2xl font-grotesk text-4xl font-bold tracking-tight sm:text-5xl">
          Two weeks from first call to working demo.
        </h2>
        <p class="mt-5 max-w-xl text-lg leading-8 text-primary/60">
          A fixed process with a fixed price, built so you see it working
          before it touches your live systems.
        </p>
        <ol class="relative mt-14 space-y-12 border-l border-primary/15 pl-9 sm:pl-12">
          <li v-for="step in buildSteps" :key="step.title" class="reveal relative">
            <span
              class="absolute -left-[47px] top-0.5 grid h-6 w-6 place-items-center rounded-full border border-info/60 bg-secondary sm:-left-[59px]"
              aria-hidden="true"
            >
              <span class="h-2 w-2 rounded-full bg-info"></span>
            </span>
            <p class="font-ibmMono text-xs font-medium uppercase tracking-[0.14em] text-info">
              {{ step.badge }}
            </p>
            <h3 class="mt-2.5 font-grotesk text-2xl font-semibold">{{ step.title }}</h3>
            <p class="mt-3 max-w-2xl leading-7 text-primary/60">{{ step.text }}</p>
          </li>
        </ol>
      </section>

      <!-- WORK : editorial rows -->
      <section id="Work" class="border-t border-primary/10 py-24">
        <h2 class="max-w-2xl font-grotesk text-4xl font-bold tracking-tight sm:text-5xl">
          Recent builds, measured by what they changed.
        </h2>
        <div class="mt-10 divide-y divide-primary/10 border-y border-primary/10">
          <component
            :is="item.href ? (item.href.startsWith('http') ? 'a' : 'NuxtLink') : 'article'"
            v-for="item in caseStudies"
            :key="item.title"
            :href="item.href && item.href.startsWith('http') ? item.href : undefined"
            :to="item.href && !item.href.startsWith('http') ? item.href : undefined"
            class="group grid gap-3 py-9 sm:grid-cols-[0.8fr_1.2fr] sm:gap-10"
            :class="item.href ? 'cursor-pointer' : ''"
          >
            <p class="font-ibmMono text-sm leading-6 text-info">{{ item.result }}</p>
            <div>
              <div class="flex items-start justify-between gap-4">
                <h3
                  class="font-grotesk text-2xl font-semibold leading-snug transition"
                  :class="item.href ? 'group-hover:text-info' : ''"
                >
                  {{ item.title }}
                </h3>
                <Icon
                  v-if="item.href"
                  name="ph:arrow-up-right"
                  class="mt-1 shrink-0 text-primary/40 transition group-hover:translate-x-0.5 group-hover:text-info"
                  size="22"
                />
              </div>
              <p class="mt-3 max-w-2xl leading-7 text-primary/60">{{ item.text }}</p>
            </div>
          </component>
        </div>
        <NuxtLink
          to="/projects/"
          class="mt-8 inline-flex items-center gap-2 font-medium text-info transition hover:gap-3"
        >
          View all projects
          <Icon name="ph:arrow-right" size="18" />
        </NuxtLink>
      </section>

      <!-- PRICING -->
      <section id="Pricing" class="border-t border-primary/10 py-24">
        <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-info">Pricing</p>
        <h2 class="mt-3 max-w-2xl font-grotesk text-4xl font-bold tracking-tight sm:text-5xl">
          Three ways to work with me. All fixed price.
        </h2>
        <p class="mt-5 max-w-xl text-lg leading-8 text-primary/60">
          You know the price and the deadline before anything starts. Exact
          quote after the first call, never hourly.
        </p>
        <div class="mt-12 grid gap-4 lg:grid-cols-3">
          <article
            v-for="pkg in packages"
            :key="pkg.name"
            class="reveal relative flex flex-col rounded-2xl border p-7 transition"
            :class="pkg.popular ? 'border-info bg-info/[0.05]' : 'border-primary/10 bg-primary/[0.02] hover:border-info/60'"
          >
            <span
              v-if="pkg.popular"
              class="absolute -top-3 right-6 rounded-full bg-info px-3 py-1 text-xs font-semibold text-secondary"
            >Most popular</span>
            <h3 class="font-grotesk text-xl font-semibold">{{ pkg.name }}</h3>
            <p class="mt-3 font-grotesk text-3xl font-bold tracking-tight text-info">{{ pkg.price }}</p>
            <p class="mt-1 font-ibmMono text-[12px] uppercase tracking-[0.12em] text-primary/45">{{ pkg.duration }}</p>
            <p class="mt-4 min-h-[3.5rem] leading-7 text-primary/65">{{ pkg.tagline }}</p>
            <ul class="mt-5 grid gap-2.5">
              <li
                v-for="feature in pkg.features"
                :key="feature"
                class="flex items-start gap-3 text-sm leading-6 text-primary/65"
              >
                <Icon name="ph:check-circle" class="mt-0.5 shrink-0 text-info" size="17" />
                {{ feature }}
              </li>
            </ul>
            <div class="flex-1 pt-7" aria-hidden="true"></div>
            <a
              :href="`${calBookingUrl}?utm_source=portfolio&utm_medium=pricing&utm_campaign=book_a_call&utm_content=${pkg.book}`"
              target="_blank"
              rel="noreferrer"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition active:scale-[0.98]"
              :class="pkg.popular ? 'bg-info text-secondary hover:opacity-90' : 'border border-info text-info hover:bg-info hover:text-secondary'"
            >
              Book a call
            </a>
          </article>
        </div>

        <!-- ROI strip -->
        <div class="reveal mt-14 border-t border-primary/10 pt-10">
          <div class="grid gap-8 sm:grid-cols-3">
            <div v-for="stat in roiStats" :key="stat.value" class="flex flex-col">
              <span class="tabular font-grotesk text-3xl font-bold tracking-tight text-info sm:text-4xl">{{ stat.value }}</span>
              <span class="mt-2 max-w-[26ch] text-sm leading-6 text-primary/55">{{ stat.label }}</span>
            </div>
          </div>
          <p class="mt-8 max-w-2xl text-sm leading-6 text-primary/50">
            Typical example for a small team. On the call we'll do this math
            with your actual numbers. If the automation doesn't pay for
            itself, I'll tell you not to build it.
          </p>
        </div>
      </section>

      <!-- PRODUCTS : real footage -->
      <section id="Products" class="border-t border-primary/10 py-24">
        <h2 class="max-w-2xl font-grotesk text-4xl font-bold tracking-tight sm:text-5xl">
          Add-ons I build and sell on the SuiteCRM Store.
        </h2>
        <p class="mt-5 max-w-xl text-lg leading-8 text-primary/60">
          Not client work. My own products, live on a public marketplace and
          maintained in the open.
        </p>
        <div class="mt-12 grid gap-14">
          <article
            v-for="(product, index) in products"
            :key="product.title"
            class="reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
          >
            <div
              class="flex items-center justify-center overflow-hidden rounded-2xl border border-primary/10 bg-primary/[0.03]"
              :class="[index % 2 === 1 ? 'lg:order-2' : '', product.portrait ? 'py-6' : '']"
            >
              <video
                :width="product.width"
                :height="product.height"
                :aria-label="product.alt"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
                data-product-video
                :class="product.portrait ? 'h-[420px] w-auto rounded-xl' : 'w-full'"
              >
                <source :src="product.video" type="video/mp4" />
              </video>
            </div>
            <div :class="index % 2 === 1 ? 'lg:order-1' : ''">
              <p class="font-ibmMono text-[12px] uppercase tracking-[0.14em] text-primary/45">{{ product.label }}</p>
              <h3 class="mt-3 font-grotesk text-2xl font-semibold sm:text-3xl">{{ product.title }}</h3>
              <p class="mt-4 max-w-md text-lg leading-8 text-primary/60">{{ product.summary }}</p>
              <a
                :href="product.url"
                target="_blank"
                rel="noreferrer"
                class="mt-6 inline-flex items-center gap-2 rounded-xl border border-info px-4 py-2.5 text-sm font-medium text-info transition hover:bg-info hover:text-secondary active:scale-[0.98]"
              >
                View on the Store
                <Icon name="ph:arrow-up-right" size="16" />
              </a>
            </div>
          </article>
        </div>
      </section>

      <!-- TESTIMONIALS : asymmetric -->
      <section id="Proof" class="border-t border-primary/10 py-24">
        <h2 class="max-w-2xl font-grotesk text-4xl font-bold tracking-tight sm:text-5xl">
          What clients say.
        </h2>
        <p class="mt-5 max-w-xl text-lg leading-8 text-primary/60">
          Pulled from 35+ five-star reviews across ten countries.
        </p>
        <div class="mt-12 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <figure
            class="reveal flex flex-col justify-between rounded-2xl border border-primary/10 bg-primary/[0.02] p-8 lg:p-10"
          >
            <blockquote class="font-grotesk text-2xl font-medium leading-snug sm:text-3xl">
              &ldquo;{{ testimonials[0].quote }}&rdquo;
            </blockquote>
            <figcaption class="mt-8 flex items-center gap-3">
              <span class="grid h-10 w-10 place-items-center rounded-xl bg-info/15 font-grotesk text-sm font-semibold uppercase text-info">{{ testimonials[0].client.charAt(0) }}</span>
              <div>
                <p class="text-sm font-medium">{{ testimonials[0].client }}</p>
                <p class="text-[12.5px] text-primary/50">{{ testimonials[0].country }}, {{ testimonials[0].type }}</p>
              </div>
            </figcaption>
          </figure>
          <div class="grid gap-4">
            <figure
              v-for="review in testimonials.slice(1)"
              :key="review.client"
              class="reveal flex flex-col justify-between rounded-2xl border border-primary/10 bg-primary/[0.02] p-7"
            >
              <blockquote class="leading-7 text-primary/75">
                &ldquo;{{ review.quote }}&rdquo;
              </blockquote>
              <figcaption class="mt-5 flex items-center gap-3">
                <span class="grid h-9 w-9 place-items-center rounded-xl bg-info/15 font-grotesk text-sm font-semibold uppercase text-info">{{ review.client.charAt(0) }}</span>
                <div>
                  <p class="text-sm font-medium">{{ review.client }}</p>
                  <p class="text-[12.5px] text-primary/50">{{ review.country }}, {{ review.type }}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <!-- FAQ : all answers visible -->
      <section id="FAQ" class="border-t border-primary/10 py-24">
        <h2 class="max-w-2xl font-grotesk text-4xl font-bold tracking-tight sm:text-5xl">
          Common questions.
        </h2>
        <dl class="mt-12 grid gap-x-14 gap-y-11 lg:grid-cols-2">
          <div v-for="faq in faqs" :key="faq.q" class="reveal">
            <dt class="font-grotesk text-lg font-semibold leading-snug">{{ faq.q }}</dt>
            <dd class="mt-3 leading-7 text-primary/60">{{ faq.a }}</dd>
          </div>
        </dl>
      </section>

      <!-- CTA -->
      <section id="Contact" class="border-t border-primary/10 py-24">
        <div
          class="reveal relative overflow-hidden rounded-3xl border border-info/25 bg-[radial-gradient(80%_130%_at_15%_0%,rgba(52,211,153,0.13),transparent_60%)] p-8 sm:p-14"
        >
          <h2 class="text-balance max-w-2xl font-grotesk text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Bring me the workflow that eats your day.
          </h2>
          <p class="mt-6 max-w-xl text-lg leading-8 text-primary/65">
            Send a manual process that costs hours, a half-broken system, or
            an idea with no build yet. You'll get a straight answer on what
            to build first.
          </p>
          <div class="mt-9 flex flex-wrap items-center gap-3">
            <a
              :href="calBookingUrl"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-2 rounded-xl bg-info px-5 py-3 font-semibold text-secondary transition hover:opacity-90 active:scale-[0.98]"
            >
              Book a call
              <Icon name="ph:arrow-right" size="18" />
            </a>
            <a
              v-for="link in contactLinks"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-2 rounded-xl border border-primary/15 px-4 py-3 text-sm font-medium transition hover:border-info hover:text-info active:scale-[0.98]"
            >
              <Icon :name="link.icon" size="18" />
              {{ link.label }}
            </a>
          </div>
        </div>
      </section>
    </div>

    <SiteFooter />
  </main>
</template>
