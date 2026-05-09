<script lang="ts" setup>
import {definePageMeta} from "#imports";
import {useMetaTags} from "~/composeables/useMetaTags";
import {useJsonLd} from "~/composeables/useJsonLd";

definePageMeta({
  title: 'Blogs'
})

useMetaTags()
useJsonLd()
</script>

<template>
    <div class="h-screen text-primary w-full flex items-center justify-center">Work in porgress !</div>
</template>