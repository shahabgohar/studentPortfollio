<script setup lang="ts">
import { definePageMeta } from "#imports";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  type Ref,
} from "vue";
import ClientGlobe from "~/components/ClientGlobe.vue";
import MatrixRain from "~/components/MatrixRain.vue";
import { useJsonLd } from "~/composeables/useJsonLd";
import { useMetaTags } from "~/composeables/useMetaTags";
import { INJECT_THEME_KEY, Theme } from "~/types";

definePageMeta({
  title: "Portfolio",
});

useMetaTags();
useJsonLd();

const theme = inject<Ref<Theme>>(INJECT_THEME_KEY);
const showFloatBtnFlg = ref(false);
const activeService = ref(0);
const activeCaseStudy = ref(0);
const heroRef = ref<HTMLElement | null>(null);
const cursorRef = ref<HTMLElement | null>(null);

const isLightTheme = computed(() => theme?.value === Theme.LIGHT);

const metrics = [
  { value: "35+", label: "freelance client reviews" },
  { value: "5.0", label: "average rating" },
  { value: "SuiteCRM", label: "plugins, CRM flows, and integrations" },
  { value: "AI", label: "automation and applied AI systems" },
  { value: "Remote", label: "trusted by global clients" },
];

const reviewStats = [
  {
    value: "35+",
    label: "client reviews collected from Freelance Platforms and direct work",
  },
  { value: "10", label: "countries represented across freelance clients" },
  { value: "5.0", label: "public work rating across 34 reviews" },
  {
    value: "15+",
    label: "reviews with delivery speed or communication praise",
  },
];

const clientCountries = [
  "United States",
  "United Kingdom",
  "Germany",
  "Canada",
  "Spain",
  "Nigeria",
  "Belgium",
  "Malta",
];

const proofCategories = [
  {
    title: "Clean code",
    text: "Clients repeatedly mention clean structure, readable implementation, and bug-free delivery.",
    icon: "mdi:code-braces",
  },
  {
    title: "Fast delivery",
    text: "Multiple reviews highlight quick turnaround, responsive communication, and work completed ahead of expectations.",
    icon: "mdi:flash-outline",
  },
  {
    title: "Business workflows",
    text: "Custom quote-to-order-to-invoice flows, SuiteCRM fixes, internal tools, and automation-focused delivery.",
    icon: "mdi:source-branch-sync",
  },
  {
    title: "Repeat clients",
    text: "Several buyers returned for additional frontend, full-stack, and cross-platform development work.",
    icon: "mdi:account-heart-outline",
  },
];

const testimonials = [
  {
    client: "michaelh622",
    country: "Germany",
    type: "SuiteCRM",
    quote:
      "proactive, communicative, and deeply committed to achieving the best possible result. If you want a true star who will genuinely fight for your success, here you are.",
  },
  {
    client: "kininvestments",
    country: "United States",
    type: "SuiteCRM automation",
    quote:
      "Customized quote-to-order-to-invoice flow with product line item change detection and hosting fixes.",
  },
  {
    client: "devin_lester",
    country: "United Kingdom",
    type: "Frontend / Full-stack",
    quote:
      "Clean code, strong problem-solving, no bugs, and work that went beyond expectations.",
  },
  {
    client: "mattjohnsen",
    country: "United States",
    type: "Vue / JavaScript",
    quote:
      "Clear communication, solid Vue and JavaScript skills, fast delivery, and clean commented code.",
  },
  {
    client: "user90513046",
    country: "Canada",
    type: "Responsive web app",
    quote:
      "Knowledgeable, efficient, easy to work with, and delivered clean responsive code.",
  },
  {
    client: "weissclick",
    country: "Germany",
    type: "Cross-platform development",
    quote: "Fast developer with good code structure and repeat-order quality.",
  },
];

const services = [
  {
    title: "AI Product Engineering",
    icon: "mdi:brain",
    accent: "#22c55e",
    summary:
      "Turn AI ideas into useful product workflows with clean UX, backend logic, guardrails, and measurable outcomes.",
    points: [
      "AI assistants and copilots",
      "RAG and document workflows",
      "Prompt systems and automation",
    ],
  },
  {
    title: "Full-Stack Web Apps",
    icon: "mdi:application-brackets",
    accent: "#38bdf8",
    summary:
      "Build polished interfaces and reliable APIs for SaaS, dashboards, portals, and business operations.",
    points: [
      "Nuxt and Vue frontends",
      "Laravel and API systems",
      "Responsive, fast UI delivery",
    ],
  },
  {
    title: "Business Automation",
    icon: "mdi:robot-outline",
    accent: "#f59e0b",
    summary:
      "Remove repetitive manual work by connecting data, tools, and workflows into dependable automated systems.",
    points: [
      "Internal tools",
      "Workflow integrations",
      "Reporting and process cleanup",
    ],
  },
];

const suiteCrmProducts = [
  {
    title: "AI Dashlet Generator",
    label: "SuiteCRM AI reporting add-on",
    url: "https://store.suitecrm.com/addons/ai-dashlet-generator",
    icon: "mdi:chart-box-plus-outline",
    summary:
      "An AI-powered SuiteCRM module that helps teams auto-generate useful dashboard dashlets, visualize CRM data, and move faster without wrestling with complex reports.",
    highlights: [
      "AI-generated dashlets",
      "Charts for CRM modules",
      "Goals, filters, and dashboard insights",
    ],
    screenshot: "/img/products/ai-dashlet-generator.gif",
  },
  {
    title: "Business Card Reader",
    label: "SuiteCRM lead capture add-on",
    url: "https://store.suitecrm.com/addons/business-card-reader",
    icon: "mdi:card-account-details-outline",
    summary:
      "A SuiteCRM plugin for instantly capturing business card data, creating contacts or leads, storing card images, and keeping event/conference follow-up organized.",
    highlights: [
      "OCR and QR scanning",
      "Lead/contact creation",
      "Campaign-aware import flow",
    ],
    screenshot: "/img/products/business-card-reader.gif",
  },
];

const caseStudies = [
  {
    title: "European textile manufacturer — SuiteCRM 8 migration",
    result: "From brittle container to reproducible CRM in 1 command",
    text: "Migrated a pre-built SuiteCRM container into a versioned SuiteCRM 8.10.1 deployment on Docker Compose. Added Google SSO, auto-provisioned calendar sync, 6-language localization, and Makefile-driven operations. Full case study on the blog.",
    href: "/blogs/suitecrm-migration-european-textile-company",
  },
  {
    title: "US SuiteCRM automation — quote → order → invoice",
    result: "End-to-end sales flow automated inside SuiteCRM",
    text: "Customized the SuiteCRM quote-to-invoice pipeline for a US client (kininvestments) so the sales team converts quotes to orders to invoices without leaving the CRM. Client review on Fiverr: 5.0.",
    href: "",
  },
  {
    title: "AI Dashlet Generator — productized SuiteCRM add-on",
    result: "Live on the SuiteCRM Store",
    text: "Designed, built, and shipped an AI-powered dashlet generator that auto-creates dashboard widgets from natural-language prompts — replacing manual report configuration with a one-prompt workflow.",
    href: "https://store.suitecrm.com/addons/ai-dashlet-generator",
  },
  {
    title: "US SuiteCRM partner — Mautic → SuiteCRM lead sync",
    result: "Marketing leads land in sales' inbox the moment they convert",
    text: "Built an automated sync that pushes new leads and contacts from Mautic (forms, campaigns, landing pages) directly into SuiteCRM the moment they're captured. The partner now resells a white-labelled CRM with native Mautic integration to their downstream customers — no manual list imports, no missed follow-ups.",
    href: "",
  },
  {
    title: "Mitchelli — legacy JS rewritten as SuiteCRM 8 field actions",
    result: "Custom business logic preserved through the Angular upgrade",
    text: "Took the client's existing custom JavaScript logic from the SuiteCRM 7 legacy view and re-implemented it natively as SuiteCRM 8 field actions on the Angular UI — preserving every business rule without losing the upgrade benefits.",
    href: "",
  },
  {
    title: "Journey CRM — fully white-labelled SuiteCRM product",
    result: "A sellable, branded CRM product built on SuiteCRM",
    text: "Heavy frontend customization of SuiteCRM 8 — Angular modern UI, legacy views, detail and edit screens — to deliver a completely re-themed CRM the client now sells under their own brand as a finished product.",
    href: "",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Clarify the business outcome",
    text: "We define what should improve: revenue speed, support load, delivery time, lead quality, or operational cost.",
  },
  {
    step: "02",
    title: "Prototype the highest-value workflow",
    text: "I build the smallest useful version with real data paths, UI states, and enough polish to test with users.",
  },
  {
    step: "03",
    title: "Harden for real usage",
    text: "We add edge-case handling, analytics, guardrails, performance work, and production-ready integration.",
  },
];

const techStack = [
  "Vue",
  "Nuxt",
  "React",
  "Tailwind",
  "Laravel",
  "Python",
  "TypeScript",
  "SQL",
  "GSAP",
  "AI",
  "SuiteCRM",
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

const experiences = [
  {
    period: "Jul 2024 - Present",
    company: "Esper Solutions",
    role: "Software Engineer",
    summary:
      "Building GenAI products and customizing SuiteCRM and Mautic around client needs.",
  },
  {
    period: "May 2023 - Feb 2024",
    company: "CTO GmbH",
    role: "Freelance Frontend Developer",
    summary:
      "Delivered Nuxt, Tailwind, TypeScript, and Ionic work across web and hybrid mobile products.",
  },
  {
    period: "2020 - Present",
    company: "Freelance",
    role: "Full-Stack Web Developer",
    summary:
      "Helping founders and small businesses ship Vue, Laravel, and mobile-friendly product experiences.",
  },
  {
    period: "2021 - 2023",
    company: "Motocle, Inc Japan",
    role: "Full-Stack Web Developer",
    summary: "Fullstack Developer developing projects from the ground up.",
  },
];

function toggleTheme() {
  if (!theme) return;
  theme.value = theme.value === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
}

function scrollToSection(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const calBookingUrl = "https://cal.com/shahabgohar/build-discussion";

function handleScroll() {
  showFloatBtnFlg.value = window.scrollY > 680;
}

function handleHeroPointer(event: MouseEvent) {
  const hero = heroRef.value;
  const cursor = cursorRef.value;
  if (!hero || !cursor) return;

  const rect = hero.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  cursor.style.transform = `translate3d(${x - 120}px, ${y - 120}px, 0)`;
}

function setupAnimations() {
  const revealEls = gsap.utils.toArray<HTMLElement>(".portfolio-reveal");
  revealEls.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 84%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  const heroTimeline = gsap.timeline({
    defaults: { ease: "power3.out" },
  });
  heroTimeline
    .from(".hero-kicker", {
      opacity: 0,
      y: 18,
      duration: 0.45,
      clearProps: "opacity,y,transform",
    })
    .from(
      ".hero-title-line",
      {
        opacity: 0,
        y: 46,
        duration: 0.72,
        stagger: 0.08,
        clearProps: "opacity,y,transform",
      },
      "-=0.15",
    )
    .from(
      ".hero-copy",
      { opacity: 0, y: 22, duration: 0.55, clearProps: "opacity,y,transform" },
      "-=0.25",
    )
    .from(
      ".hero-action",
      {
        opacity: 0,
        y: 18,
        duration: 0.45,
        stagger: 0.08,
        clearProps: "opacity,y,transform",
      },
      "-=0.2",
    )
    .from(
      ".hero-proof",
      {
        opacity: 0,
        y: 24,
        duration: 0.45,
        stagger: 0.06,
        clearProps: "opacity,y,transform",
      },
      "-=0.15",
    );
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
  <main class="min-h-screen bg-secondary text-primary">
    <button
      v-if="showFloatBtnFlg"
      class="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center border border-primary/20 bg-secondary text-primary shadow-lg transition hover:border-info hover:text-info"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <Icon name="mdi:arrow-up" size="22" />
    </button>

    <section
      ref="heroRef"
      class="relative min-h-screen overflow-hidden px-5 sm:px-8 lg:px-14"
      @mousemove="handleHeroPointer"
    >
      <MatrixRain />
      <div
        ref="cursorRef"
        class="pointer-events-none absolute left-0 top-0 hidden h-60 w-60 border border-info/20 bg-info/10 blur-2xl lg:block"
      ></div>

      <div
        class="relative z-10 mx-auto flex min-h-screen w-full max-w-[1280px] flex-col"
      >
        <nav
          class="flex items-center justify-between border-b border-primary/10 py-5 font-ibmMono text-sm"
        >
          <button
            class="text-left font-bold uppercase tracking-[0.18em]"
            @click="scrollToTop"
          >
            Shahab Gohar
          </button>
          <div class="hidden items-center gap-6 text-primary/70 md:flex">
            <button
              class="transition hover:text-info"
              @click="scrollToSection('Services')"
            >
              Services
            </button>
            <button
              class="transition hover:text-info"
              @click="scrollToSection('Proof')"
            >
              Proof
            </button>
            <button
              class="transition hover:text-info"
              @click="scrollToSection('Products')"
            >
              Products
            </button>
            <button
              class="transition hover:text-info"
              @click="scrollToSection('Work')"
            >
              Work
            </button>
            <button
              class="transition hover:text-info"
              @click="scrollToSection('Process')"
            >
              Process
            </button>
            <NuxtLink to="/blogs" class="transition hover:text-info"
              >Blog</NuxtLink
            >
          </div>
          <div class="flex items-center gap-2">
            <button
              class="grid h-10 w-10 place-items-center border border-primary/15 transition hover:border-info hover:text-info"
              :aria-label="
                isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'
              "
              @click="toggleTheme"
            >
              <Icon
                :name="
                  isLightTheme ? 'mdi:weather-night' : 'mdi:white-balance-sunny'
                "
                size="20"
              />
            </button>
            <a
              href="mailto:shahab.developer.work@gmail.com?subject=Project%20Inquiry"
              class="hidden border border-info px-4 py-2 text-info transition hover:bg-info hover:text-secondary sm:inline-flex"
            >
              Hire me
            </a>
          </div>
        </nav>

        <div
          class="grid flex-1 gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20"
        >
          <div>
            <p
              class="hero-kicker font-ibmMono text-sm uppercase tracking-[0.24em] text-info"
            >
              SuiteCRM expert / AI automation / applied AI engineer
            </p>
            <h1
              class="mt-5 max-w-5xl font-oswald text-5xl font-black uppercase leading-none sm:text-7xl lg:text-8xl"
            >
              <span class="hero-title-line block">I build </span>
              <span class="hero-title-line block text-info">AI-powered </span>
              <span class="hero-title-line block">CRM systems.</span>
            </h1>
            <p
              class="hero-copy mt-7 max-w-2xl text-lg leading-8 text-primary/72 sm:text-xl"
            >
              I build custom SuiteCRM modules, integrations, and AI workflows
              for B2B teams that want Salesforce-grade results without the
              Salesforce bill.
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <a
                :href="calBookingUrl"
                target="_blank"
                rel="noreferrer"
                class="hero-action inline-flex items-center gap-2 bg-info px-5 py-3 font-ibmMono text-sm font-bold text-secondary transition hover:opacity-90"
              >
                Book a 20-min build call
                <Icon name="mdi:calendar-arrow-right" size="18" />
              </a>
              <a
                href="mailto:shahab.developer.work@gmail.com?subject=Project%20Inquiry"
                class="hero-action inline-flex items-center gap-2 border border-primary/15 px-5 py-3 font-ibmMono text-sm transition hover:border-info hover:text-info"
              >
                Or email me
                <Icon name="mdi:email-outline" size="18" />
              </a>
              <button
                class="hero-action inline-flex items-center gap-2 border border-primary/15 px-5 py-3 font-ibmMono text-sm transition hover:border-info hover:text-info"
                @click="scrollToSection('Work')"
              >
                See outcomes
                <Icon name="mdi:chart-line" size="18" />
              </button>
            </div>

            <div class="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div
                v-for="metric in metrics"
                :key="metric.value"
                class="hero-proof border border-primary/10 bg-secondary/70 p-4 backdrop-blur"
              >
                <p class="font-oswald text-3xl font-black text-info">
                  {{ metric.value }}
                </p>
                <p class="mt-1 text-sm leading-5 text-primary/65">
                  {{ metric.label }}
                </p>
              </div>
            </div>
          </div>

          <div class="portfolio-reveal relative">
            <div
              class="border border-primary/10 bg-secondary/80 p-4 shadow-2xl backdrop-blur"
            >
              <div
                class="flex items-center justify-between border-b border-primary/10 pb-3 font-ibmMono text-xs text-primary/55"
              >
                <span>crm-ai-readiness.ts</span>
                <span class="text-[#22c55e]">live</span>
              </div>
              <div class="grid gap-4 py-5">
                <div class="grid grid-cols-[90px_1fr] gap-4">
                  <span
                    class="font-ibmMono text-xs uppercase tracking-[0.16em] text-primary/45"
                    >Problem</span
                  >
                  <p class="text-sm leading-6 text-primary/74">
                    A business has CRM data, manual follow-ups, reporting gaps,
                    or sales workflows that cost time.
                  </p>
                </div>
                <div class="grid grid-cols-[90px_1fr] gap-4">
                  <span
                    class="font-ibmMono text-xs uppercase tracking-[0.16em] text-primary/45"
                    >Build</span
                  >
                  <p class="text-sm leading-6 text-primary/74">
                    SuiteCRM customization, Nuxt UI, Laravel/Python backend, AI
                    workflow, automation, and consent-aware analytics.
                  </p>
                </div>
                <div class="grid grid-cols-[90px_1fr] gap-4">
                  <span
                    class="font-ibmMono text-xs uppercase tracking-[0.16em] text-primary/45"
                    >Result</span
                  >
                  <p class="text-sm leading-6 text-primary/74">
                    A CRM or AI-enabled product clients can understand, trust,
                    and use without technical friction.
                  </p>
                </div>
              </div>
              <div
                class="grid grid-cols-3 gap-3 border-t border-primary/10 pt-4"
              >
                <div class="bg-[#22c55e]/10 p-3">
                  <p class="font-oswald text-2xl font-black text-[#22c55e]">
                    CRM
                  </p>
                  <p class="text-xs text-primary/55">SuiteCRM flows</p>
                </div>
                <div class="bg-[#38bdf8]/10 p-3">
                  <p class="font-oswald text-2xl font-black text-[#38bdf8]">
                    AUTO
                  </p>
                  <p class="text-xs text-primary/55">less manual work</p>
                </div>
                <div class="bg-[#f59e0b]/10 p-3">
                  <p class="font-oswald text-2xl font-black text-[#f59e0b]">
                    AI
                  </p>
                  <p class="text-xs text-primary/55">applied systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="Proof" class="border-y border-primary/10 bg-primary/[0.025]">
      <div class="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 lg:px-14">
        <div
          class="portfolio-reveal grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
        >
          <div>
            <p
              class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info"
            >
              Client proof
            </p>
            <h2
              class="mt-4 font-oswald text-5xl font-black uppercase leading-none sm:text-6xl"
            >
              Freelance clients already trusted the work.
            </h2>
          </div>
          <p class="text-lg leading-8 text-primary/70">
            Before a client hires, they want to know three things: Can you
            communicate clearly, deliver fast, and write code that survives real
            use? The reviews answer that directly.
          </p>
        </div>

        <div class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="stat in reviewStats"
            :key="stat.value + stat.label"
            class="portfolio-reveal border border-primary/10 bg-secondary p-5"
          >
            <p class="font-oswald text-4xl font-black text-info">
              {{ stat.value }}
            </p>
            <p class="mt-2 text-sm leading-6 text-primary/65">
              {{ stat.label }}
            </p>
          </div>
        </div>

        <div class="mt-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div
            class="portfolio-reveal overflow-hidden border border-primary/10 bg-secondary p-5"
          >
            <div class="flex items-center justify-between gap-4">
              <div>
                <p
                  class="font-ibmMono text-xs uppercase tracking-[0.2em] text-primary/45"
                >
                  Global clients
                </p>
                <p class="mt-2 text-sm leading-6 text-primary/65">
                  Freelance work across North America, Europe, Africa, and
                  Malta.
                </p>
              </div>
              <Icon name="mdi:earth" class="text-info" size="28" />
            </div>

            <ClientGlobe class="mt-6" />

            <div class="mt-8 flex flex-wrap gap-2">
              <span
                v-for="country in clientCountries"
                :key="country"
                class="border border-primary/10 px-3 py-2 text-xs text-primary/70"
              >
                {{ country }}
              </span>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <article
              v-for="category in proofCategories"
              :key="category.title"
              class="portfolio-reveal border border-primary/10 bg-secondary p-5"
            >
              <Icon :name="category.icon" class="text-info" size="28" />
              <h3 class="mt-4 text-xl font-bold">{{ category.title }}</h3>
              <p class="mt-3 text-sm leading-6 text-primary/65">
                {{ category.text }}
              </p>
            </article>
          </div>
        </div>

        <div class="mt-8 grid gap-4 lg:grid-cols-3">
          <article
            v-for="review in testimonials"
            :key="review.client + review.type"
            class="portfolio-reveal group border border-primary/10 bg-secondary p-5 transition hover:-translate-y-1 hover:border-info/70 hover:bg-info/5"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-xl font-bold">{{ review.client }}</h3>
                <p
                  class="mt-1 font-ibmMono text-xs uppercase tracking-[0.16em] text-primary/45"
                >
                  {{ review.country }}
                </p>
              </div>
              <span
                class="border border-info/40 px-2 py-1 font-ibmMono text-xs text-info"
                >5-star</span
              >
            </div>
            <p class="mt-4 text-sm font-semibold text-info">
              {{ review.type }}
            </p>
            <p class="mt-3 leading-7 text-primary/70">"{{ review.quote }}"</p>
          </article>
        </div>
      </div>
    </section>

    <section
      id="Products"
      class="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 lg:px-14"
    >
      <div
        class="portfolio-reveal grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
      >
        <div>
          <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">
            SuiteCRM products
          </p>
          <h2
            class="mt-4 font-oswald text-5xl font-black uppercase leading-none sm:text-6xl"
          >
            I also build published CRM plugins.
          </h2>
        </div>
        <div class="border-l-2 border-info pl-5">
          <p class="text-lg leading-8 text-primary/72">
            If you use SuiteCRM, I can help you get these modules installed,
            customized, and supported. Ask me directly for a discounted lifetime
            access rate before purchasing.
          </p>
        </div>
      </div>

      <div class="mt-10 grid gap-5 lg:grid-cols-2">
        <article
          v-for="product in suiteCrmProducts"
          :key="product.title"
          class="portfolio-reveal group border border-primary/10 bg-primary/[0.03] p-6 transition hover:-translate-y-1 hover:border-info/70 hover:bg-info/5"
        >
          <div class="flex items-start justify-between gap-6">
            <div>
              <p
                class="font-ibmMono text-xs uppercase tracking-[0.18em] text-primary/45"
              >
                {{ product.label }}
              </p>
              <h3 class="mt-3 text-3xl font-bold leading-tight">
                {{ product.title }}
              </h3>
            </div>
            <Icon :name="product.icon" class="text-info" size="36" />
          </div>

          <p class="mt-5 leading-7 text-primary/70">{{ product.summary }}</p>

          <img
            v-if="product.screenshot"
            :src="product.screenshot"
            :alt="`${product.title} demo`"
            loading="lazy"
            class="mt-6 mx-auto block max-h-[520px] w-full object-contain border border-primary/10 bg-secondary"
          />

          <div class="mt-6 grid gap-3">
            <div
              v-for="highlight in product.highlights"
              :key="highlight"
              class="flex items-center gap-3 text-sm text-primary/70"
            >
              <span class="h-2 w-2 bg-info"></span>
              {{ highlight }}
            </div>
          </div>

          <div class="mt-7 flex flex-wrap gap-3">
            <a
              :href="product.url"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-2 border border-info px-4 py-3 font-ibmMono text-sm text-info transition hover:bg-info hover:text-secondary"
            >
              View on SuiteCRM Store
              <Icon name="mdi:arrow-top-right" size="18" />
            </a>
            <a
              href="mailto:shahab.developer.work@gmail.com?subject=SuiteCRM%20plugin%20lifetime%20discount"
              class="inline-flex items-center gap-2 bg-info px-4 py-3 font-ibmMono text-sm font-bold text-secondary transition hover:opacity-90"
            >
              Ask for lifetime discount
              <Icon name="mdi:tag-outline" size="18" />
            </a>
          </div>
        </article>
      </div>
    </section>

    <section
      id="Services"
      class="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 lg:px-14"
    >
      <div class="portfolio-reveal max-w-3xl">
        <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">
          What I can build
        </p>
        <h2
          class="mt-4 font-oswald text-5xl font-black uppercase leading-none sm:text-6xl"
        >
          Services that move the business.
        </h2>
        <p class="mt-5 text-lg leading-8 text-primary/70">
          The portfolio is not just visual polish. It is proof that I can think
          through the product, ship the interface, connect the backend, and make
          the technical work legible to clients.
        </p>
      </div>

      <div class="mt-10 grid gap-5 lg:grid-cols-3">
        <article
          v-for="(service, index) in services"
          :key="service.title"
          class="portfolio-reveal group border border-primary/10 bg-primary/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-info/70"
          :style="{ '--accent': service.accent }"
          @mouseenter="activeService = index"
        >
          <div class="flex items-start justify-between gap-6">
            <Icon :name="service.icon" class="text-[var(--accent)]" size="34" />
            <span class="font-ibmMono text-sm text-primary/40"
              >0{{ index + 1 }}</span
            >
          </div>
          <h3 class="mt-8 text-2xl font-bold leading-tight">
            {{ service.title }}
          </h3>
          <p class="mt-4 leading-7 text-primary/68">{{ service.summary }}</p>
          <ul class="mt-6 grid gap-3">
            <li
              v-for="point in service.points"
              :key="point"
              class="flex items-center gap-3 text-sm text-primary/70"
            >
              <span class="h-2 w-2 bg-[var(--accent)]"></span>
              {{ point }}
            </li>
          </ul>
        </article>
      </div>

      <div
        class="portfolio-reveal mt-6 border border-primary/10 bg-secondary p-5 font-ibmMono text-sm text-primary/65"
      >
        Current focus:
        <span class="text-info">{{ services[activeService].title }}</span>
      </div>
    </section>

    <section id="Work" class="border-y border-primary/10 bg-primary/[0.025]">
      <div
        class="mx-auto grid w-full max-w-[1280px] items-start gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-14"
      >
        <div class="portfolio-reveal lg:sticky lg:top-24 lg:self-start">
          <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">
            Selected outcomes
          </p>
          <h2
            class="mt-4 font-oswald text-5xl font-black uppercase leading-none sm:text-6xl"
          >
            Built for clients who need momentum.
          </h2>
          <p class="mt-5 text-lg leading-8 text-primary/70">
            I frame work around business movement: faster delivery, smoother
            operations, clearer products, and interfaces that make the offer
            easier to trust.
          </p>
        </div>

        <div class="grid gap-4">
          <component
            :is="
              item.href
                ? item.href.startsWith('http')
                  ? 'a'
                  : 'NuxtLink'
                : 'article'
            "
            v-for="(item, index) in caseStudies"
            :key="item.title"
            :href="
              item.href && item.href.startsWith('http') ? item.href : undefined
            "
            :to="
              item.href && !item.href.startsWith('http') ? item.href : undefined
            "
            :target="
              item.href && item.href.startsWith('http') ? '_blank' : undefined
            "
            :rel="
              item.href && item.href.startsWith('http')
                ? 'noreferrer'
                : undefined
            "
            class="portfolio-reveal block border border-primary/10 bg-secondary p-5 transition hover:border-info"
            :class="[
              activeCaseStudy === index ? 'border-info bg-info/5' : '',
              item.href ? 'cursor-pointer' : '',
            ]"
            @mouseenter="activeCaseStudy = index"
          >
            <div
              class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <p
                  class="font-ibmMono text-xs uppercase tracking-[0.18em] text-primary/45"
                >
                  {{ item.result }}
                </p>
                <h3 class="mt-2 text-2xl font-bold">{{ item.title }}</h3>
              </div>
              <Icon
                v-if="item.href"
                name="mdi:arrow-top-right"
                class="text-info"
                size="24"
              />
            </div>
            <p class="mt-4 max-w-2xl leading-7 text-primary/68">
              {{ item.text }}
            </p>
          </component>
        </div>
      </div>
    </section>

    <section
      id="Process"
      class="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 lg:px-14"
    >
      <div
        class="portfolio-reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
      >
        <div class="max-w-3xl">
          <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">
            How we work
          </p>
          <h2
            class="mt-4 font-oswald text-5xl font-black uppercase leading-none sm:text-6xl"
          >
            Working demo in two weeks. Or you don't pay.
          </h2>
        </div>
        <a
          :href="calBookingUrl"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 border border-info px-5 py-3 font-ibmMono text-sm text-info transition hover:bg-info hover:text-secondary"
        >
          Book a build discussion
          <Icon name="mdi:calendar-arrow-right" size="18" />
        </a>
      </div>

      <div class="mt-10 grid gap-5 lg:grid-cols-3">
        <article
          v-for="step in processSteps"
          :key="step.step"
          class="portfolio-reveal border border-primary/10 p-6"
        >
          <p class="font-oswald text-5xl font-black text-info">
            {{ step.step }}
          </p>
          <h3 class="mt-6 text-2xl font-bold leading-tight">
            {{ step.title }}
          </h3>
          <p class="mt-4 leading-7 text-primary/68">{{ step.text }}</p>
        </article>
      </div>
    </section>

    <section
      id="Stack"
      class="mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-14"
    >
      <div class="portfolio-reveal">
        <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">
          Technical range
        </p>
        <h2
          class="mt-4 font-oswald text-5xl font-black uppercase leading-none sm:text-6xl"
        >
          Enough stack to own the outcome.
        </h2>
        <p class="mt-5 text-lg leading-8 text-primary/70">
          Clients should not have to coordinate three people to ship one
          workflow. I can handle the front end, backend integration, automation
          logic, and AI layer.
        </p>
        <div class="mt-7 flex flex-wrap gap-2">
          <span
            v-for="tech in techStack"
            :key="tech"
            class="border border-primary/10 px-3 py-2 font-ibmMono text-sm text-primary/70"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <div class="grid gap-4">
        <article
          v-for="experience in experiences"
          :key="experience.company"
          class="portfolio-reveal border border-primary/10 bg-primary/[0.025] p-5"
        >
          <p
            class="font-ibmMono text-xs uppercase tracking-[0.16em] text-primary/45"
          >
            {{ experience.period }}
          </p>
          <div
            class="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <h3 class="text-2xl font-bold">{{ experience.company }}</h3>
            <p class="text-info">{{ experience.role }}</p>
          </div>
          <p class="mt-3 leading-7 text-primary/68">{{ experience.summary }}</p>
        </article>
      </div>
    </section>

    <section class="border-y border-primary/10 bg-primary/[0.025]">
      <div
        class="mx-auto grid w-full max-w-[1280px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14"
      >
        <div class="portfolio-reveal">
          <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">
            Thinking in public
          </p>
          <h2
            class="mt-4 font-oswald text-4xl font-black uppercase leading-none sm:text-5xl"
          >
            Read how I think about AI ROI.
          </h2>
          <p class="mt-4 max-w-2xl leading-7 text-primary/68">
            The blog is built to attract founders and CTOs looking for practical
            AI engineering, not empty hype.
          </p>
        </div>
        <NuxtLink
          to="/blogs/ai-engineering-revolution"
          class="portfolio-reveal inline-flex items-center justify-center gap-2 bg-info px-5 py-3 font-ibmMono text-sm font-bold text-secondary transition hover:opacity-90"
        >
          Read the article
          <Icon name="mdi:arrow-right" size="18" />
        </NuxtLink>
      </div>
    </section>

    <section
      id="Contact"
      class="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 lg:px-14"
    >
      <div
        class="portfolio-reveal border border-info/50 bg-info/5 p-6 sm:p-8 lg:p-10"
      >
        <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">
          Available for serious builds
        </p>
        <div class="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <h2
              class="font-oswald text-5xl font-black uppercase leading-none sm:text-6xl"
            >
              Need SuiteCRM, automation, or AI work shipped properly?
            </h2>
            <p class="mt-5 max-w-2xl text-lg leading-8 text-primary/72">
              Send the CRM problem, SuiteCRM migration, plugin idea, workflow,
              product concept, or broken process. I will help shape the build
              path and tell you what should be fixed, automated, or built first.
            </p>
          </div>
          <div class="flex flex-wrap gap-3 lg:justify-end">
            <a
              v-for="link in contactLinks"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-2 border border-primary/15 bg-secondary px-4 py-3 font-ibmMono text-sm transition hover:border-info hover:text-info"
            >
              <Icon :name="link.icon" size="18" />
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
