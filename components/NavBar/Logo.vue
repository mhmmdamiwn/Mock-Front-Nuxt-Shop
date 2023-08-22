<template>
  <div class="border-2 border-white shadow-sm basis-1/12 bg-slate-100 rounded-md" @click="toggleSideBar">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  </div>

  <div class="drawer-side absolute right-0 top-0 w-[60vw] bg-base-200 rounded-b-md rounded-tl-md" :hidden="showSideBar">
    <label for="my-drawer-4" class="drawer-overlay"></label>
    <div @click="toggleSideBar">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-8 h-8 border-2 rounded-md border-slate-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    <ul class="menu p-4 w-80 h-full text-base-content">
      <!-- Sidebar content here -->
      <li>
        <div class="flex">
          <a>Home</a>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>
      </li>
      <li>
        <div class="flex" @click="toggleCategories">
          <a>Categories</a>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>

      </li>
      <li v-if="showCategories" v-for="category in categories" :key="category._id" @click="router.push(`/categories/${category.title}`)" class="bg-base-100 ms-4 mb-1">
        <a class=" text-sm">
          {{ category.title }}
        </a>
      </li>
      <li>
        <div class="flex">
          <a>About Us</a>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>

        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useFiltersStore } from '~/pages/index.vue'
const filtersStore = useFiltersStore()
const { categories } = storeToRefs(filtersStore)
const showSideBar = ref(true)
const router = useRouter()
const showCategories = ref(false)
function toggleCategories() {
  showCategories.value = !showCategories.value
}
function toggleSideBar() {
  showSideBar.value = !showSideBar.value
}

</script>