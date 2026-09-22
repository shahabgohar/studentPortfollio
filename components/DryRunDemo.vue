<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

// The hero's working model of the offer: an inbound message is parsed into CRM
// fields, then everything stops at a write gate until a human approves it.
// It is prerendered already parked at the gate (meaningful without JS, nothing
// shifts on hydration); animation only ever runs in response to a click.

interface Scenario {
  route: string
  channel: string
  sender: string
  message: string
  fields: { k: string; v: string }[]
  plan: string
  done: string
}

const scenarios: Scenario[] = [
  {
    route: 'whatsapp → crm',
    channel: 'WhatsApp',
    sender: 'Sara L., 09:41',
    // Deliberately generic: no prices, and nothing that resembles a real client
    // or case study on this site.
    message:
      "Hi, this is Sara from Northwind Logistics. Our team of 12 re-types every WhatsApp order into the CRM by hand. Can you help? We'd like to start in March.",
    fields: [
      { k: 'contact', v: 'Sara L.' },
      { k: 'company', v: 'Northwind Logistics' },
      { k: 'need', v: 'WhatsApp orders → CRM' },
      { k: 'team', v: '12 people' },
      { k: 'start', v: 'March' },
      { k: 'source', v: 'WhatsApp' },
    ],
    plan: 'create 1 deal and 1 contact in the CRM',
    done: 'Deal and contact written. 6 fields mapped, 0 unintended writes.',
  },
  {
    route: 'inbox → crm',
    channel: 'Email',
    sender: 'M. Keller, 14:02',
    message:
      'Approved. Please go ahead with quote Q-1184 for 250 units. Invoice our Hamburg office, net 30 as usual.',
    fields: [
      { k: 'quote', v: 'Q-1184' },
      { k: 'action', v: 'Convert to order' },
      { k: 'quantity', v: '250 units' },
      { k: 'bill to', v: 'Hamburg office' },
      { k: 'terms', v: 'Net 30' },
      { k: 'next', v: 'Draft invoice' },
    ],
    plan: 'convert 1 quote to an order and draft 1 invoice',
    done: 'Order created and invoice drafted. Nobody re-typed a thing.',
  },
  {
    route: 'card scan → crm',
    channel: 'Card scan',
    sender: 'Trade show, 16:20',
    message:
      'Priya Raman, Head of Operations, Atlas Freight Ltd. priya@atlasfreight.example, +44 20 7946 0142.',
    fields: [
      { k: 'name', v: 'Priya Raman' },
      { k: 'title', v: 'Head of Operations' },
      { k: 'company', v: 'Atlas Freight Ltd' },
      { k: 'email', v: 'priya@atlasfreight.example' },
      { k: 'phone', v: '+44 20 7946 0142' },
      { k: 'next', v: 'Follow-up in 2 days' },
    ],
    plan: 'create 1 contact and queue 1 follow-up task',
    done: 'Contact saved and follow-up queued before the stand closed.',
  },
]

type Phase = 'gate' | 'approved' | 'rejected' | 'reading' | 'extracting'

const index = ref(0)
// True until the visitor runs a second scenario. Gates the CSS-only intro so
// it plays on first paint but never fights the scripted sequence afterwards.
const intro = ref(true)
const phase = ref<Phase>('gate')
const typed = ref(scenarios[0].message.length)
const shownFields = ref(scenarios[0].fields.length)

const s = computed(() => scenarios[index.value])
const runNo = computed(() => String(427 + index.value).padStart(4, '0'))
const busy = computed(() => phase.value === 'reading' || phase.value === 'extracting')
const visibleMessage = computed(() => s.value.message.slice(0, typed.value))

const statusLabel = computed(() => {
  switch (phase.value) {
    case 'approved':
      return 'Approved by you'
    case 'rejected':
      return 'Rejected'
    case 'gate':
      return 'Waiting for you'
    default:
      return 'Standing by'
  }
})

const statusMessage = computed(() => {
  switch (phase.value) {
    case 'approved':
      return s.value.done
    case 'rejected':
      return 'Rejected. 0 writes. The CRM never saw this one.'
    case 'reading':
      return 'Reading the inbound message…'
    case 'extracting':
      return 'Extracting structured fields…'
    default:
      return `Dry run: this would ${s.value.plan}. Nothing has been written.`
  }
})

let timer: ReturnType<typeof setInterval> | null = null
const stop = () => {
  if (timer) clearInterval(timer)
  timer = null
}

function approve() {
  if (phase.value === 'gate') phase.value = 'approved'
}

function reject() {
  if (phase.value === 'gate') phase.value = 'rejected'
}

function next() {
  stop()
  intro.value = false
  index.value = (index.value + 1) % scenarios.length
  const total = s.value.message.length
  const fieldCount = s.value.fields.length

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typed.value = total
    shownFields.value = fieldCount
    phase.value = 'gate'
    return
  }

  typed.value = 0
  shownFields.value = 0
  phase.value = 'reading'

  timer = setInterval(() => {
    typed.value = Math.min(total, typed.value + 3)
    if (typed.value < total) return
    stop()
    phase.value = 'extracting'
    timer = setInterval(() => {
      shownFields.value += 1
      if (shownFields.value < fieldCount) return
      stop()
      phase.value = 'gate'
    }, 130)
  }, 22)
}

onBeforeUnmount(stop)
</script>

<template>
  <section
    class="demo border border-primary bg-raised shadow-[8px_8px_0_rgb(var(--c-ink))]"
    aria-label="Interactive demo: approve or reject a dry-run write"
  >
    <header class="flex items-center justify-between gap-3 border-b border-primary px-4 py-2.5">
      <p class="mono flex min-w-0 items-center gap-2.5 text-primary/70">
        <span class="h-2 w-2 shrink-0 bg-hot" aria-hidden="true"></span>
        <span class="truncate">Run {{ runNo }}: {{ s.route }}</span>
      </p>
      <span
        class="label shrink-0 px-2 py-1"
        :class="phase === 'approved' ? 'bg-go text-secondary' : 'bg-primary text-secondary'"
      >
        {{ phase === 'approved' ? 'Live write' : 'Dry run' }}
      </span>
    </header>

    <div class="grid sm:grid-cols-[1fr_1.12fr]">
      <div class="border-b border-primary/15 p-4 sm:border-b-0 sm:border-r">
        <p class="label text-primary/70">01 Inbound, {{ s.channel }}</p>
        <p class="mt-3 min-h-[7.5rem] bg-well p-3.5 text-[0.9375rem] leading-[1.55] sm:min-h-[9.75rem]">
          {{ visibleMessage }}<span v-if="phase === 'reading'" class="caret" aria-hidden="true"></span>
        </p>
        <p class="mono mt-2.5 text-primary/70">{{ s.sender }}</p>
      </div>

      <div class="p-4">
        <p class="label flex items-center justify-between text-primary/70">
          <span>02 Extracted</span>
          <span class="tabular">{{ shownFields }}/{{ s.fields.length }}</span>
        </p>
        <dl class="mt-3 border-t border-primary/15">
          <div
            v-for="(field, i) in s.fields"
            :key="field.k"
            class="field mono grid grid-cols-[4.75rem_1fr] gap-3 border-b border-primary/15 py-[0.4375rem] transition-opacity duration-200"
            :class="[i < shownFields ? 'opacity-100' : 'opacity-0', { 'field--intro': intro }]"
            :style="{ '--i': i }"
          >
            <dt class="text-primary/70">{{ field.k }}</dt>
            <dd class="truncate font-medium">{{ field.v }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="border-t border-primary">
      <div class="tape" :class="{ 'tape--armed': phase === 'gate', 'tape--open': phase === 'approved' }" aria-hidden="true"></div>
      <div class="p-4">
        <p class="label flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>03 Write gate</span>
          <span class="text-primary/40" aria-hidden="true">/</span>
          <span :class="phase === 'approved' ? 'text-go' : 'text-info'">{{ statusLabel }}</span>
        </p>
        <p class="mt-2.5 min-h-[3.25rem] text-[0.9375rem] leading-[1.55]" aria-live="polite">
          <Icon v-if="phase === 'approved'" name="ph:check-circle" size="18" class="mr-1 text-go" />
          <Icon v-else-if="phase === 'rejected'" name="ph:prohibit" size="18" class="mr-1 text-info" />
          {{ statusMessage }}
        </p>
        <div class="mt-3 grid min-h-[3.25rem] grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] items-start gap-3 sm:flex sm:flex-wrap">
          <template v-if="phase === 'gate' || busy">
            <button
              type="button"
              class="btn btn-hot !gap-2 !px-3 !py-3 !text-[0.75rem] disabled:cursor-not-allowed disabled:opacity-40 sm:!px-4 sm:!text-[0.8125rem]"
              :class="{ 'btn-pulse': phase === 'gate' }"
              :disabled="busy"
              @click="approve"
            >
              <Icon name="ph:check" size="16" />
              Approve write
            </button>
            <button
              type="button"
              class="btn btn-line !px-3 !py-3 !text-[0.75rem] disabled:cursor-not-allowed disabled:opacity-40 sm:!px-4 sm:!text-[0.8125rem]"
              :disabled="busy"
              @click="reject"
            >
              Reject
            </button>
          </template>
          <button v-else type="button" class="btn btn-ink col-span-2 !px-4 !py-3 sm:col-span-1" @click="next">
            <Icon name="ph:arrow-clockwise" size="16" />
            Run the next one
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* First paint: the extracted fields tick in one by one, no JS involved. */
@media (prefers-reduced-motion: no-preference) {
  .field--intro {
    /* backwards only: once it has played, the opacity classes own the field again */
    animation: rise-in 420ms cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
    animation-delay: calc(500ms + var(--i) * 110ms);
  }
}

.caret {
  display: inline-block;
  width: 0.5em;
  height: 1em;
  margin-left: 1px;
  vertical-align: -0.12em;
  background: rgb(var(--c-hot));
}

/* Hazard tape across the gate. It crawls while the gate is armed. */
.tape {
  position: relative;
  height: 10px;
  overflow: hidden;
  background: rgb(var(--c-ink));
}

.tape::before {
  content: '';
  position: absolute;
  inset: 0 -60px;
  background-image: repeating-linear-gradient(
    -45deg,
    rgb(var(--c-hot)) 0 9px,
    rgb(var(--c-on-hot)) 9px 18px
  );
}

.tape--armed::before {
  animation: tape-crawl 1.4s linear infinite;
}

.tape--open::before {
  background: rgb(var(--c-go));
}

@keyframes tape-crawl {
  to {
    transform: translateX(25.456px);
  }
}

.btn-pulse {
  animation: gate-pulse 2.2s ease-out infinite;
}

@keyframes gate-pulse {
  0% {
    box-shadow:
      4px 4px 0 rgb(var(--c-ink)),
      0 0 0 0 rgb(var(--c-hot) / 0.5);
  }
  60%,
  100% {
    box-shadow:
      4px 4px 0 rgb(var(--c-ink)),
      0 0 0 14px rgb(var(--c-hot) / 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tape--armed::before,
  .btn-pulse {
    animation: none;
  }
}
</style>
