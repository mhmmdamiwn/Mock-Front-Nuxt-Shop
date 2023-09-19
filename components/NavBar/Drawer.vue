<template>
  <div class="relative">
    <div class=" border-2 border-white shadow-sm basis-1/12 rounded-md flex justify-center cursor-pointer"
      @click="toggleSideBar">
      <v-icon icon="mdi-menu" />

    </div>

    <div class=" absolute top-8 w-[50vw] md:w-[25vw] bg-color2 rounded-md border " :hidden="showSideBar"
      @mouseleave="closeSideBar">
      <div @click="closeSideBar" class=" flex justify-end md:hidden">
        <v-icon class="p-1 border-2 cursor-pointer border-white rounded-md bg-black text-white" icon="mdi-close" />
      </div>
      <ul class="menu w-full h-full">
        <li @click="router.push('/')">
          <div class="flex">
            <v-icon icon="mdi-home" />
            <p>{{ getWord("home") }}</p>
          </div>
        </li>
        <li>
          <div class="flex" @click="showCategories = !showCategories">
            <v-icon icon="mdi-store" />
            <p>{{ getWord("categories") }}</p>
            <v-icon icon="mdi-menu-down" />
          </div>

        </li>
        <li v-show="showCategories" v-for="category in categories" :key="category._id"
          @click="router.push(`/categories/${category.title}`)" class=" rounded-md m-1">
          <p class=" text-sm">
            {{ category.title }}
          </p>
        </li>
        <li>
          <div class="flex justify-center items-center">

            <div>
              <v-img width="40"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/512px-Flag_of_the_United_States.svg.png" />
            </div>
            <div>

              <v-switch hide-details @change="changeDirection"></v-switch>
            </div>
            <div>
              <v-img width="40"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/512px-Flag_of_Iran.svg.png" />

            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useFiltersStore } from '~/app.vue'

const filtersStore = useFiltersStore()
const { categories } = storeToRefs(filtersStore)
const { changeDirection,getWord } = filtersStore
const showSideBar = ref(true)
const router = useRouter()
const showCategories = ref(false)
function toggleSideBar() {
  showSideBar.value = !showSideBar.value
}
function closeSideBar() {
  showSideBar.value = true
}

</script>