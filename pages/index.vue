<script setup lang="ts">
import { definePageMeta } from "#imports";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { useJsonLd } from "~/composeables/useJsonLd";
import { useMetaTags } from "~/composeables/useMetaTags";

definePageMeta({});

useMetaTags();
useJsonLd();

const showFloatBtnFlg = ref(false);
const activeCaseStudy = ref(0);

const trust = [
  { value: "★★★★★", label: "5.0 average rating", stars: true },
  { value: "35+", label: "five-star reviews" },
  { value: "10", label: "countries served" },
  { value: "6+", label: "years building products" },
];

const services = [
  {
    title: "AI development",
    icon: "mdi:brain",
    summary:
      "Assistants, RAG workflows, and automations with guardrails, safety, and measurable outcomes.",
    points: [
      "AI assistants & copilots",
      "RAG & document workflows",
      "Applied, production-grade AI",
    ],
  },
  {
    title: "Web, mobile & desktop apps",
    icon: "mdi:application-brackets",
    summary:
      "Polished products across platforms — fast web and SaaS, hybrid mobile, and desktop, end to end.",
    points: [
      "Vue / Nuxt / React frontends",
      "Mobile & desktop apps",
      "Responsive, fast UI delivery",
    ],
  },
  {
    title: "Backend & automation",
    icon: "mdi:server-network",
    summary:
      "Reliable APIs, integrations, internal tools, and automation that remove repetitive manual work.",
    points: [
      "Laravel / Python / Node APIs",
      "Integrations & internal tools",
      "Workflow & process automation",
    ],
  },
];

const testimonials = [
  {
    client: "michaelh622",
    country: "Germany",
    type: "CRM & automation",
    quote:
      "Proactive, communicative, and deeply committed to the best result. A true star who will fight for your success.",
  },
  {
    client: "kininvestments",
    country: "United States",
    type: "Sales automation",
    quote:
      "Customized a full quote-to-order-to-invoice flow with change detection and hosting fixes.",
  },
  {
    client: "devin_lester",
    country: "United Kingdom",
    type: "Frontend / Full-stack",
    quote:
      "Clean code, strong problem-solving, no bugs, and work that went beyond expectations.",
  },
];

const products = [
  {
    title: "AI Dashlet Generator",
    label: "AI reporting add-on",
    url: "https://store.suitecrm.com/addons/ai-dashlet-generator",
    icon: "mdi:chart-box-plus-outline",
    summary:
      "An AI module that auto-generates dashboard widgets from natural-language prompts — replacing manual report config with one prompt.",
    highlights: ["AI-generated dashlets", "Charts from plain prompts", "Live on a public marketplace"],
  },
  {
    title: "Business Card Reader",
    label: "Lead capture add-on",
    url: "https://store.suitecrm.com/addons/business-card-reader",
    icon: "mdi:card-account-details-outline",
    summary:
      "A lead-capture tool that turns business cards into contacts instantly with OCR and QR scanning, then keeps follow-up organized.",
    highlights: ["OCR & QR scanning", "Instant contact creation", "Event follow-up flow"],
  },
];

const caseStudies = [
  {
    title: "AI lead-automation platform — WhatsApp → CRM",
    result: "0 unintended writes against a live production CRM",
    text: "Reads inbound WhatsApp chats and turns them into structured, deduplicated CRM deals. A provider-agnostic LLM engine extracts 13 fields per conversation, behind a human-in-the-loop dashboard and a fail-closed live/dry-run write gate.",
    href: "/projects/",
  },
  {
    title: "AI content pipeline — campaign data → expert-reviewed articles",
    result: "Agents + RAG running safely in production",
    text: "A full-stack AI pipeline (FastAPI, Vue 3, PostgreSQL, LangChain) that turns campaign data into expert-reviewed, SEO-optimized articles — with human approval gates, safety auditing, and per-run cost ceilings.",
    href: "/services/ai-development/",
  },
  {
    title: "Enterprise CRM platform — migration & modern UI",
    result: "From brittle container to reproducible system in 1 command",
    text: "Migrated a brittle deployment into a versioned, reproducible platform on Docker Compose — SSO, calendar sync, 6-language localization, and one-command operations.",
    href: "/blogs/suitecrm-migration-european-textile-company/",
  },
  {
    title: "Sales workflow automation — quote → order → invoice",
    result: "End-to-end sales flow automated",
    text: "Automated a US client's quote-to-invoice pipeline so the sales team converts quotes to orders to invoices without manual re-entry. Client review: 5.0.",
    href: "",
  },
];

const contactLinks = [
  {
    label: "Email",
    href: "mailto:shahab.developer.work@gmail.com?subject=Project%20Inquiry",
    icon: "mdi:email-outline",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shahabgohar/",
    icon: "mdi:linkedin",
  },
  {
    label: "Skype",
    href: "https://join.skype.com/invite/ve8oN0kKdvXQ",
    icon: "mdi:skype",
  },
];

const calBookingUrl = "https://cal.com/shahabgohar/build-discussion";

const buildSteps = [
  {
    badge: "Day 0",
    title: "Book a 30-min call",
    text: "Bring the manual process that eats your time — or the idea with no build yet. You leave with a plain-language plan of what to automate or build first.",
    points: ["No pitch, no slides — a working session", "We look at your real workflow together"],
  },
  {
    badge: "Days 1–2",
    title: "Fixed scope, fixed price",
    text: "You get a written scope with one price and one deadline. No hourly billing, no surprise invoices.",
    points: ["Clear deliverable defined up front", "You approve before anything starts"],
  },
  {
    badge: "Weeks 1–2",
    title: "Build in safe dry-run",
    text: "I build against your real data behind a dry-run gate — nothing writes to your live systems until you approve it. You watch it work before it goes live.",
    points: ["Working demo inside 14 days — or you don't pay", "Human-in-the-loop approvals for AI steps"],
  },
  {
    badge: "Go-live",
    title: "Deploy, train, hand over",
    text: "The system goes live, your team gets a walkthrough and docs, and I stay available after launch so nobody is left guessing.",
    points: ["Documentation + handover video", "Post-launch support included"],
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
      "Workflow audit & mapping session",
      "One automation built & integrated (CRM, email, WhatsApp, sheets)",
      "Dry-run safety gate before any live writes",
      "Docs + handover video",
      "30 days post-launch support",
    ],
  },
  {
    name: "Custom Build",
    book: "custom-6500",
    price: "from $6,500",
    tagline: "A full product or AI system — owned end to end by one engineer.",
    duration: "4–8 weeks",
    popular: true,
    features: [
      "Web, mobile, or desktop app — or applied AI workflow",
      "Design → build → deploy, no team to coordinate",
      "AI guardrails: human-in-the-loop, fail-closed writes",
      "Integrations with your existing stack",
      "60 days post-launch support",
    ],
  },
  {
    name: "CRM Ownership",
    book: "crm-retainer",
    price: "from $950/mo",
    tagline: "Your SuiteCRM / Mautic — kept fast, integrated, and improving.",
    duration: "monthly, cancel anytime",
    popular: false,
    features: [
      "Small fixes & tweaks handled continuously",
      "One automation improvement shipped every month",
      "Upgrades, monitoring & backups covered",
      "Priority response on breakage",
      "No lock-in — documentation stays yours",
    ],
  },
];

const roiStats = [
  { value: "2 h/day", label: "typical manual copy-paste between inbox, sheets & CRM" },
  { value: "$13,000+", label: "what that costs per year at $25/hour" },
  { value: "< 2 months", label: "typical payback on an automation sprint" },
];

const faqs = [
  {
    q: "We already have a CRM and tools — do we have to switch?",
    a: "No. I build on top of what you already run. Most projects are integrations and automations around your existing CRM, inbox, WhatsApp, and spreadsheets — not replacements. If your stack genuinely blocks you, I'll say so on the call and tell you the cheapest way out.",
  },
  {
    q: "What does 'demo in 2 weeks or you don't pay' actually mean?",
    a: "After the scoping call you get a written deliverable, one price, and a 14-day demo date. If I don't show you a working demo running against your real workflow by that date, you owe nothing. It's my risk, not yours.",
  },
  {
    q: "How much of my team's time will this take?",
    a: "About two hours total for a sprint: the 30-minute call, a short follow-up for access and questions, and a demo review. I handle the build, integration, testing, and documentation.",
  },
  {
    q: "Is AI safe to run against our live business data?",
    a: "Only if it's engineered that way — which is the point. My AI builds run behind dry-run gates and human-in-the-loop approvals, with fail-closed writes: one production system I built processed live WhatsApp leads into a CRM with zero unintended writes.",
  },
  {
    q: "What does it cost?",
    a: "Automation sprints start at $1,900, full custom builds at $6,500, and CRM ownership retainers at $950/month. Every project gets a fixed written quote before work starts — no hourly billing, no surprises.",
  },
];

const openFaq = ref<number | null>(0);

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

function handleScroll() {
  showFloatBtnFlg.value = window.scrollY > 680;
}

function setupAnimations() {
  const revealEls = gsap.utils.toArray<HTMLElement>(".reveal");
  revealEls.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
      },
    );
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
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  nextTick(setupAnimations);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
  <main class="min-h-screen bg-secondary font-inter text-primary">
    <button
      v-if="showFloatBtnFlg"
      class="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-xl border border-primary/15 bg-secondary text-primary shadow-lg transition hover:border-info hover:text-info"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <Icon name="mdi:arrow-up" size="20" />
    </button>

    <div class="mx-auto w-full max-w-[1120px] px-6 sm:px-8">
      <!-- NAV -->
      <nav
        class="flex items-center justify-between border-b border-primary/10 py-5 text-sm"
      >
        <button
          class="font-grotesk text-lg font-bold tracking-tight"
          @click="scrollToTop"
        >
          Shahab<span class="text-info">.</span>dev
        </button>
        <div class="hidden items-center gap-7 font-medium text-primary/65 md:flex">
          <button class="transition hover:text-info" @click="scrollToSection('Services')">Services</button>
          <button class="transition hover:text-info" @click="scrollToSection('Work')">Work</button>
          <button class="transition hover:text-info" @click="scrollToSection('Pricing')">Pricing</button>
          <NuxtLink to="/projects/" class="transition hover:text-info">Projects</NuxtLink>
          <button class="transition hover:text-info" @click="scrollToSection('Proof')">Proof</button>
          <NuxtLink to="/blogs/" class="transition hover:text-info">Blog</NuxtLink>
        </div>
        <div class="flex items-center gap-2">
          <a
            :href="calBookingUrl"
            target="_blank"
            rel="noreferrer"
            class="rounded-lg border border-info px-4 py-2 font-medium text-info transition hover:bg-info hover:text-secondary"
          >
            Book a call
          </a>
        </div>
      </nav>

      <!-- HERO -->
      <header class="grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
        <div>
          <span
            class="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-3.5 py-1.5 text-[13px] font-medium text-info"
          >
            <span class="h-2 w-2 rounded-full bg-info"></span>
            Solutions engineer · AI · web · mobile · backend
          </span>
          <h1
            class="mt-6 font-grotesk text-[2.7rem] font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            I automate your work — <span class="text-info">working demo in 2 weeks</span> or you don't pay.
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-8 text-primary/65">
            I'm Shahab — a solutions engineer. I build the AI workflows, CRM
            automations, and web, mobile & backend systems that stop your team
            copy-pasting between tools — shipped by one engineer, end to end.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a
              :href="calBookingUrl"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-2 rounded-xl bg-info px-5 py-3 font-semibold text-secondary transition hover:opacity-90"
            >
              Book a 30-min build call
              <Icon name="mdi:calendar-arrow-right" size="18" />
            </a>
            <button
              class="inline-flex items-center gap-2 rounded-xl border border-primary/15 px-5 py-3 font-medium transition hover:border-info hover:text-info"
              @click="scrollToSection('Work')"
            >
              See client outcomes
              <Icon name="mdi:arrow-right" size="18" />
            </button>
          </div>
          <div class="mt-10 flex flex-wrap gap-x-9 gap-y-5">
            <div v-for="t in trust" :key="t.label" class="flex flex-col">
              <span
                class="font-grotesk text-xl font-bold tracking-tight"
                :class="t.stars ? 'text-amber-400' : ''"
              >{{ t.value }}</span>
              <span class="text-[12.5px] text-primary/55">{{ t.label }}</span>
            </div>
          </div>
        </div>

        <div class="reveal">
          <div class="rounded-2xl border border-primary/10 bg-primary/[0.03] p-1.5">
            <div
              class="flex items-center justify-between border-b border-primary/10 px-4 py-3 font-ibmMono text-xs text-primary/50"
            >
              <span>solution-engineering.ts</span>
              <span class="flex items-center gap-1.5 text-info"><span class="h-1.5 w-1.5 rounded-full bg-info"></span>live</span>
            </div>
            <div class="px-4 py-4">
              <div class="grid grid-cols-[78px_1fr] gap-3 border-b border-primary/10 py-3">
                <span class="font-ibmMono text-[11px] uppercase tracking-[0.12em] text-primary/45">Problem</span>
                <p class="text-sm leading-6 text-primary/70">Manual work, a broken workflow, or an idea with no product yet.</p>
              </div>
              <div class="grid grid-cols-[78px_1fr] gap-3 border-b border-primary/10 py-3">
                <span class="font-ibmMono text-[11px] uppercase tracking-[0.12em] text-primary/45">Build</span>
                <p class="text-sm leading-6 text-primary/70">An app, automation, AI workflow, or integration — shipped by one engineer.</p>
              </div>
              <div class="grid grid-cols-[78px_1fr] gap-3 py-3">
                <span class="font-ibmMono text-[11px] uppercase tracking-[0.12em] text-primary/45">Result</span>
                <p class="text-sm leading-6 text-primary/70">A working system your team understands, trusts, and uses.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- SERVICES -->
      <section id="Services" class="border-t border-primary/10 py-20">
        <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-info">What I do</p>
        <h2 class="mt-3 max-w-2xl font-grotesk text-4xl font-bold tracking-tight">
          One engineer who can own the whole build.
        </h2>
        <p class="mt-4 max-w-xl text-lg leading-8 text-primary/60">
          AI, frontend, backend, and the integration glue in between — so you don't
          need to coordinate three people to ship one solution.
        </p>
        <div class="mt-10 grid gap-4 lg:grid-cols-3">
          <article
            v-for="(service, index) in services"
            :key="service.title"
            class="reveal rounded-2xl border border-primary/10 bg-primary/[0.02] p-6 transition hover:border-info/70"
          >
            <div class="flex items-center justify-between">
              <span class="grid h-11 w-11 place-items-center rounded-xl border border-primary/10 text-info">
                <Icon :name="service.icon" size="22" />
              </span>
              <span class="font-ibmMono text-sm text-primary/35">0{{ index + 1 }}</span>
            </div>
            <h3 class="mt-6 font-grotesk text-xl font-semibold">{{ service.title }}</h3>
            <p class="mt-3 leading-7 text-primary/60">{{ service.summary }}</p>
            <ul class="mt-5 grid gap-2.5">
              <li
                v-for="point in service.points"
                :key="point"
                class="flex items-center gap-3 text-sm text-primary/65"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-info"></span>
                {{ point }}
              </li>
            </ul>
          </article>
        </div>
      </section>

      <!-- PROCESS -->
      <section id="Process" class="border-t border-primary/10 py-20">
        <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-info">How it works</p>
        <h2 class="mt-3 max-w-2xl font-grotesk text-4xl font-bold tracking-tight">
          From "this is eating our time" to a live system in weeks.
        </h2>
        <p class="mt-4 max-w-xl text-lg leading-8 text-primary/60">
          A fixed process with a fixed price, built so you see it working before
          it touches your live systems.
        </p>
        <div class="mt-10 grid gap-4 md:grid-cols-2">
          <article
            v-for="(step, index) in buildSteps"
            :key="step.title"
            class="reveal rounded-2xl border border-primary/10 bg-primary/[0.02] p-6 transition hover:border-info/70"
          >
            <div class="flex items-center justify-between">
              <span class="rounded-full bg-info px-3.5 py-1 font-ibmMono text-xs font-medium text-secondary">{{ step.badge }}</span>
              <span class="font-ibmMono text-sm text-primary/35">0{{ index + 1 }}</span>
            </div>
            <h3 class="mt-5 font-grotesk text-xl font-semibold">{{ step.title }}</h3>
            <p class="mt-3 leading-7 text-primary/60">{{ step.text }}</p>
            <ul class="mt-4 grid gap-2.5">
              <li
                v-for="point in step.points"
                :key="point"
                class="flex items-center gap-3 text-sm text-primary/65"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-info"></span>
                {{ point }}
              </li>
            </ul>
          </article>
        </div>
      </section>

      <!-- WORK -->
      <section id="Work" class="border-t border-primary/10 py-20">
        <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div class="lg:sticky lg:top-20 lg:self-start">
            <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-info">Selected outcomes</p>
            <h2 class="mt-3 font-grotesk text-4xl font-bold tracking-tight">
              Built for clients who need momentum.
            </h2>
            <p class="mt-4 max-w-md text-lg leading-8 text-primary/60">
              I frame work around business movement: faster delivery, less manual
              work, and products that are easy to trust.
            </p>
          </div>
          <div class="grid gap-4">
            <component
              :is="item.href ? (item.href.startsWith('http') ? 'a' : 'NuxtLink') : 'article'"
              v-for="(item, index) in caseStudies"
              :key="item.title"
              :href="item.href && item.href.startsWith('http') ? item.href : undefined"
              :to="item.href && !item.href.startsWith('http') ? item.href : undefined"
              :target="item.href && item.href.startsWith('http') ? '_blank' : undefined"
              :rel="item.href && item.href.startsWith('http') ? 'noreferrer' : undefined"
              class="reveal block rounded-2xl border border-primary/10 bg-primary/[0.02] p-6 transition hover:border-info"
              :class="[activeCaseStudy === index ? 'border-info' : '', item.href ? 'cursor-pointer' : '']"
              @mouseenter="activeCaseStudy = index"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="font-ibmMono text-[11px] uppercase tracking-[0.12em] text-primary/45">{{ item.result }}</p>
                  <h3 class="mt-2 font-grotesk text-xl font-semibold leading-snug">{{ item.title }}</h3>
                </div>
                <Icon v-if="item.href" name="mdi:arrow-top-right" class="shrink-0 text-info" size="22" />
              </div>
              <p class="mt-3 max-w-2xl leading-7 text-primary/60">{{ item.text }}</p>
            </component>
            <NuxtLink
              to="/projects/"
              class="inline-flex items-center gap-2 self-start font-medium text-info transition hover:gap-3"
            >
              View all projects
              <Icon name="mdi:arrow-right" size="18" />
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- PRICING -->
      <section id="Pricing" class="border-t border-primary/10 py-20">
        <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-info">Pricing</p>
        <h2 class="mt-3 max-w-2xl font-grotesk text-4xl font-bold tracking-tight">
          Three ways to work with me. All fixed-price.
        </h2>
        <p class="mt-4 max-w-xl text-lg leading-8 text-primary/60">
          You know the price and the deadline before anything starts. Exact quote
          after the first call — never hourly.
        </p>
        <div class="mt-10 grid gap-4 lg:grid-cols-3">
          <article
            v-for="pkg in packages"
            :key="pkg.name"
            class="reveal relative rounded-2xl border p-6 transition"
            :class="pkg.popular ? 'border-info bg-info/[0.05]' : 'border-primary/10 bg-primary/[0.02] hover:border-info/70'"
          >
            <span
              v-if="pkg.popular"
              class="absolute -top-3 right-6 rounded-full bg-info px-3 py-1 text-xs font-semibold text-secondary"
            >Most popular</span>
            <h3 class="font-grotesk text-xl font-semibold">{{ pkg.name }}</h3>
            <p class="mt-3 font-grotesk text-3xl font-bold tracking-tight text-info">{{ pkg.price }}</p>
            <p class="mt-1 font-ibmMono text-[12px] uppercase tracking-[0.12em] text-primary/45">{{ pkg.duration }}</p>
            <p class="mt-4 leading-7 text-primary/65">{{ pkg.tagline }}</p>
            <ul class="mt-5 grid gap-2.5">
              <li
                v-for="feature in pkg.features"
                :key="feature"
                class="flex items-start gap-3 text-sm leading-6 text-primary/65"
              >
                <Icon name="mdi:check-circle-outline" class="mt-0.5 shrink-0 text-info" size="17" />
                {{ feature }}
              </li>
            </ul>
            <a
              :href="`${calBookingUrl}?utm_source=portfolio&utm_medium=pricing&utm_campaign=book_a_call&utm_content=${pkg.book}`"
              target="_blank"
              rel="noreferrer"
              class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition"
              :class="pkg.popular ? 'bg-info text-secondary hover:opacity-90' : 'border border-info text-info hover:bg-info hover:text-secondary'"
            >
              Book a call
              <Icon name="mdi:calendar-arrow-right" size="16" />
            </a>
          </article>
        </div>

        <!-- ROI -->
        <div class="reveal mt-6 rounded-2xl border border-primary/10 bg-primary/[0.02] p-6 sm:p-8">
          <div class="grid gap-8 sm:grid-cols-3">
            <div v-for="stat in roiStats" :key="stat.value" class="flex flex-col">
              <span class="font-grotesk text-3xl font-bold tracking-tight text-info">{{ stat.value }}</span>
              <span class="mt-2 text-sm leading-6 text-primary/55">{{ stat.label }}</span>
            </div>
          </div>
          <p class="mt-6 border-t border-primary/10 pt-5 text-sm leading-6 text-primary/50">
            Typical example for a small team. On the call we'll do this math with
            your actual numbers — if the automation doesn't pay for itself, I'll
            tell you not to build it.
          </p>
        </div>
      </section>

      <!-- PRODUCTS -->
      <section id="Products" class="border-t border-primary/10 py-20">
        <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-info">Products I've shipped</p>
        <h2 class="mt-3 max-w-2xl font-grotesk text-4xl font-bold tracking-tight">
          I don't just take briefs — I ship my own products too.
        </h2>
        <div class="mt-10 grid gap-4 lg:grid-cols-2">
          <article
            v-for="product in products"
            :key="product.title"
            class="reveal rounded-2xl border border-primary/10 bg-primary/[0.02] p-6 transition hover:border-info/70"
          >
            <div class="flex items-start justify-between gap-6">
              <div>
                <p class="font-ibmMono text-[11px] uppercase tracking-[0.14em] text-primary/45">{{ product.label }}</p>
                <h3 class="mt-2 font-grotesk text-2xl font-semibold">{{ product.title }}</h3>
              </div>
              <Icon :name="product.icon" class="text-info" size="30" />
            </div>
            <p class="mt-4 leading-7 text-primary/60">{{ product.summary }}</p>
            <div class="mt-5 grid gap-2.5">
              <div
                v-for="highlight in product.highlights"
                :key="highlight"
                class="flex items-center gap-3 text-sm text-primary/65"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-info"></span>
                {{ highlight }}
              </div>
            </div>
            <div class="mt-6 flex flex-wrap gap-3">
              <a
                :href="product.url"
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center gap-2 rounded-xl border border-info px-4 py-2.5 text-sm font-medium text-info transition hover:bg-info hover:text-secondary"
              >
                View it live
                <Icon name="mdi:arrow-top-right" size="16" />
              </a>
            </div>
          </article>
        </div>
      </section>

      <!-- PROOF -->
      <section id="Proof" class="border-t border-primary/10 py-20">
        <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-info">Client proof</p>
        <h2 class="mt-3 font-grotesk text-4xl font-bold tracking-tight">Clients already trust the work.</h2>
        <div class="mt-10 grid gap-4 lg:grid-cols-3">
          <article
            v-for="review in testimonials"
            :key="review.client"
            class="reveal rounded-2xl border border-primary/10 bg-primary/[0.02] p-6 transition hover:border-info/70"
          >
            <Icon name="mdi:format-quote-open" class="text-info/70" size="26" />
            <p class="mt-2 leading-7 text-primary/75">{{ review.quote }}</p>
            <div class="mt-5 flex items-center gap-3">
              <span class="grid h-9 w-9 place-items-center rounded-full bg-info/15 font-grotesk text-sm font-semibold uppercase text-info">{{ review.client.charAt(0) }}</span>
              <div>
                <p class="text-sm font-medium">{{ review.client }}</p>
                <p class="text-[12.5px] text-primary/50">{{ review.country }} · {{ review.type }}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- FAQ -->
      <section id="FAQ" class="border-t border-primary/10 py-20">
        <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-info">Questions</p>
        <h2 class="mt-3 max-w-2xl font-grotesk text-4xl font-bold tracking-tight">
          The things you're probably wondering.
        </h2>
        <div class="mt-10 grid gap-3">
          <article
            v-for="(faq, index) in faqs"
            :key="faq.q"
            class="reveal rounded-2xl border border-primary/10 bg-primary/[0.02] transition hover:border-info/50"
          >
            <button
              class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              :aria-expanded="openFaq === index"
              @click="openFaq = openFaq === index ? null : index"
            >
              <span class="font-grotesk text-lg font-semibold leading-snug">{{ faq.q }}</span>
              <Icon
                :name="openFaq === index ? 'mdi:minus' : 'mdi:plus'"
                class="shrink-0 text-info"
                size="22"
              />
            </button>
            <p
              v-show="openFaq === index"
              class="px-6 pb-6 leading-7 text-primary/65"
            >
              {{ faq.a }}
            </p>
          </article>
        </div>
      </section>

      <!-- CONTACT -->
      <section id="Contact" class="py-20 border-t border-primary/10">
        <div class="reveal rounded-3xl border border-info/40 bg-info/[0.06] p-8 sm:p-12">
          <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-info">Available for serious builds</p>
          <div class="mt-4 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <h2 class="font-grotesk text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Working demo in two weeks. Or you don't pay.
              </h2>
              <p class="mt-5 max-w-xl text-lg leading-8 text-primary/65">
                Send the problem — a manual process eating your time, a product idea
                with no build yet, or a system that needs fixing. I'll tell you what
                to fix, automate, or build first.
              </p>
            </div>
            <div class="flex flex-wrap gap-3 lg:justify-end">
              <a
                v-for="link in contactLinks"
                :key="link.label"
                :href="link.href"
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-secondary px-4 py-3 text-sm font-medium transition hover:border-info hover:text-info"
              >
                <Icon :name="link.icon" size="18" />
                {{ link.label }}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
