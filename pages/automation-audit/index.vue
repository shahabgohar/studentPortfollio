<script setup lang="ts">
const title = "Automation Audit: 12 Manual Processes to Kill | Shahab Gohar";
const description =
  "A free checklist of 12 manual processes to automate across your CRM and back office: what each one costs per year, and the workflow, integration, or AI build that removes it.";
const canonical = "https://shahabgohar.dev/automation-audit/";

useHead({
  title,
  link: [{ rel: "canonical", href: canonical }],
  meta: [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonical },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
});

const clusters = [
  {
    title: "Data entry",
    text: "Leads from email and web forms, business cards from events, and attachment data that someone still types in by hand.",
  },
  {
    title: "Sales admin",
    text: "Quote, order, and invoice re-entry, quotes nobody chased, hand-written follow-ups, and leads assigned one at a time.",
  },
  {
    title: "Data hygiene",
    text: "Duplicate contacts merged by eye and deal stages that live in WhatsApp threads instead of the CRM.",
  },
  {
    title: "Reporting",
    text: "The Monday pipeline report and every CSV export built to answer a single question.",
  },
];

const proof = [
  { value: "5.0", label: "average client rating" },
  { value: "35+", label: "five-star reviews" },
  { value: "10", label: "countries served" },
];
</script>

<template>
  <main class="min-h-screen bg-secondary font-inter text-primary">
    <article class="mx-auto w-full max-w-[1120px] px-6 py-8 sm:px-10 lg:px-16">
      <nav
        class="flex items-center justify-between border-b border-primary/10 pb-5 font-ibmMono text-sm"
      >
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info"
        >
          <Icon name="mdi:arrow-left" size="18" />
          Home
        </NuxtLink>
        <NuxtLink
          to="/services/"
          class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info"
        >
          Services
          <Icon name="mdi:arrow-top-right-bold-box-outline" size="18" />
        </NuxtLink>
      </nav>

      <div class="grid gap-12 pt-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        <header>
          <p
            class="font-ibmMono text-sm font-semibold uppercase tracking-[0.1em] text-info"
          >
            Free audit checklist
          </p>
          <h1
            class="text-balance mt-3 font-grotesk text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
          >
            12 processes your team still does by hand.
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-8 text-primary/75">
            A ten-minute audit. Score your stack against the 12 manual
            processes I get hired to remove most often, with what each one
            costs per year and the specific build that removes it. Written
            from 35+ CRM and automation projects, not from a template.
          </p>
          <dl class="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            <div v-for="stat in proof" :key="stat.label">
              <dt class="sr-only">{{ stat.label }}</dt>
              <dd class="font-grotesk text-2xl font-bold text-info">
                {{ stat.value }}
              </dd>
              <dd class="mt-1 text-[12.5px] text-primary/50">
                {{ stat.label }}
              </dd>
            </div>
          </dl>
        </header>

        <div class="rounded-2xl border border-info/25 bg-info/[0.05] p-6 sm:p-8">
          <h2 class="font-grotesk text-xl font-semibold">
            Get the checklist now.
          </h2>
          <p class="mt-2 text-sm leading-6 text-primary/65">
            It opens right after you submit. No email chain to click through.
          </p>
          <div class="mt-5">
            <LeadMagnetOptin variant="card" />
          </div>
        </div>
      </div>

      <section class="mt-20 border-t border-primary/10 pt-14">
        <h2 class="font-grotesk text-3xl font-bold tracking-tight sm:text-4xl">
          What the audit covers.
        </h2>
        <div class="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2">
          <div v-for="cluster in clusters" :key="cluster.title">
            <h3 class="font-grotesk text-lg font-semibold">
              {{ cluster.title }}
            </h3>
            <p class="mt-2 leading-7 text-primary/65">{{ cluster.text }}</p>
          </div>
        </div>
        <p class="mt-12 max-w-2xl leading-7 text-primary/60">
          Every row has the same shape: the process, what it typically costs,
          and the workflow, integration, or AI build that removes it. Several
          come straight from projects on this site, including the
          quote-to-invoice pipeline and the WhatsApp-to-CRM build, so you can
          check the receipts before you trust the advice.
        </p>
      </section>
    </article>
    <SiteFooter />
  </main>
</template>
