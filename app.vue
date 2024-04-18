<script lang="ts" setup>

const titleSuffix = 'Shahab'
const titleSeparator = '|'
const faviconVersion = '0.0.2'

const route = useRoute()
const getTitle = (customTitle?: string) => {
  const title = customTitle || route.meta.title
  return title ? `${title} ${titleSeparator} ${titleSuffix}` : titleSuffix
}


useHead({
  titleTemplate: (chunk) => getTitle(chunk),
  meta: [
    { name: 'description', content: 'Shahab' },
    { property: 'og:title', content: getTitle() },
    { property: 'og:description', content: 'Shahab' },
    { name: 'theme-color', content: '#ffffff' }
  ],
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: `/favicon/apple-touch-icon.png?v=${faviconVersion}`
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: `/favicon/favicon-32x32.png?v=${faviconVersion}`
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: `/favicon/favicon-16x16.png?v=${faviconVersion}`
    },
    {
      rel: 'manifest',
      href: `/favicon/site.webmanifest?v=${faviconVersion}`
    },
    {
      rel: 'mask-icon',
      color: '#5bbad5',
      href: `/favicon/safari-pinned-tab.svg?v=${faviconVersion}`
    },
    {
      rel: 'shortcut icon',
      href: `/favicon/favicon.ico?v=${faviconVersion}`
    }
  ]
})
</script>

<template>
  <div>
    
  </div>
  <NuxtPage />
</template>
