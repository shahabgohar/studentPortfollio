<script setup lang="ts">
import type { Project } from '~/types'

interface Props {
    projects: Project[]
}

const props = defineProps<Props>()

const activeFilter = ref<string>('all')
const filters = ['all', 'web', 'mobile', 'ai']

const filteredProjects = computed(() => {
    if (activeFilter.value === 'all') {
        return props.projects
    }
    return props.projects.filter(p => p.category === activeFilter.value)
})
</script>

<template>
    <div class="w-full">
        <!-- Filter Buttons -->
        <div class="flex gap-3 mb-8 flex-wrap">
            <button
                v-for="filter in filters"
                :key="filter"
                :class="[
                    'px-4 py-2 text-sm uppercase tracking-wider rounded-full transition-all duration-300',
                    activeFilter === filter
                        ? 'bg-gradient-to-r from-nebula-pink to-nebula-purple text-white cosmic-glow'
                        : 'cosmic-border-glow hover:scale-105'
                ]"
                @click="activeFilter = filter"
            >
                {{ filter }}
            </button>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
                v-for="project in filteredProjects"
                :key="project.id"
                :project="project"
            />
        </div>

        <!-- Empty State -->
        <div
            v-if="filteredProjects.length === 0"
            class="text-center py-12 text-nebula-purple"
        >
            <Icon name="mdi:planet" size="48" class="mb-4 opacity-50 animate-orbit" />
            <p class="cosmic-text-glow">No projects found in this category.</p>
        </div>
    </div>
</template>
