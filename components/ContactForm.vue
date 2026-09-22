<script setup lang="ts">
// "Send the brief": the written, low-commitment way in, next to "Book a call".
// Posts to Netlify Forms via the static definition in public/__forms.html
// (keep the field names in sync there). No backend, no third-party script.
const route = useRoute();
const { gtag } = useGtag();

const name = ref("");
const email = ref("");
const company = ref("");
const message = ref("");
const budget = ref("");
const botField = ref("");
const status = ref<"idle" | "sending" | "sent" | "error">("idle");

const budgetOptions = [
  "Under $2,000",
  "$2,000 to $7,000",
  "$7,000 or more",
  "Not sure yet",
];

const onSubmit = async () => {
  if (status.value === "sending") return;
  status.value = "sending";
  try {
    const body = new URLSearchParams({
      "form-name": "contact",
      name: name.value.trim(),
      email: email.value.trim(),
      company: company.value.trim(),
      message: message.value.trim(),
      budget: budget.value,
      source: route.path,
      "bot-field": botField.value,
    });
    const res = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    if (!res.ok) throw new Error(`form post failed: ${res.status}`);
    status.value = "sent";
    if (localStorage.getItem("shahab-analytics-consent") === "granted") {
      gtag("event", "generate_lead", { method: "contact_form", page_path: route.path });
    }
  } catch {
    status.value = "error";
  }
};
</script>

<template>
  <div class="border border-secondary/30 bg-secondary p-6 text-primary sm:p-8">
    <div v-if="status === 'sent'" aria-live="polite">
      <p class="label text-go">Sent</p>
      <p class="wd-88 mt-3 text-2xl font-bold leading-tight">Got it. I read every brief myself.</p>
      <p class="mt-3 leading-7 text-primary/75">
        You'll hear back within one working day with a straight answer on what
        to build first, or a question if I need more detail.
      </p>
    </div>

    <form v-else name="contact" @submit.prevent="onSubmit">
      <p class="label text-primary/70">Send the brief</p>
      <p class="mt-2 text-sm leading-6 text-primary/75">
        Prefer writing to a call? Describe the process or the idea. Reply within one working day.
      </p>

      <div class="mt-5 grid gap-3 sm:grid-cols-2">
        <label class="block">
          <span class="label text-primary/70">Your name</span>
          <input
            v-model="name"
            type="text"
            name="name"
            required
            autocomplete="name"
            class="field mt-1.5"
          />
        </label>
        <label class="block">
          <span class="label text-primary/70">Work email</span>
          <input
            v-model="email"
            type="email"
            name="email"
            required
            autocomplete="email"
            class="field mt-1.5"
          />
        </label>
      </div>

      <div class="mt-3 grid gap-3 sm:grid-cols-2">
        <label class="block">
          <span class="label text-primary/70">Company <span class="normal-case tracking-normal">(optional)</span></span>
          <input v-model="company" type="text" name="company" autocomplete="organization" class="field mt-1.5" />
        </label>
        <label class="block">
          <span class="label text-primary/70">Budget <span class="normal-case tracking-normal">(optional)</span></span>
          <select v-model="budget" name="budget" class="field mt-1.5">
            <option value="">Choose a range</option>
            <option v-for="o in budgetOptions" :key="o" :value="o">{{ o }}</option>
          </select>
        </label>
      </div>

      <label class="mt-3 block">
        <span class="label text-primary/70">What do you need?</span>
        <textarea
          v-model="message"
          name="message"
          required
          rows="4"
          class="field mt-1.5"
          placeholder="The manual process, the half-built system, or the idea. Which tools are involved and what should happen instead."
        ></textarea>
      </label>

      <p class="hidden" aria-hidden="true">
        <label>Leave this field empty: <input v-model="botField" name="bot-field" /></label>
      </p>

      <button type="submit" :disabled="status === 'sending'" class="btn btn-ink mt-5 w-full disabled:opacity-60 sm:w-auto">
        {{ status === "sending" ? "Sending…" : "Send the brief" }}
      </button>

      <p v-if="status === 'error'" class="mt-3 text-sm leading-6 text-info">
        That didn't send. Email me instead at
        <a href="mailto:shahab.developer.work@gmail.com?subject=Project%20brief" class="underline">shahab.developer.work@gmail.com</a>.
      </p>
      <p v-else class="mt-3 text-xs leading-5 text-primary/65">
        Your details are used only to reply to you. See the
        <NuxtLink to="/privacy/" class="underline underline-offset-2">privacy notice</NuxtLink>.
      </p>
    </form>
  </div>
</template>

<style scoped>
.field {
  display: block;
  width: 100%;
  border: 1.5px solid rgb(var(--c-ink) / 0.35);
  border-radius: 2px;
  background: rgb(var(--c-raised));
  padding: 0.7rem 0.85rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: rgb(var(--c-ink));
  transition: border-color 140ms ease;
}

.field::placeholder {
  color: rgb(var(--c-ink) / 0.5);
}

.field:focus {
  outline: none;
  border-color: rgb(var(--c-signal));
  box-shadow: 3px 3px 0 rgb(var(--c-hot));
}

select.field {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, rgb(var(--c-ink)) 50%),
    linear-gradient(135deg, rgb(var(--c-ink)) 50%, transparent 50%);
  background-position:
    calc(100% - 18px) 50%,
    calc(100% - 12px) 50%;
  background-size: 6px 6px;
  background-repeat: no-repeat;
  padding-right: 2.25rem;
}
</style>
