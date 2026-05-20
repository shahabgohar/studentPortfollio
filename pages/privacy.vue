<script setup lang="ts">
definePageMeta({
  title: "Privacy Notice",
});

const siteUrl = "https://shahabgohar.dev";
const pageTitle = "Privacy Notice | Shahab Gohar";
const pageDescription =
  "Privacy notice for shahabgohar.dev, including analytics consent, contact data, retention, and visitor rights.";

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: pageDescription },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: pageDescription },
    { property: "og:url", content: `${siteUrl}/privacy` },
    { property: "og:type", content: "website" },
    { name: "robots", content: "index, follow" },
  ],
  link: [{ rel: "canonical", href: `${siteUrl}/privacy` }],
});

const lastUpdated = "May 18, 2026";
</script>

<template>
  <main class="min-h-screen bg-secondary text-primary">
    <article class="mx-auto w-full max-w-[900px] px-6 py-8 sm:px-10 lg:px-16">
      <nav class="flex items-center justify-between border-b border-primary/10 pb-5 font-ibmMono text-sm">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info">
          <Icon name="mdi:arrow-left" size="18" />
          Portfolio
        </NuxtLink>
        <NuxtLink to="/cookies" class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info">
          Cookie notice
          <Icon name="mdi:cookie-outline" size="18" />
        </NuxtLink>
      </nav>

      <header class="border-b border-primary/10 py-12">
        <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">
          Privacy notice
        </p>
        <h1 class="mt-4 font-oswald text-5xl font-black uppercase leading-none sm:text-6xl">
          How this site handles personal data.
        </h1>
        <p class="mt-5 text-sm text-primary/55">Last updated: {{ lastUpdated }}</p>
      </header>

      <div class="prose-content py-10">
        <section>
          <h2>Who controls this website?</h2>
          <p>
            This website is operated by Shahab Gohar. For privacy questions,
            requests, or concerns, contact:
            <a href="mailto:shahab.developer.work@gmail.com">shahab.developer.work@gmail.com</a>.
          </p>
          <p>
            This notice is written for a small professional portfolio website.
            It is not a substitute for legal advice, but it explains the current
            data handling choices made on this site.
          </p>
        </section>

        <section>
          <h2>What data is collected?</h2>
          <ul>
            <li>
              <strong>Essential local preference:</strong> your analytics
              consent choice is stored in your browser so the banner does not
              repeatedly appear.
            </li>
            <li>
              <strong>Analytics data, only if accepted:</strong> Google
              Analytics may process page views, device/browser information,
              approximate location, referrer, and interaction data.
            </li>
            <li>
              <strong>Email contact data:</strong> if you email me, I receive
              the information you choose to send, such as your name, email
              address, company, project details, and message content.
            </li>
            <li>
              <strong>External profile links:</strong> if you open LinkedIn,
              Skype, SuiteCRM Store, or other third-party links, those services
              process data under their own privacy terms.
            </li>
          </ul>
        </section>

        <section>
          <h2>Why is the data used?</h2>
          <ul>
            <li>To remember your privacy choice on this website.</li>
            <li>To understand general site usage if you consent to analytics.</li>
            <li>To reply to project inquiries and professional messages.</li>
            <li>To keep basic business records related to client communication.</li>
          </ul>
        </section>

        <section>
          <h2>Legal bases</h2>
          <p>
            Analytics is based on your consent. You can reject analytics and
            still use the site. Professional email communication is handled to
            respond to your request or take steps before a possible contract.
            Some records may be kept where needed for legitimate business,
            accounting, or legal reasons.
          </p>
        </section>

        <section>
          <h2>Cookies and analytics</h2>
          <p>
            Google Analytics is configured to load manually only after you
            accept analytics cookies. Advertising storage and personalization
            are disabled. You can reopen the banner using the Privacy settings
            button and change your choice.
          </p>
          <p>
            More detail is available in the
            <NuxtLink to="/cookies">cookie notice</NuxtLink>.
          </p>
        </section>

        <section>
          <h2>Retention</h2>
          <p>
            Your local consent choice remains in your browser until you change
            it, clear site data, or remove browser storage. Email messages are
            kept only as long as needed for communication, project context,
            business records, or legal obligations.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>
            Depending on where you live, including if you are in the European
            Economic Area or the United Kingdom, you may have rights to access,
            correct, delete, restrict, object to, or receive a copy of your
            personal data. You may also withdraw consent for analytics at any
            time.
          </p>
          <p>
            To make a request, email
            <a href="mailto:shahab.developer.work@gmail.com">shahab.developer.work@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2>International processing</h2>
          <p>
            This website may be viewed internationally. If you contact me or
            accept analytics, your data may be processed outside your country,
            including by email, hosting, and analytics providers. I aim to keep
            collection minimal and avoid unnecessary tracking.
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

.prose-content ul {
  margin-top: 1.5rem;
  display: grid;
  gap: 0.9rem;
  padding-left: 1.25rem;
  list-style: disc;
  color: color-mix(in srgb, currentColor 74%, transparent);
}

.prose-content li::marker,
.prose-content a {
  color: var(--fallback-in, oklch(var(--in)));
}
</style>
