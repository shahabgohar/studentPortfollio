<script setup lang="ts">
// Checklist delivery page. Reached via redirect after the opt-in form
// submits. Unlinked and noindexed on purpose: it is the lead magnet itself.
const calBookingUrl = "https://cal.com/shahabgohar/build-discussion";

useHead({
  title: "The Automation Audit | Shahab Gohar",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

const printPage = () => {
  window.print();
};

const items = [
  {
    title: "Re-typing leads from email and web forms into the CRM",
    cost: "Typical cost: 15 to 45 minutes a day for whoever owns the inbox",
    fix: "Parse inbound email and form submissions into CRM records automatically, deduplicated on email and phone. This is the most common first sprint, and the fastest payback on this list.",
  },
  {
    title: "Copying contacts between the marketing tool and the CRM",
    cost: "Typical cost: 2 to 4 hours a week, plus sync errors in both directions",
    fix: "A two-way Mautic and SuiteCRM sync with field mapping and dedupe rules. Marketing sees CRM reality, sales sees campaign history, and nobody exports a CSV to make that happen.",
  },
  {
    title: "Typing business cards from events into contacts",
    cost: "Typical cost: an afternoon after every event, and half the cards never make it in",
    fix: "Scan the card, get the contact with a follow-up task attached. I ship this as Business Card Reader on the SuiteCRM Store, built for event season.",
  },
  {
    title: "Rebuilding the same pipeline report every Monday",
    cost: "Typical cost: 1 to 2 hours a week per manager",
    fix: "A saved dashboard that answers the question on login. My AI Dashlet Generator turns one written sentence into a SuiteCRM widget, so a new question doesn't need a new build.",
  },
  {
    title: "Re-entering the same data across quote, order, and invoice",
    cost: "Typical cost: 20 to 30 minutes per deal, multiplied by every deal you close",
    fix: "One record flows through all three documents with change detection. I built this for a US sales team; the review came back 5.0.",
  },
  {
    title: "Chasing quotes nobody answered",
    cost: "Typical cost: deals die quietly, and nobody notices for weeks",
    fix: "An aging-quote workflow that nudges the owner at day 3, day 7, and day 14, then flags the quote for a decision instead of letting it sit.",
  },
  {
    title: "Writing every follow-up email by hand",
    cost: "Typical cost: 30 or more minutes a day per salesperson",
    fix: "Templates with merge fields, triggered by stage changes, still sent from your own address. The words stay yours; the typing goes away.",
  },
  {
    title: "De-duplicating contacts by eye",
    cost: "Typical cost: hours per import, and duplicates still slip through",
    fix: "Dedupe rules at import time plus a scheduled merge job with a review queue. Humans decide the ambiguous cases, not the whole pile.",
  },
  {
    title: "Assigning leads round-robin by hand",
    cost: "Typical cost: minutes per lead, plus leads that sit unassigned overnight",
    fix: "Assignment rules by territory, load, or source, applied the second a lead lands. Nobody's pipeline depends on who was online at 6 pm.",
  },
  {
    title: "Keying data out of PDFs and attachments",
    cost: "Typical cost: 10 to 20 minutes per document",
    fix: "AI extraction that reads invoices and purchase orders into structured fields behind an approval gate. The detection pipeline is written up on my blog if you want the internals.",
  },
  {
    title: "Updating deal stages from WhatsApp and email threads",
    cost: "Typical cost: a CRM that is always three days behind reality",
    fix: "Inbound conversations parsed into structured deal updates. My WhatsApp-to-CRM build extracts 13 fields per conversation and runs with zero unintended writes.",
  },
  {
    title: "Exporting CSVs to answer one question",
    cost: "Typical cost: 1 to 2 hours a week, and the answer is stale by Friday",
    fix: "Live dashlets fed by the CRM itself. The question gets answered where the data lives, not in a spreadsheet with a filename ending in final-v3.",
  },
];

const roiStats = [
  {
    value: "2 h/day",
    label: "typical manual copy-paste between inbox, sheets, and CRM",
  },
  { value: "$13,000+", label: "what that costs per year at $25 an hour" },
  { value: "< 2 months", label: "typical payback on an automation sprint" },
];
</script>

<template>
  <main class="min-h-screen bg-secondary font-inter text-primary print:bg-white">
    <article class="mx-auto w-full max-w-[920px] px-6 py-8 sm:px-10 lg:px-16">
      <nav
        class="flex items-center justify-between border-b border-primary/10 pb-5 font-ibmMono text-sm print:hidden"
      >
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info"
        >
          <Icon name="mdi:arrow-left" size="18" />
          Home
        </NuxtLink>
        <button
          type="button"
          class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info"
          @click="printPage"
        >
          <Icon name="mdi:printer-outline" size="18" />
          Print or save as PDF
        </button>
      </nav>

      <header class="pt-10">
        <p
          class="font-ibmMono text-sm font-semibold uppercase tracking-[0.1em] text-info"
        >
          The automation audit
        </p>
        <h1
          class="mt-3 font-grotesk text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
        >
          12 manual processes, costed and fixed.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-primary/75">
          Read the list and mark every row your team still does by hand. Then
          add up the hours: the three numbers at the bottom show what those
          hours turn into over a year.
        </p>
      </header>

      <ol class="mt-14 space-y-11">
        <li
          v-for="(item, i) in items"
          :key="item.title"
          class="grid gap-3 sm:grid-cols-[56px_1fr]"
        >
          <span class="font-ibmMono text-sm font-medium text-info">
            {{ String(i + 1).padStart(2, "0") }}
          </span>
          <div>
            <h2 class="font-grotesk text-xl font-semibold leading-snug">
              {{ item.title }}
            </h2>
            <p class="mt-2 font-ibmMono text-[13px] text-primary/55">
              {{ item.cost }}
            </p>
            <p class="mt-3 leading-7 text-primary/75">{{ item.fix }}</p>
          </div>
        </li>
      </ol>

      <section
        class="mt-16 grid gap-8 rounded-2xl border border-primary/15 p-8 sm:grid-cols-3 sm:p-10"
      >
        <div v-for="stat in roiStats" :key="stat.value">
          <p class="font-grotesk text-3xl font-bold text-info">
            {{ stat.value }}
          </p>
          <p class="mt-2 text-sm leading-6 text-primary/60">{{ stat.label }}</p>
        </div>
      </section>

      <section
        class="mt-14 rounded-2xl border border-info/25 bg-info/[0.05] p-8 text-center sm:p-12 print:hidden"
      >
        <h2 class="font-grotesk text-2xl font-semibold sm:text-3xl">
          Want the two or three with the fastest payback for your stack?
        </h2>
        <p class="mx-auto mt-3 max-w-xl leading-7 text-primary/70">
          That's what the 30-minute call is for. You leave with a
          plain-language plan for what to automate first, whether or not we
          end up working together.
        </p>
        <div
          class="mt-7 flex flex-wrap justify-center gap-3 font-ibmMono text-sm"
        >
          <a
            :href="calBookingUrl"
            target="_blank"
            rel="noopener"
            class="rounded-xl bg-info px-5 py-3 font-semibold text-secondary transition hover:opacity-90"
          >
            Book a call
          </a>
          <NuxtLink
            to="/projects/"
            class="rounded-xl border border-primary/20 px-5 py-3 font-semibold text-primary transition hover:border-info hover:text-info"
          >
            See the projects behind this list
          </NuxtLink>
        </div>
      </section>
    </article>
    <div class="print:hidden">
      <SiteFooter />
    </div>
  </main>
</template>

<style scoped>
@media print {
  main {
    background: #fff !important;
  }
  main :deep(*) {
    color: #111 !important;
    border-color: #ddd !important;
  }
}
</style>
