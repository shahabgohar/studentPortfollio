<script setup lang="ts">
// Post-booking confirmation page. Cal.com redirects here after a successful
// booking ("Redirect on booking" in the event type's Advanced settings).
// Used as the conversion page for ad campaigns — keep it out of search.
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
  <main class="grid min-h-screen place-items-center bg-secondary px-6 font-inter text-primary">
    <div class="w-full max-w-xl rounded-3xl border border-info/40 bg-info/[0.06] p-8 text-center sm:p-12">
      <span class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-info/15 text-info">
        <Icon name="mdi:calendar-check" size="30" />
      </span>
      <h1 class="mt-6 font-grotesk text-3xl font-bold tracking-tight sm:text-4xl">
        Your call is booked.
      </h1>
      <p class="mt-4 text-lg leading-8 text-primary/65">
        You'll get a calendar invite with the video link by email. To make the
        30 minutes count, have in mind the one manual process that eats the most
        of your team's time — we'll start there.
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
    </div>
  </main>
</template>
