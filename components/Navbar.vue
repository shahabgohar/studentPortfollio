<script setup lang="ts">
import {type Ref, ref} from "vue";
import {useRouter} from "#imports";
import {INJECT_THEME_KEY, Theme} from "~/types";

const theme:Ref<Theme> |undefined = inject(INJECT_THEME_KEY)
const router = useRouter();
const navItems = ref([
  {
    name: 'About'
  },
  {
    name: 'Skills'
  },
  {
    name: 'Education'
  },
  {
    name: 'Experience'
  },
  {
    name: 'Blogs',
    icon: 'mdi:arrow-top-right-bold-box-outline'
  }
])
const myDrawer:Ref<HTMLInputElement | null> = ref<HTMLInputElement | null>(null)
const themeToggle = computed({
  get() {
    return theme?.value === Theme.LIGHT
  },
  set(newValue: boolean) {
    if (newValue) {
      theme!.value = Theme.LIGHT
    } else {
      theme!.value = Theme.DARK
    }
  }
})
function scrollToElement(elementId: string) {
  document.getElementById(elementId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  })
}

</script>

<template>
  <nav class="max-md:hidden w-full absolute top-8 left-0 flex items-center justify-end">
    <ul class="flex space-x-12 items-center justify-end cosmic-glass px-8 py-3 rounded-full">
      <li v-for="(item, index) in navItems" :key="index" class="flex items-center justify-center">
        <router-link v-if="item.name === 'Blogs'" to="/blogs" class="cursor-pointer hover:text-nebula-pink transition-colors duration-300">{{item.name}}</router-link>
        <a v-else class="cursor-pointer hover:text-nebula-pink transition-colors duration-300" @click.prevent="scrollToElement(item.name)">{{item.name }}</a>
        <Icon v-if="item?.icon" size="1.2em" :name="item?.icon" class="ml-1"></Icon>
      </li>
    </ul>
  </nav>
  <nav class="max-md:flex hidden h-10 w-full absolute top-4 left-0 items-center justify-end">
    <div class="drawer flex justify-end">
      <input id="my-drawer" ref="myDrawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- Page content here -->
        <label for="my-drawer" class="drawer-button cosmic-glass p-2 rounded-full cursor-pointer hover:cosmic-glow transition-all duration-300">
        <Icon name="mdi:format-list-bulleted" class="text-primary"></Icon>
        </label>
      </div>
      <div class="drawer-side z-[10000]">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full text-base-content" style="background: linear-gradient(180deg, #0c0c1d 0%, #2d1b4e 100%);">
          <li class="flex w-full justify-end flex-row">
            <button class="p-0 hover:text-nebula-pink transition-colors" @click.prevent="myDrawer?.click()">
              <Icon name="ic:outline-cancel" size="22px"></Icon>
            </button>
          </li>
          <!-- Sidebar content here -->
          <li v-for="(item, index) in navItems" :key="index" class="flex flex-row justify-start py-2">
            <a v-if="item.name === 'Blogs'" class="cursor-pointer hover:text-nebula-pink transition-colors w-full border-b border-nebula-purple/30 pb-2" @click.prevent="() => (myDrawer?.click(),router.push('/blogs'))">{{item.name }}</a>
            <a v-else class="cursor-pointer hover:text-nebula-pink transition-colors w-full border-b border-nebula-purple/30 pb-2" @click.prevent="() => {myDrawer?.click(),scrollToElement(item.name)}">{{item.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>