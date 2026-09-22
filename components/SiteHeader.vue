<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useTheme } from '~/composeables/useTheme'

// One header for every page. Besides consistency, it gives each inner page
// crawlable links to Services / Work / Blog instead of a lone "Home" arrow.
const calBookingUrl = 'https://cal.com/shahabgohar/build-discussion'

const links = [
  { label: 'Services', to: '/services/' },
  { label: 'Work', to: '/projects/' },
  { label: 'Pricing', to: '/#Pricing' },
  { label: 'Blog', to: '/blogs/' },
]

const { toggle } = useTheme()

// The mobile menu is a <details> so it opens before hydration with no JS.
// A bare <details> never closes itself though, so: tap outside, Escape, or a
// route change all close it.
const menu = ref<HTMLDetailsElement | null>(null)
const closeMenu = () => {
  if (menu.value) menu.value.open = false
}

const onPointerDown = (event: PointerEvent) => {
  const el = menu.value
  if (el?.open && !el.contains(event.target as Node)) closeMenu()
}

const onKeydown = (event: KeyboardEvent) => {
  const el = menu.value
  if (event.key !== 'Escape' || !el?.open) return
  closeMenu()
  el.querySelector('summary')?.focus()
}

const route = useRoute()
watch(() => route.fullPath, closeMenu)

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="site-header sticky top-0 z-40 border-b border-primary/15 bg-secondary print:hidden">
    <div class="mx-auto flex h-16 w-full max-w-page items-center justify-between gap-3 px-5 sm:px-8">
      <NuxtLink to="/" class="group flex items-center gap-2.5" @click="closeMenu">
        <span
          class="h-2.5 w-2.5 bg-hot transition-transform duration-300 group-hover:rotate-90 sm:h-3 sm:w-3"
          aria-hidden="true"
        ></span>
        <span class="display text-[1.2rem] leading-none sm:text-[1.4rem]">Shahab Gohar</span>
      </NuxtLink>

      <nav aria-label="Primary" class="hidden items-center gap-8 lg:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="label py-2 text-primary/70 transition-colors hover:text-primary"
          :active-class="link.to.includes('#') ? '' : '!text-primary underline decoration-hot decoration-2 underline-offset-[6px]'"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="hidden h-11 w-11 place-items-center border border-transparent text-primary/70 transition-colors hover:border-primary/20 hover:text-primary lg:grid"
          aria-label="Switch between light and dark theme"
          @click="toggle"
        >
          <Icon name="ph:moon" size="18" class="only-light" />
          <Icon name="ph:sun" size="18" class="only-dark" />
        </button>

        <a
          :href="calBookingUrl"
          target="_blank"
          rel="noreferrer"
          class="btn btn-ink !px-3.5 !py-3 !text-xs sm:!px-4"
        >
          Book a call
        </a>

        <details ref="menu" class="group/menu relative lg:hidden">
          <summary
            class="grid h-11 w-11 cursor-pointer list-none place-items-center border border-primary/25 text-primary [&::-webkit-details-marker]:hidden"
            aria-label="Menu"
          >
            <Icon name="ph:list" size="20" class="group-open/menu:hidden" />
            <Icon name="ph:x" size="20" class="hidden group-open/menu:block" />
          </summary>
          <div
            class="absolute right-0 top-[calc(100%+0.75rem)] w-60 border border-primary bg-secondary p-2 shadow-[6px_6px_0_rgb(var(--c-ink))]"
          >
            <nav aria-label="Mobile">
              <NuxtLink
                v-for="link in links"
                :key="link.to"
                :to="link.to"
                class="label flex items-center justify-between px-3 py-3.5 text-primary hover:bg-primary hover:text-secondary"
                @click="closeMenu"
              >
                {{ link.label }}
                <Icon name="ph:arrow-right" size="14" />
              </NuxtLink>
            </nav>
            <button
              type="button"
              class="label mt-1 flex w-full items-center justify-between border-t border-primary/15 px-3 py-3.5 text-primary/70 hover:text-primary"
              @click="toggle"
            >
              <span class="only-light">Dark theme</span>
              <span class="only-dark">Light theme</span>
              <Icon name="ph:moon" size="14" class="only-light" />
              <Icon name="ph:sun" size="14" class="only-dark" />
            </button>
          </div>
        </details>
      </div>
    </div>
  </header>
</template>
