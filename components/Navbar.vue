<script setup lang="ts">
import {type Ref, ref} from "vue";
import {useRouter} from "#imports";

const router = useRouter();
const navItems = ref([
  {
    name: 'Services',
    to: '/services/'
  },
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
  },
  {
    name: 'Resume',
    href: '/resume.pdf',
    icon: 'mdi:download-outline'
  }
])
const myDrawer:Ref<HTMLInputElement | null> = ref<HTMLInputElement | null>(null)
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
        <router-link v-if="item.name === 'Blogs'" to="/blogs/" class="cursor-pointer">{{item.name}}</router-link>
        <router-link v-else-if="item.to" :to="item.to" class="cursor-pointer">{{item.name}}</router-link>
        <a v-else-if="item.href" :href="item.href" target="_blank" rel="noreferrer" class="cursor-pointer">{{item.name}}</a>
        <a v-else class="cursor-pointer"  @click.prevent="scrollToElement(item.name)">{{item.name }}</a>
        <Icon v-if="item?.icon" size="1.2em" :name="item?.icon"></Icon>
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
            <a v-if="item.name === 'Blogs'" class="cursor-pointer"  @click.prevent="() => (myDrawer?.click(),router.push('/blogs/'))">{{item.name }}</a>
            <a v-else-if="item.to" class="cursor-pointer"  @click.prevent="() => (myDrawer?.click(),router.push(item.to))">{{item.name }}</a>
            <a v-else-if="item.href" :href="item.href" target="_blank" rel="noreferrer" class="cursor-pointer" @click="myDrawer?.click()">{{item.name }}</a>
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