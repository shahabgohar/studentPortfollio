<script lang="ts" setup>
interface Props {
  title: string
  link: string
  icon: any
}
const props = defineProps<Props>()
</script>

<template>
    <a
    :href="props.link"
    target="blank"
    :aria-label="`contact via ${props.title}`"
    class="max-sm:w-12 max-sm:h-12 max-lg:w-16 max-lg:h-16 w-20 h-20 cosmic-border-glow flex justify-center items-center rounded-full transition-all duration-300 hover:scale-110 cosmic-glow-hover animate-float"
    :style="{ animationDelay: `${Math.random() * 2}s` }">
      <span class="max-sm:w-6 max-sm:h-6 max-lg:w-9 max-lg:h-9 h-11 w-11">
      <component :is="props.icon"></component>
      </span>
    </a>
</template>