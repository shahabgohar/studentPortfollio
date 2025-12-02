<script setup lang="ts">
import type { Project } from '~/types'

interface Props {
    project: Project
}

defineProps<Props>()
</script>

<template>
    <article class="group relative overflow-hidden cosmic-border-glow rounded-lg transition-all duration-300 hover:scale-[1.02] cosmic-glow-hover">
        <!-- Project Image -->
        <div class="aspect-video overflow-hidden">
            <div class="h-full w-full flex items-center justify-center bg-gradient-to-br from-space-purple/50 to-space-blue/50">
                <Icon name="mdi:rocket-launch" size="48" class="text-nebula-pink opacity-60" />
            </div>
        </div>

        <!-- Content -->
        <div class="p-6 cosmic-glass">
            <div class="flex items-start justify-between mb-3 gap-2">
                <h3 class="text-xl font-bold leading-tight cosmic-text-glow">{{ project.title }}</h3>
                <span class="text-xs uppercase tracking-wider text-cosmic-cyan px-2 py-1 border border-cosmic-cyan/50 shrink-0 rounded">
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
                    class="px-2 py-1 text-xs border border-nebula-purple/50 bg-nebula-purple/10 rounded"
                >
                    {{ tech }}
                </span>
                <span
                    v-if="project.technologies.length > 4"
                    class="px-2 py-1 text-xs border border-nebula-purple/50 bg-nebula-purple/10 rounded"
                >
                    +{{ project.technologies.length - 4 }}
                </span>
            </div>

            <!-- Links -->
            <div class="flex gap-4 pt-2 border-t border-nebula-purple/30">
                <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1.5 text-sm hover:text-nebula-pink transition-colors"
                >
                    <Icon name="mdi:open-in-new" size="16" />
                    Live Demo
                </a>
                <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1.5 text-sm hover:text-nebula-pink transition-colors"
                >
                    <Icon name="mdi:github" size="16" />
                    Source
                </a>
            </div>
        </div>

        <!-- Featured Badge -->
        <div
            v-if="project.featured"
            class="absolute top-3 left-3 px-2 py-1 text-xs font-bold uppercase bg-gradient-to-r from-nebula-pink to-nebula-purple text-white rounded animate-pulse-glow"
        >
            Featured
        </div>
    </article>
</template>
