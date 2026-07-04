<script setup lang="ts">
const consentKey = "shahab-analytics-consent";
const showBanner = ref(false);
const analyticsEnabled = ref(false);

function grantAnalyticsConsent() {
  const { gtag, initialize } = useGtag();
  initialize();
  gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("event", "page_view");
}

function acceptAnalytics() {
  localStorage.setItem(consentKey, "granted");
  analyticsEnabled.value = true;
  showBanner.value = false;
  grantAnalyticsConsent();
}

function rejectAnalytics() {
  localStorage.setItem(consentKey, "denied");
  analyticsEnabled.value = false;
  showBanner.value = false;
}

function changePreference() {
  localStorage.removeItem(consentKey);
  analyticsEnabled.value = false;
  showBanner.value = true;
}

onMounted(() => {
  const savedConsent = localStorage.getItem(consentKey);
  analyticsEnabled.value = savedConsent === "granted";
  showBanner.value = !savedConsent;

  if (savedConsent === "granted") {
    grantAnalyticsConsent();
  }
});
</script>

<template>
  <div>
    <section
      v-if="showBanner"
      class="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-4xl border border-primary/15 bg-secondary p-5 text-primary shadow-2xl sm:p-6"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div class="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p class="font-ibmMono text-xs uppercase tracking-[0.2em] text-info">
            Privacy choice
          </p>
          <h2 class="mt-2 text-xl font-bold">Analytics cookies are optional.</h2>
          <p class="mt-2 text-sm leading-6 text-primary/70">
            I use essential storage for your theme choice. Google Analytics only
            loads if you accept analytics cookies. No advertising cookies are
            enabled.
          </p>
          <div class="mt-3 flex flex-wrap gap-3 text-xs text-primary/60">
            <NuxtLink to="/privacy/" class="underline underline-offset-4 hover:text-info">
              Privacy notice
            </NuxtLink>
            <NuxtLink to="/cookies/" class="underline underline-offset-4 hover:text-info">
              Cookie notice
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 lg:justify-end">
          <button
            class="border border-primary/15 px-4 py-3 font-ibmMono text-sm transition hover:border-info hover:text-info"
            @click="rejectAnalytics"
          >
            Reject analytics
          </button>
          <button
            class="bg-info px-4 py-3 font-ibmMono text-sm font-bold text-secondary transition hover:opacity-90"
            @click="acceptAnalytics"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </section>

    <button
      v-else
      class="fixed bottom-5 left-5 z-[60] border border-primary/15 bg-secondary px-3 py-2 font-ibmMono text-xs text-primary/70 shadow-lg transition hover:border-info hover:text-info"
      @click="changePreference"
    >
      Privacy settings
    </button>
  </div>
</template>
