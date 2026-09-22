<script setup lang="ts">
const consentKey = "shahab-analytics-consent";
const showBanner = ref(false);
const analyticsEnabled = ref(false);

// The footer's "Privacy settings" link flips this to bring the banner back,
// which replaces the old floating button that sat on top of page content.
const reopenRequested = useState("cookie-banner-open", () => false);

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
  reopenRequested.value = false;
  grantAnalyticsConsent();
}

function rejectAnalytics() {
  // If analytics was already running this visit, withdraw consent now rather
  // than waiting for the next page load to stop loading it.
  if (analyticsEnabled.value) {
    const { gtag } = useGtag();
    gtag("consent", "update", { analytics_storage: "denied" });
  }
  localStorage.setItem(consentKey, "denied");
  analyticsEnabled.value = false;
  showBanner.value = false;
  reopenRequested.value = false;
}

watch(reopenRequested, (open) => {
  if (open) showBanner.value = true;
});

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
  <!-- A slim bar across the bottom edge. It used to be a card in the corner,
       which sat on top of the hero's "Book a call" button on a first visit. -->
  <section
    v-if="showBanner"
    class="fixed inset-x-0 bottom-0 z-[70] border-t border-primary bg-raised text-primary print:hidden"
    role="region"
    aria-label="Cookie consent"
  >
    <div class="hazard h-1" aria-hidden="true"></div>
    <div
      class="mx-auto flex w-full max-w-page flex-col gap-3 px-5 py-3.5 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-8"
    >
      <div class="min-w-0">
        <h2 class="wd-88 text-[0.9375rem] font-bold leading-5">Analytics cookies are optional.</h2>
        <p class="mt-1 text-[0.8125rem] leading-5 text-primary/75">
          I use essential storage for your theme choice. Google Analytics only
          loads if you accept analytics cookies. No advertising cookies are
          enabled.
          <NuxtLink to="/privacy/" class="underline underline-offset-2 hover:text-info">Privacy notice</NuxtLink>
          <span aria-hidden="true"> / </span>
          <NuxtLink to="/cookies/" class="underline underline-offset-2 hover:text-info">Cookie notice</NuxtLink>
        </p>
      </div>
      <div class="grid shrink-0 grid-cols-2 gap-2.5 md:flex">
        <button
          type="button"
          class="btn btn-line whitespace-nowrap !px-2 !py-3 !text-xs sm:!px-5"
          @click="rejectAnalytics"
        >
          Reject analytics
        </button>
        <button
          type="button"
          class="btn btn-ink whitespace-nowrap !px-2 !py-3 !text-xs sm:!px-5"
          @click="acceptAnalytics"
        >
          Accept analytics
        </button>
      </div>
    </div>
  </section>
</template>
