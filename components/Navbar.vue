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
    <ul class="flex space-x-12 items-center justify-end">

      <li v-for="(item, index) in navItems" :key="index" class="flex items-center justify-center">
        <router-link v-if="item.name === 'Blogs'" to="/blogs" class="cursor-pointer">{{item.name}}</router-link>
        <a v-else class="cursor-pointer"  @click.prevent="scrollToElement(item.name)">{{item.name }}</a>
        <Icon v-if="item?.icon" size="1.2em" :name="item?.icon"></Icon>
      </li>
      <li class="flex items-center justify-center">
        <label class="swap swap-rotate">

          <input type="checkbox" v-model="themeToggle" class="theme-controller"  />

          <!-- sun icon -->
          <svg class="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>

          <!-- moon icon -->
          <svg class="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>

        </label>
      </li>
    </ul>
  </nav>
  <nav class="max-md:flex hidden h-10 w-full absolute top-4 left-0 items-center justify-end">
    <div class="drawer flex justify-end">
      <input id="my-drawer" ref="myDrawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- Page content here -->
        <label for="my-drawer" class="drawer-button">
        <Icon  name="mdi:format-list-bulleted"></Icon>
        </label>
      </div>
      <div class="drawer-side z-[10000]">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-secondary p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li class="flex w-full justify-end flex-row">
            <button class="p-0" @click.prevent="myDrawer?.click()">
              <Icon name="ic:outline-cancel" size="22px"></Icon>
            </button>
          </li>
          <!-- Sidebar content here -->
          <li v-for="(item, index) in navItems" :key="index" class="flex flex-row border-b-2 justify-start py-1">
            <a v-if="item.name === 'Blogs'" class="cursor-pointer"  @click.prevent="() => (myDrawer?.click(),router.push('/blogs'))">{{item.name }}</a>
            <a v-else class="cursor-pointer"  @click.prevent="() => {myDrawer?.click(),scrollToElement(item.name)}">{{item.name }}</a>
<!--            <Icon v-if="item.icon" size="1.2em" :name="item.icon"></Icon>-->
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>