<script setup lang="ts">
withDefaults(defineProps<{ variant?: "band" | "card" }>(), {
  variant: "band",
});

const route = useRoute();
const { gtag } = useGtag();

const name = ref("");
const email = ref("");
const crm = ref("");
const botField = ref("");
const status = ref<"idle" | "sending" | "error">("idle");

const crmOptions = [
  "SuiteCRM",
  "Salesforce",
  "HubSpot",
  "Something else",
  "No CRM yet",
];

const onSubmit = async () => {
  if (status.value === "sending") return;
  status.value = "sending";
  try {
    const body = new URLSearchParams({
      "form-name": "automation-audit",
      name: name.value.trim(),
      email: email.value.trim(),
      crm: crm.value,
      source: route.path,
      "bot-field": botField.value,
    });
    // Netlify Forms accepts submissions only against a static asset, so this
    // posts to the hidden form file, not the page route.
    const res = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    if (!res.ok) throw new Error(`form post failed: ${res.status}`);
    if (localStorage.getItem("shahab-analytics-consent") === "granted") {
      gtag("event", "lead_captured", {
        app_name: "Shahab Portfolio",
        screen_name: "AutomationAudit",
        source: route.path,
      });
    }
    await navigateTo("/automation-audit/thanks");
  } catch {
    status.value = "error";
  }
};
</script>

<template>
  <aside
    :class="
      variant === 'band'
        ? 'rounded-2xl border border-info/25 bg-info/[0.05] p-6 sm:p-8'
        : ''
    "
  >
    <div
      :class="
        variant === 'band' ? 'grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center' : ''
      "
    >
      <div v-if="variant === 'band'">
        <p class="font-ibmMono text-xs font-semibold uppercase tracking-[0.18em] text-info">
          Free checklist
        </p>
        <h2 class="mt-3 font-grotesk text-2xl font-semibold leading-snug">
          12 processes your team should stop doing by hand.
        </h2>
        <p class="mt-3 text-sm leading-6 text-primary/65">
          The automation audit: what each manual process costs per year, and
          the workflow, integration, or AI build that removes it. It opens
          right after you submit.
        </p>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="grid gap-3 sm:grid-cols-2">
          <label class="block">
            <span class="sr-only">Your name</span>
            <input
              v-model="name"
              type="text"
              name="name"
              required
              autocomplete="name"
              placeholder="Your name"
              class="w-full rounded-xl border border-primary/20 bg-secondary px-4 py-3 text-sm text-primary placeholder:text-primary/40 focus:border-info focus:outline-none"
            />
          </label>
          <label class="block">
            <span class="sr-only">Work email</span>
            <input
              v-model="email"
              type="email"
              name="email"
              required
              autocomplete="email"
              placeholder="Work email"
              class="w-full rounded-xl border border-primary/20 bg-secondary px-4 py-3 text-sm text-primary placeholder:text-primary/40 focus:border-info focus:outline-none"
            />
          </label>
        </div>
        <label class="mt-3 block">
          <span class="sr-only">Which CRM do you run?</span>
          <select
            v-model="crm"
            name="crm"
            required
            class="w-full rounded-xl border border-primary/20 bg-secondary px-4 py-3 text-sm focus:border-info focus:outline-none"
            :class="crm === '' ? 'text-primary/40' : 'text-primary'"
          >
            <option value="" disabled>Which CRM do you run?</option>
            <option v-for="o in crmOptions" :key="o" :value="o">{{ o }}</option>
          </select>
        </label>
        <p class="hidden" aria-hidden="true">
          <label>Leave this field empty: <input v-model="botField" name="bot-field" /></label>
        </p>
        <button
          type="submit"
          :disabled="status === 'sending'"
          class="mt-4 w-full rounded-xl bg-info px-5 py-3 font-semibold text-secondary transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
        >
          {{ status === "sending" ? "Sending..." : "Get the checklist" }}
        </button>
        <p v-if="status === 'error'" class="mt-3 text-sm leading-6 text-red-400">
          That didn't send. Email me at
          <a
            href="mailto:shahab.developer.work@gmail.com?subject=Checklist"
            class="underline"
            >shahab.developer.work@gmail.com</a
          >
          and I'll reply with the checklist.
        </p>
        <p v-else class="mt-3 text-[12.5px] leading-5 text-primary/45">
          Instant access. At most one follow-up email from me, no newsletter.
        </p>
      </form>
    </div>
  </aside>
</template>
