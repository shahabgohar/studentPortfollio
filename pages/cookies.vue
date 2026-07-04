<script setup lang="ts">
definePageMeta({
  title: "Cookie Notice",
});

const siteUrl = "https://shahabgohar.dev";
const pageTitle = "Cookie Notice | Shahab Gohar";
const pageDescription =
  "Cookie notice for shahabgohar.dev, including essential storage and optional Google Analytics cookies.";

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: pageDescription },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: pageDescription },
    { property: "og:url", content: `${siteUrl}/cookies/` },
    { property: "og:type", content: "website" },
    { name: "robots", content: "index, follow" },
  ],
  link: [{ rel: "canonical", href: `${siteUrl}/cookies/` }],
});

const lastUpdated = "May 18, 2026";

const cookieRows = [
  {
    name: "shahab-analytics-consent",
    type: "Essential local storage",
    purpose: "Remembers whether analytics was accepted or rejected.",
    duration: "Until you clear site data or change the preference.",
  },
  {
    name: "_ga, _ga_*",
    type: "Optional analytics cookies",
    purpose: "Used by Google Analytics to measure aggregate site usage after consent.",
    duration: "Set by Google Analytics when analytics is accepted.",
  },
];
</script>

<template>
  <main class="min-h-screen bg-secondary text-primary">
    <article class="mx-auto w-full max-w-[900px] px-6 py-8 sm:px-10 lg:px-16">
      <nav class="flex items-center justify-between border-b border-primary/10 pb-5 font-ibmMono text-sm">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info">
          <Icon name="mdi:arrow-left" size="18" />
          Portfolio
        </NuxtLink>
        <NuxtLink to="/privacy/" class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info">
          Privacy notice
          <Icon name="mdi:file-document-outline" size="18" />
        </NuxtLink>
      </nav>

      <header class="border-b border-primary/10 py-12">
        <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">
          Cookie notice
        </p>
        <h1 class="mt-4 font-grotesk text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
          Cookies are optional unless they are needed.
        </h1>
        <p class="mt-5 text-sm text-primary/55">Last updated: {{ lastUpdated }}</p>
      </header>

      <div class="prose-content py-10">
        <section>
          <h2>Summary</h2>
          <p>
            This site uses essential browser storage to remember your privacy
            preference. Google Analytics cookies are optional and only load if
            you choose Accept analytics in the banner.
          </p>
        </section>

        <section>
          <h2>Cookies and storage used</h2>
          <div class="not-prose my-6 overflow-x-auto border border-primary/10">
            <table class="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead class="bg-primary/[0.06] font-ibmMono uppercase tracking-[0.14em] text-primary/60">
                <tr>
                  <th class="border-b border-primary/10 p-4">Name</th>
                  <th class="border-b border-primary/10 p-4">Type</th>
                  <th class="border-b border-primary/10 p-4">Purpose</th>
                  <th class="border-b border-primary/10 p-4">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in cookieRows"
                  :key="row.name"
                  class="border-b border-primary/10 last:border-b-0"
                >
                  <td class="p-4 font-semibold">{{ row.name }}</td>
                  <td class="p-4 text-primary/65">{{ row.type }}</td>
                  <td class="p-4 text-primary/65">{{ row.purpose }}</td>
                  <td class="p-4 text-primary/65">{{ row.duration }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Google Analytics</h2>
          <p>
            Google Analytics is configured in manual mode. The tracking script
            is not initialized until analytics consent is granted. Advertising
            storage, ad user data, and ad personalization are denied.
          </p>
          <p>
            If you reject analytics, the site remains usable and analytics
            cookies are not intentionally set by this site.
          </p>
        </section>

        <section>
          <h2>Changing your choice</h2>
          <p>
            Use the Privacy settings button at the bottom-left of the site to
            reopen the banner. You can also clear this site's browser data from
            your browser settings.
          </p>
        </section>
      </div>
    </article>
  </main>
</template>

<style scoped>
.prose-content {
  font-size: 1.0625rem;
  line-height: 1.9;
}

.prose-content section + section {
  margin-top: 2.5rem;
}

.prose-content h2 {
  margin-bottom: 1rem;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  line-height: 1.1;
}

.prose-content p {
  margin-top: 1rem;
  color: color-mix(in srgb, currentColor 72%, transparent);
}
</style>
