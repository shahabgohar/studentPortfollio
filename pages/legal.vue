<script setup lang="ts">
definePageMeta({
  title: "Legal Notice",
});

const siteUrl = "https://shahabgohar.dev";
const pageTitle = "Legal Notice | Shahab Gohar";
const pageDescription =
  "Legal notice for shahabgohar.dev: who operates this website and how to reach them.";

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: pageDescription },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: pageDescription },
    { property: "og:url", content: `${siteUrl}/legal/` },
    { property: "og:type", content: "website" },
    { name: "robots", content: "index, follow" },
  ],
  link: [{ rel: "canonical", href: `${siteUrl}/legal/` }],
});

// The operator's details exactly as he supplied them. Confirm the address
// formatting with him before changing a character of it.
const operator = {
  legalName: "Muhammad Shahab Ud Din Gohar",
  tradingAs: "Shahab Gohar",
  addressLines: ["House 484, D-Block", "Shah Rukn-e-Alam Colony", "Multan, Pakistan"],
  email: "shahab.developer.work@gmail.com",
};

const lastUpdated = "September 22, 2026";
</script>

<template>
  <main class="min-h-screen bg-secondary text-primary">
    <article class="mx-auto w-full max-w-[900px] px-6 py-8 sm:px-10 lg:px-16">
      <header class="border-b border-primary/10 py-12">
        <p class="font-ibmMono text-sm uppercase tracking-[0.24em] text-info">Legal notice</p>
        <h1 class="mt-4 font-grotesk text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
          Who operates this website.
        </h1>
        <p class="mt-5 text-sm text-primary/65">Last updated: {{ lastUpdated }}</p>
      </header>

      <div class="grid gap-10 py-10 text-[1.0625rem] leading-8">
        <section>
          <h2 class="font-grotesk text-3xl font-bold">Operator and responsible for content</h2>
          <address class="mt-4 not-italic text-primary/80">
            {{ operator.legalName }} (trading as {{ operator.tradingAs }})<br />
            <template v-for="line in operator.addressLines" :key="line">{{ line }}<br /></template>
          </address>
        </section>

        <section>
          <h2 class="font-grotesk text-3xl font-bold">Contact</h2>
          <p class="mt-4 text-primary/80">
            Email:
            <a :href="`mailto:${operator.email}`" class="text-info underline underline-offset-4">{{ operator.email }}</a>
          </p>
        </section>

        <section>
          <h2 class="font-grotesk text-3xl font-bold">Related notices</h2>
          <p class="mt-4 text-primary/80">
            How personal data is handled is described in the
            <NuxtLink to="/privacy/" class="text-info underline underline-offset-4">privacy notice</NuxtLink>
            and the
            <NuxtLink to="/cookies/" class="text-info underline underline-offset-4">cookie notice</NuxtLink>.
          </p>
        </section>
      </div>
    </article>
  </main>
</template>
