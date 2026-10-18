<script setup lang="ts">
// Privacy policy for the Reel Auto-Scroller Chrome extension. The Chrome Web
// Store listing links here, so the URL must stay stable. The text matches
// privacy-policy.html in the extension's repo; update both together.
definePageMeta({
  title: "Reel Auto-Scroller Privacy Policy",
});

const siteUrl = "https://shahabgohar.dev";
const pageUrl = `${siteUrl}/reel-auto-scroller/privacy-policy/`;
const pageTitle = "Reel Auto-Scroller Privacy Policy | Shahab Gohar";
const pageDescription =
  "Privacy policy for Reel Auto-Scroller, the Chrome extension that auto-advances reels and Shorts on YouTube, Instagram and Facebook. It collects no data.";

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: pageDescription },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: pageDescription },
    { property: "og:url", content: pageUrl },
    { property: "og:type", content: "website" },
    { name: "robots", content: "index, follow" },
  ],
  link: [{ rel: "canonical", href: pageUrl }],
});

const lastUpdated = "October 18, 2026";
</script>

<template>
  <main class="min-h-screen bg-secondary text-primary">
    <article class="mx-auto w-full max-w-[900px] px-6 py-8 sm:px-10 lg:px-16">
      <p class="flex justify-end font-ibmMono text-sm">
        <NuxtLink
          to="/reel-auto-scroller/"
          class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info"
        >
          Support
          <Icon name="ph:arrow-right" size="16" />
        </NuxtLink>
      </p>

      <header class="border-b border-primary/10 py-12">
        <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">
          Reel Auto-Scroller
        </p>
        <h1 class="mt-4 font-grotesk text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
          Privacy Policy
        </h1>
        <p class="mt-5 text-sm text-primary/65">Last updated: {{ lastUpdated }}</p>
      </header>

      <div class="prose-content py-10">
        <p class="lead">
          Reel Auto-Scroller is a Chrome extension that auto-advances reels and
          short videos on YouTube, Instagram, and Facebook. The short version of
          this policy: the extension does not collect anything about you.
        </p>

        <section>
          <h2>What the extension collects</h2>
          <p>
            Nothing. Reel Auto-Scroller does not collect, transmit, or sell any
            personal data. There are no analytics, no tracking, no accounts, and
            no servers. The developer never receives any information from your
            use of the extension.
          </p>
        </section>

        <section>
          <h2>What the extension stores</h2>
          <p>
            The only thing it saves is your own settings: whether it is on or
            off, which sites it is enabled for, how many times each reel should
            play before advancing, and whether debug logging is on. These are
            stored with Chrome's <code>storage</code> API. They live in your own
            browser, and if you are signed into Chrome they sync across your own
            devices through your Google account. They are never sent to the
            developer or to anyone else.
          </p>
        </section>

        <section>
          <h2>The permissions it uses</h2>
          <ul>
            <li>
              <strong>Storage</strong>: to remember the settings described above.
            </li>
            <li>
              <strong>Access to youtube.com, instagram.com, and facebook.com</strong>:
              the extension runs a small script on the reels and shorts feeds of
              these sites. It watches the playing video so it can tell when a reel
              has finished, then activates the site's own next control to move to
              the next one. It does not read, record, or transmit the content of
              those pages, your account, or your activity.
            </li>
          </ul>
        </section>

        <section>
          <h2>Data sharing and sale</h2>
          <p>
            There is none. No data is shared with third parties, and nothing is
            ever sold.
          </p>
        </section>

        <section>
          <h2>Remote code</h2>
          <p>
            The extension runs only the code shipped inside its package. It does
            not download or run any code from outside.
          </p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>
            If this policy changes, the updated version will be posted on this
            page with a new date.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about this policy or the extension can go to
            <a href="mailto:shahab.developer.work@gmail.com">shahab.developer.work@gmail.com</a>.
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

.prose-content .lead {
  margin-top: 0;
  font-size: 1.25rem;
  line-height: 1.7;
  color: currentColor;
}

.prose-content section {
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

.prose-content code {
  padding: 0.05em 0.35em;
  border-radius: 2px;
  background: rgb(var(--c-well));
  font-size: 0.92em;
}
</style>
