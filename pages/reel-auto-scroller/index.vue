<script setup lang="ts">
// Support page for the Reel Auto-Scroller Chrome extension, linked from its
// Chrome Web Store listing, so the URL must stay stable. The text matches
// support.html in the extension's repo; update both together.
definePageMeta({
  title: "Reel Auto-Scroller Support",
});

const siteUrl = "https://shahabgohar.dev";
const pageUrl = `${siteUrl}/reel-auto-scroller/`;
const pageTitle = "Reel Auto-Scroller Support | Shahab Gohar";
const pageDescription =
  "Help for Reel Auto-Scroller, the Chrome extension that auto-advances YouTube Shorts, Instagram Reels and Facebook Reels: settings, fixes and contact.";

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
</script>

<template>
  <main class="min-h-screen bg-secondary text-primary">
    <article class="mx-auto w-full max-w-[900px] px-6 py-8 sm:px-10 lg:px-16">
      <p class="flex justify-end font-ibmMono text-sm">
        <NuxtLink
          to="/reel-auto-scroller/privacy-policy/"
          class="inline-flex items-center gap-2 text-primary/75 transition hover:text-info"
        >
          Privacy policy
          <Icon name="ph:arrow-right" size="16" />
        </NuxtLink>
      </p>

      <header class="border-b border-primary/10 py-12">
        <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">
          Reel Auto-Scroller
        </p>
        <h1 class="mt-4 font-grotesk text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
          Support
        </h1>
      </header>

      <div class="prose-content py-10">
        <p class="lead">
          Need help with Reel Auto-Scroller? Here are the basics and how to reach me.
        </p>

        <section>
          <h2>What it does</h2>
          <p>
            It auto-advances to the next reel or short on YouTube Shorts,
            Instagram Reels, and Facebook Reels when the current one finishes,
            so they play hands-free while you work.
          </p>
        </section>

        <section>
          <h2>Using it</h2>
          <p>Click the toolbar icon to open the controls:</p>
          <ul>
            <li><strong>Master switch</strong>: turn the whole thing on or off.</li>
            <li>
              <strong>Per-site toggles</strong>: enable or disable YouTube,
              Instagram, or Facebook on their own.
            </li>
            <li>
              <strong>Play each reel N times</strong>: how many times a reel
              plays before it moves on.
            </li>
          </ul>
          <p>
            It only runs on the reel and shorts feeds, not your normal watch
            pages or feed. If you pause a reel to look at something, it waits
            instead of skipping ahead.
          </p>
        </section>

        <section>
          <h2>Troubleshooting</h2>
          <ul>
            <li>
              <strong>Nothing happens on a reel</strong>: make sure the master
              switch and that site are both on, then reload the tab so the
              extension can attach.
            </li>
            <li>
              <strong>It stopped advancing on one site</strong>: these sites
              change their layout from time to time. Turn on "Debug log in
              console" in the popup to see what it is doing, and watch for an
              update.
            </li>
            <li>
              <strong>It moves too fast</strong>: raise the "Play each reel"
              number so each reel plays more times before moving on.
            </li>
          </ul>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Email
            <a href="mailto:shahab.developer.work@gmail.com">shahab.developer.work@gmail.com</a>
            and I will get back to you.
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
</style>
