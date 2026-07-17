<script setup lang="ts">
// Post-booking confirmation page. Cal.com redirects here after a successful
// booking ("Redirect on booking" in the event type's Advanced settings).
// Used as the conversion page for ad campaigns, keep it out of search.
const calBookingUrl = "https://cal.com/shahabgohar/build-discussion";

useHead({
  title: "Call booked | Shahab Gohar",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

onMounted(() => {
  if (localStorage.getItem("shahab-analytics-consent") === "granted") {
    const { gtag } = useGtag();
    gtag("event", "booking_confirmed", {
      app_name: "Shahab Portfolio",
      screen_name: "Thanks",
    });
  }
});
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-secondary px-6 py-12 font-inter text-primary">
    <div class="w-full max-w-xl rounded-3xl border border-info/40 bg-info/[0.06] p-8 text-center sm:p-12">
      <span class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-info/15 text-info">
        <Icon name="mdi:calendar-check" size="30" />
      </span>
      <h1 class="mt-6 font-grotesk text-3xl font-bold tracking-tight sm:text-4xl">
        Your call is booked.
      </h1>
      <p class="mt-4 text-lg leading-8 text-primary/65">
        You'll get a calendar invite with the video link by email. I read your
        booking answers before we talk, so we start at the process you flagged
        instead of at zero.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 rounded-xl border border-primary/15 px-5 py-3 font-medium transition hover:border-info hover:text-info"
        >
          Back to the site
        </NuxtLink>
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 rounded-xl bg-info px-5 py-3 font-semibold text-secondary transition hover:opacity-90"
        >
          See what I've built
          <Icon name="mdi:arrow-right" size="18" />
        </NuxtLink>
      </div>

      <figure class="mt-10 border-t border-primary/15 pt-8 text-left">
        <blockquote class="leading-7 text-primary/80">
          &ldquo;Proactive, communicative, and deeply committed to the best
          result. A true star who will fight for your success.&rdquo;
        </blockquote>
        <figcaption class="mt-4 flex items-center gap-3">
          <span
            class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-info/15 font-grotesk text-sm font-semibold uppercase text-info"
            >M</span
          >
          <div>
            <p class="text-sm font-medium">michaelh622, Germany</p>
            <p class="text-[12.5px] text-primary/50">
              One of 35+ five-star reviews, 5.0 average
            </p>
          </div>
        </figcaption>
      </figure>
    </div>
  </main>
</template>
