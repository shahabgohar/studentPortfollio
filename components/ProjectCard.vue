<script setup lang="ts">
import type { Project } from '~/types'

interface Props {
    project: Project
}

defineProps<Props>()
</script>

<template>
    <article class="group relative overflow-hidden border-2 border-primary bg-secondary transition-all duration-300 hover:shadow-lg">
        <!-- Project Image -->
        <div class="aspect-video overflow-hidden bg-gray-100">
            <div class="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                <Icon name="mdi:image-outline" size="48" class="text-gray-400" />
            </div>
        </div>

        <!-- Content -->
        <div class="p-6">
            <div class="flex items-start justify-between mb-3 gap-2">
                <h3 class="text-xl font-bold leading-tight">{{ project.title }}</h3>
                <span class="text-xs uppercase tracking-wider text-info px-2 py-1 border border-info shrink-0">
                    {{ project.category }}
                </span>
            </div>

            <p class="text-sm leading-relaxed mb-4 opacity-80">
                {{ project.description }}
            </p>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mb-4">
                <span
                    v-for="tech in project.technologies.slice(0, 4)"
                    :key="tech"
                    class="px-2 py-1 text-xs border border-primary/50 bg-primary/5"
                >
                    {{ tech }}
                </span>
                <span
                    v-if="project.technologies.length > 4"
                    class="px-2 py-1 text-xs border border-primary/50 bg-primary/5"
                >
                    +{{ project.technologies.length - 4 }}
                </span>
            </div>

            <!-- Links -->
            <div class="flex gap-4 pt-2 border-t border-primary/20">
                <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1.5 text-sm hover:text-info transition-colors"
                >
                    <Icon name="mdi:open-in-new" size="16" />
                    Live Demo
                </a>
                <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1.5 text-sm hover:text-info transition-colors"
                >
                    <Icon name="mdi:github" size="16" />
                    Source
                </a>
            </div>
        </div>

        <!-- Featured Badge -->
        <div
            v-if="project.featured"
            class="absolute top-3 left-3 px-2 py-1 text-xs font-bold uppercase bg-info text-white"
        >
            Featured
        </div>
    </article>
</template>
