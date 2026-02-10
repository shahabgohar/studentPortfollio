<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { type Experience, type Skill } from '../types'
  import helper from '../utils/helper'
  import { definePageMeta } from "#imports"
  import Navbar from "~/components/Navbar.vue"
  import { useMetaTags } from "~/composeables/useMetaTags"
  import { useHeroAnimation } from "~/composeables/useHeroAnimation"
  import LinkedIn from "~/components/svg/LinkedIn.vue"
  import Skype from "~/components/svg/Skype.vue"
  import Mail from "~/components/svg/Mail.vue"

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
  const router = useRouter()
  const {scrollToTop} = helper

  const experiences:Ref<Array<Experience>> = ref([
    {
      startDate: 'Jul2024',
      endDate: 'Present',
      companyName: 'Esper Solutions',
      designation: 'Software Engineer',
      roleSummary: `Working on customising open-source packages according to client needs. Developed Gen AI products for my company.`
    },
    {
      startDate: 'May2023',
      endDate: 'Feb2024',
      companyName: 'CTO Gmbh',
      designation: 'Freelance frontend Developer',
      roleSummary: `Worked on 2 web projects and 1 hybrid mobile App. I worked on nuxt, tailwindcss, typescript and ionic`
    },
    {
      startDate: 'Nov2021',
      endDate: 'May2023',
      companyName: 'Motocle',
      designation: 'Full Stack Web Developer',
      roleSummary: `I was presented with a great opportunity to work with Moto and his team.
          I worked on frontend development where i put my best efforts to develop UI according
          to the requirements, api development using Laravel, api integration, bug fixing and
          providing creative solutions that solves client problems. Feedback from Moto and his
          team also helped me to improve alot.`
    },
    {
      startDate: '2020',
      endDate: 'Present',
      companyName: 'Freelancer on Fiverr',
      designation: 'Full Stack Web Developer',
      roleSummary: `I happened to come across with some amazing personalities on Fiverr,
      that allowed me to work on their projects. I mostly worked on Fronted, using Vuejs.
      Using capacitor technology, I also helped small business holders and developed small
      hybrid applications for mobiles for them `
    },
    {
      startDate: 'July2019',
      endDate: 'Aug2019',
      companyName: 'Fatima Sugar Mills',
      designation: 'Database Developer Internee',
      roleSummary: `I had the opportunity to work with Oracle tools such as Oracle Report builder,
      Bi publisher. I learned about SQL, PL/SQL. Mr, Muhammad Ajmal helped me a lot.
      After that internship, I felt confident enough to work on real world projects.`
    }
  ])

  const contactOptions = [
    {
      title: 'Skype',
      link: 'https://join.skype.com/invite/ve8oN0kKdvXQ',
      icon: Skype,
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

  const skills:Ref<Array<Skill>> = ref([
    {
      firstName: 'Frontend',
      lastName: 'Development',
      description: 'Constantly staying updated with the latest trends and best practices in frontend development, I strive to deliver intuitive and user-friendly interfaces that leave a lasting impact.'
    },
    {
      firstName: 'Backend',
      lastName: 'Development',
      description: `
      Backed by extensive experience and a deep understanding of backend development, I am skilled in designing and building robust and scalable server-side applications.
              Leveraging my problem-solving abilities and attention to detail, I thrive in delivering innovative solutions that meet the unique requirements of each project.
      `
    }
  ])

  // Hero animation refs
  const heroGreeting = ref<HTMLElement | null>(null)
  const heroName = ref<HTMLElement | null>(null)
  const heroTagline = ref<HTMLElement | null>(null)
  const heroButtons = ref<HTMLElement | null>(null)
  const heroSocials = ref<HTMLElement | null>(null)
  const heroScrollArrow = ref<HTMLElement | null>(null)

  // Section animation refs
  const skillsGrid = ref<HTMLElement | null>(null)
  const techStack = ref<HTMLElement | null>(null)
  const educationContent = ref<HTMLElement | null>(null)
  const aboutContent = ref<HTMLElement | null>(null)

  // Hero entrance animation
  useHeroAnimation({
    greeting: heroGreeting,
    name: heroName,
    tagline: heroTagline,
    buttons: heroButtons,
    socials: heroSocials,
    scrollArrow: heroScrollArrow
  })

  function scrollToSection(id: string) {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const showFloatBtnFlg:any = ref(false)
  function main() {
    documentScroll()
    document.onscroll = documentScroll

    // Scroll-triggered section animations
    nextTick(() => {
      if (skillsGrid.value) {
        gsap.from(skillsGrid.value, {
          opacity: 0, y: 40, duration: 0.8,
          scrollTrigger: { trigger: skillsGrid.value, start: 'top 80%', toggleActions: 'play none none none' }
        })
      }

      if (techStack.value) {
        gsap.from(techStack.value, {
          opacity: 0, x: 60, duration: 0.9,
          scrollTrigger: { trigger: techStack.value, start: 'top 80%', toggleActions: 'play none none none' }
        })
      }

      if (educationContent.value) {
        gsap.from(educationContent.value, {
          opacity: 0, y: 30, duration: 0.7,
          scrollTrigger: { trigger: educationContent.value, start: 'top 80%', toggleActions: 'play none none none' }
        })
      }

      if (aboutContent.value) {
        gsap.from(aboutContent.value, {
          opacity: 0, y: 30, duration: 0.7,
          scrollTrigger: { trigger: aboutContent.value, start: 'top 80%', toggleActions: 'play none none none' }
        })
      }
    })
  }

  let scrollTimeout:any = null
  function documentScroll() {

    if(!scrollTimeout) {
      scrollTimeout = null
    }

    scrollTimeout = setTimeout(() => {
      const element = document.getElementById('Skills')
      const clientRect:DOMRect | undefined = element?.getBoundingClientRect()
      if((clientRect?.top || 0) < 252) {
        showFloatBtnFlg.value = true
      } else {
          showFloatBtnFlg.value = false
      }

    }, 500)
  }

  function downloadResume() {
    window.location.href = 'https://drive.google.com/uc?export=download&id=1opWa3so3SMCEhrpaf1toeKijugCIYlpY'
  }

  onMounted(main)

  onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })
</script>

<template>

    <div class="w-full flex flex-col max-sm:px-5 max-md:px-7 max-lg:px-12 px-28 pb-20 gap-y-10 bg-secondary text-primary max-w-[1440px] mx-auto" >
      <div  v-if="showFloatBtnFlg" class=" max-sm:w-12 max-sm:h-12 bg-secondary animate-bounce fixed right-6 bottom-6 w-16 h-16 border-2  rounded-full flex drop-shadow-sm items-center justify-center cursor-pointer" @click="scrollToTop">
        <Icon class="max-sm:w-7 max-sm:h-7 w-10 h-10 bg-secondary" color="text-primary" name="mdi:arrow-up"></Icon>
    </div>
      <!-- Hero section with Matrix Rain -->
      <div class="relative h-screen" id="parent">
        <MatrixRain />
        <div class="w-full h-full top-0 left-0 absolute flex flex-col">
          <!-- navbar -->
          <Navbar></Navbar>
          <!-- hero content: split layout -->
          <div class="flex-1 flex items-center max-md:justify-center">
            <div class="max-md:flex-col max-md:items-center max-md:text-center flex items-center justify-between w-full gap-8">
              <!-- Left side: text content -->
              <div class="max-md:items-center flex flex-col gap-y-6">
                <div class="flex flex-col gap-1">
                  <div ref="heroGreeting" class="max-lg:text-xl text-2xl font-ibmMono font-thin text-silver">Hello, I'm</div>
                  <div ref="heroName" class="max-sm:text-5xl max-lg:text-7xl text-8xl capitalize font-bold leading-11" style="word-spacing: -1rem;">Shahab Gohar</div>
                  <div ref="heroTagline" class="max-lg:text-lg text-xl font-ibmMono text-info mt-2">Software Engineer</div>
                </div>
                <div ref="heroButtons">
                  <ui-button :title="'Download Resume'" @click="downloadResume" :icon-name="'download'"></ui-button>
                </div>
                <!-- Social links -->
                <div ref="heroSocials" class="flex space-x-6 items-center">
                  <link-button v-for="(contactOption, index) in contactOptions" :key="index" v-bind="contactOption"></link-button>
                </div>
              </div>
              <!-- Right side: visual area for Matrix Rain emphasis -->
              <div class="max-md:hidden w-1/3 flex items-center justify-center">
                <div class="text-primary font-mono text-xs leading-tight opacity-30 whitespace-pre select-none" style="font-size: 10px; line-height: 12px;">{{ `
  ╔══════════════════════╗
  ║  > shahab.dev        ║
  ║                      ║
  ║  const skills = {    ║
  ║    languages: [      ║
  ║      'JavaScript',   ║
  ║      'Python',       ║
  ║      'PHP', 'SQL'    ║
  ║    ],                ║
  ║    frameworks: [     ║
  ║      'Vue', 'Nuxt',  ║
  ║      'React',        ║
  ║      'Laravel'       ║
  ║    ],                ║
  ║    automation: [     ║
  ║      'CI/CD',        ║
  ║      'Scripting',    ║
  ║      'Testing'       ║
  ║    ],                ║
  ║    passion:          ║
  ║      'building       ║
  ║       things that    ║
  ║       matter'        ║
  ║  }                   ║
  ║                      ║
  ║  > _                 ║
  ╚══════════════════════╝
`.trim() }}</div>
              </div>
            </div>
          </div>
          <!-- Scroll indicator -->
          <div ref="heroScrollArrow" class="w-full flex items-center justify-center flex-col pb-6">
            <span class="text-xs text-silver font-ibmMono mb-1">Scroll to explore</span>
            <Icon name="solar:double-alt-arrow-down-line-duotone" size="40px"></Icon>
          </div>
        </div>
      </div>

      <!-- skills section -->
      <page-section title="Skills"></page-section>
      <div class="max-md:grid-cols-1 max-md:gap-y-10 max-md:gap-x-0 max-lg:gap-x-24 w-full grid grid-cols-2 auto-rows-auto gap-x-32 h-fit ">
        <!-- topics -->
        <div ref="skillsGrid" class="max-md:justify-center max-md:gap-10 flex flex-col justify-between">
          <skill-entry
          v-for="(skill,index) in skills"
          :key="index"
          :skill="skill"
          :is-last="index + 1 === skills.length">
          </skill-entry>
        </div>
        <!-- tech stack -->
        <div ref="techStack" class="max-md:justify-start w-full flex justify-end h-fit">
          <div class="max-md:px-6 max-md:py-2 w-full border-2 border-primary flex self-end flex-col px-12 py-4">
            <div class="max-md:gap-3 flex flex-col gap-6">
            <div class="max-md:gap-3 flex flex-col gap-6">
              <div class="max-md:text-2xl text-3xl font-bold">Programming Languages</div>
              <div class="max-md:gap-6 flex gap-12">
                <div class="skill-icon"><svg-javascript></svg-javascript></div>
                <div class="skill-icon"><svg-python></svg-python></div>
                <div class="skill-icon"><svg-php></svg-php></div>
                <div class="skill-icon"><svg-sql></svg-sql></div>
              </div>
            </div>
            <div class="max-md:gap-3 flex flex-col gap-6">
              <div class="max-md:text-2xl text-3xl font-bold">Frameworks</div>
              <div class="max-md:gap-6 flex flex-wrap gap-12">
                <div class="skill-icon"><svg-vue></svg-vue></div>
                <div class="skill-icon"><svg-react></svg-react></div>
                <div class="skill-icon"><svg-alpine></svg-alpine></div>
                <div class="skill-icon"><svg-nuxt></svg-nuxt></div>
                <div class="skill-icon"><svg-laravel></svg-laravel></div>
                <div class="skill-icon"><svg-code-ignitor></svg-code-ignitor></div>
                <div class="skill-icon"><svg-vuetify></svg-vuetify></div>
                <div class="skill-icon"><svg-quasar></svg-quasar></div>
                <div class="skill-icon"><svg-tailwind></svg-tailwind></div>
                <div class="skill-icon"><svg-bootstrap></svg-bootstrap></div>
                <div class="skill-icon"><svg-automation></svg-automation></div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <!-- Experience -->
      <page-section title="Experience"></page-section>
      <div class="max-lg:gap-5 w-full flex flex-col gap-10">
        <experience-entry
        v-for="(experience, index) in experiences"
        :key="index"
        :experience="experience"
        :is-last="index+1 === experiences.length"></experience-entry>
      </div>
      <!-- education -->
      <page-section title="Education"></page-section>
      <div ref="educationContent" class="flex justify-between items-start">
        <div class="flex gap-1 flex-col">
          <div class="uppercase">University of engineering and Technology, Taxila</div>
          <div class="uppercase">Software Engineering <span class="ml-5"><i>(2017-2021)</i></span></div>
          <div class="mt-3">Apart from achademics, I also performed well in other areas:</div>
          <ul class="list-disc ml-6">
            <li>With bunch of friends, we won Hackathon in 2019 hosted at Air University, Islamabad</li>
            <li>Joined Softdesk Society for extra currical activities</li>
            <li>Contributed for hosting many events and workshops, and acquired the position of Head of Graphics</li>
          </ul>
        </div>
        <div class="hidden">
          <img alt="studying" src="/img/education.svg">
        </div>
      </div>

      <!-- About -->
      <page-section title="About"></page-section>
      <div ref="aboutContent" class="flex justify-between items-center gap-8">
        <div class="max-md:w-full max-w-2xl text-base font-normal leading-5">
          I am a highly skilled Full Stack Web Developer with expertise in Vue.js,
          Laravel, and building interactive web applications.
          With a strong focus on user experience,
          I am passionate about creating engaging and intuitive interfaces.
          My proactive and detail-oriented approach, along with excellent communication skills,
          allows me to deliver high-quality work that exceeds client expectations.
        </div>
        <div class="max-md:hidden">
          <AsciiImage src="/img/about.png" alt="Shahab Gohar" />
        </div>
      </div>
      <div class="flex w-full justify-center items-center">
          <ui-button @click="scrollToTop" :title="'Connect'" :icon-name="'mdi:arrow-up'"></ui-button>
    </div>

  </div>
</template>
