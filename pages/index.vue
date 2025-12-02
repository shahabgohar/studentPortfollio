<script setup lang="ts">
import { ref } from 'vue'
import helper from '../utils/helper'
import { definePageMeta } from '#imports'
import Navbar from '~/components/Navbar.vue'
import { useMetaTags } from '~/composeables/useMetaTags'
import LinkedIn from '~/components/svg/LinkedIn.vue'
import Skype from '~/components/svg/Skype.vue'
import Mail from '~/components/svg/Mail.vue'
import { experiences, skills, projects, aboutContent, education } from '~/data/portfolio'

definePageMeta({
    title: 'Portfolio'
})

const { gtag } = useGtag()

// SSR-ready
gtag('event', 'screen_view', {
    app_name: 'Shahab Portfolio',
    screen_name: 'Home'
})

useMetaTags()

const { scrollToTop } = helper

const contactOptions = [
    {
        title: 'Skype',
        link: 'https://join.skype.com/invite/ve8oN0kKdvXQ',
        icon: Skype
    },
    {
        title: 'LinkedIn',
        link: 'https://www.linkedin.com/in/shahabgohar/',
        icon: LinkedIn
    },
    {
        title: 'Mail',
        link: 'https://mail.google.com/mail/?view=cm&source=mailto&to=shahab.developer.work@gmail.com',
        icon: Mail
    }
]

const showFloatBtnFlg = ref(false)

function main() {
    documentScroll()
    document.onscroll = documentScroll
}

let scrollTimeout: ReturnType<typeof setTimeout> | null = null

function documentScroll() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout)
    }

    scrollTimeout = setTimeout(() => {
        const element = document.getElementById('Skills')
        const clientRect = element?.getBoundingClientRect()
        showFloatBtnFlg.value = (clientRect?.top || 0) < 252
    }, 500)
}

function downloadResume() {
    window.location.href = 'https://drive.google.com/uc?export=download&id=1pUIfIs_9DQdnjHNHx6SplDCkdvGT8jo9'
}

onMounted(main)
</script>

<template>
    <div class="w-full flex flex-col max-sm:px-5 max-md:px-7 max-lg:px-12 px-28 pb-20 gap-y-10 text-primary max-w-[1440px] mx-auto relative z-10">
        <!-- Floating scroll to top button -->
        <div
            v-if="showFloatBtnFlg"
            class="max-sm:w-12 max-sm:h-12 cosmic-border-glow animate-bounce fixed right-6 bottom-6 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer z-50 cosmic-glow-hover transition-all duration-300"
            @click="scrollToTop"
        >
            <Icon class="max-sm:w-7 max-sm:h-7 w-10 h-10 text-nebula-pink" name="mdi:rocket-launch" />
        </div>

        <!-- Hero Section -->
        <div class="relative h-screen" id="parent">
            <div class="w-full h-full top-0 left-0 flex items-center justify-center absolute">
                <Navbar />
                <div class="flex flex-col gap-y-9">
                    <div class="flex flex-col gap-2.5">
                        <div class="max-lg:text-2xl text-3xl font-ibmMono capitalize font-thin text-cosmic-cyan animate-float">I'm</div>
                        <div class="max-sm:text-5xl max-lg:text-7xl text-8xl capitalize font-normal leading-11 cosmic-text-glow" style="word-spacing: -1rem;">
                            Shahab Gohar
                        </div>
                        <div class="max-lg:text-lg text-xl font-ibmMono text-nebula-pink mt-2">
                            Full Stack Developer
                        </div>
                    </div>
                    <div class="w-full flex items-center justify-center">
                        <ui-button title="Download Resume" @click="downloadResume" icon-name="download" />
                    </div>
                    <div class="flex w-full space-x-9 justify-center items-center">
                        <link-button
                            v-for="(contactOption, index) in contactOptions"
                            :key="index"
                            v-bind="contactOption"
                        />
                    </div>
                </div>
                <div class="w-full absolute bottom-5 flex items-center justify-center flex-col mt-3">
                    <Icon name="solar:double-alt-arrow-down-line-duotone" class="animate-bounce text-nebula-pink" size="60px" />
                </div>
            </div>
        </div>

        <!-- Skills Section -->
        <page-section title="Skills" />
        <div class="max-md:grid-cols-1 max-md:gap-y-10 max-md:gap-x-0 max-lg:gap-x-24 w-full grid grid-cols-2 auto-rows-auto gap-x-32 h-fit">
            <!-- Topics -->
            <div class="max-md:justify-center max-md:gap-10 flex flex-col justify-between">
                <skill-entry
                    v-for="(skill, index) in skills"
                    :key="index"
                    :skill="skill"
                    :is-last="index + 1 === skills.length"
                />
            </div>
            <!-- Tech Stack -->
            <div class="max-md:justify-start w-full flex justify-end h-fit">
                <div class="max-md:px-6 max-md:py-2 w-full cosmic-border-glow rounded-lg flex self-end flex-col px-12 py-4 cosmic-glass">
                    <div class="max-md:gap-3 flex flex-col gap-6">
                        <div class="max-md:gap-3 flex flex-col gap-6">
                            <div class="max-md:text-2xl text-3xl font-bold cosmic-text-glow">Programming Languages</div>
                            <div class="max-md:gap-6 flex gap-12">
                                <svg-javascript class="hover:animate-float transition-transform" />
                                <svg-php class="hover:animate-float transition-transform" />
                                <svg-sql class="hover:animate-float transition-transform" />
                            </div>
                        </div>
                        <div class="max-md:gap-3 flex flex-col gap-6">
                            <div class="max-md:text-2xl text-3xl font-bold cosmic-text-glow">Frameworks</div>
                            <div class="max-md:gap-6 flex flex-wrap gap-12">
                                <svg-vue class="hover:animate-float transition-transform" />
                                <svg-react class="hover:animate-float transition-transform" />
                                <svg-alpine class="hover:animate-float transition-transform" />
                                <svg-nuxt class="hover:animate-float transition-transform" />
                                <svg-laravel class="hover:animate-float transition-transform" />
                                <svg-code-ignitor class="hover:animate-float transition-transform" />
                                <svg-vuetify class="hover:animate-float transition-transform" />
                                <svg-quasar class="hover:animate-float transition-transform" />
                                <svg-tailwind class="hover:animate-float transition-transform" />
                                <svg-bootstrap class="hover:animate-float transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Projects Section -->
        <page-section title="Projects" />
        <ProjectsSection :projects="projects" />

        <!-- Experience Section -->
        <page-section title="Experience" />
        <div class="max-lg:gap-5 w-full flex flex-col gap-10">
            <experience-entry
                v-for="(experience, index) in experiences"
                :key="index"
                :experience="experience"
                :is-last="index + 1 === experiences.length"
            />
        </div>

        <!-- Education Section -->
        <page-section title="Education" />
        <div class="flex justify-between items-start">
            <div class="flex gap-1 flex-col">
                <div class="uppercase font-bold">{{ education.institution }}</div>
                <div class="uppercase">
                    {{ education.degree }}
                    <span class="ml-5"><i>({{ education.period }})</i></span>
                </div>
                <div class="mt-3">Apart from academics, I also performed well in other areas:</div>
                <ul class="list-disc ml-6">
                    <li v-for="(achievement, index) in education.achievements" :key="index">
                        {{ achievement }}
                    </li>
                </ul>
            </div>
            <div class="hidden">
                <img alt="studying" src="/img/education.svg" />
            </div>
        </div>

        <!-- About Section -->
        <page-section title="About" />
        <div class="flex justify-between items-start gap-8 cosmic-glass p-6 rounded-lg">
            <div class="max-md:w-full flex flex-col gap-4">
                <h3 class="text-xl font-bold text-cosmic-cyan cosmic-text-glow">{{ aboutContent.headline }}</h3>
                <p class="max-w-2xl text-base font-normal leading-6 whitespace-pre-line opacity-90">
                    {{ aboutContent.bio }}
                </p>
                <ul class="list-none mt-4 space-y-2">
                    <li
                        v-for="(highlight, index) in aboutContent.highlights"
                        :key="index"
                        class="flex items-center gap-2"
                    >
                        <Icon name="mdi:star-four-points" class="text-nebula-pink" size="20" />
                        <span>{{ highlight }}</span>
                    </li>
                </ul>
            </div>
            <div class="max-md:hidden">
                <img class="max-w-max max-h-max rounded-lg cosmic-glow" src="/img/about.png" alt="About Shahab Gohar" />
            </div>
        </div>

        <!-- Connect CTA -->
        <div class="flex w-full justify-center items-center mt-10">
            <ui-button @click="scrollToTop" title="Connect" icon-name="mdi:rocket-launch" />
        </div>
    </div>
</template>
