<template>
  <nav class=" bg-color1 w-full p-2 ">
    <div class="flex flex-row items-center justify-between gap-4 ">
      <div class="">
        <NavBarDrawer/>
      </div>
      <div class=" hidden md:flex text-attention font-bold">
          <h1 class=" whitespace-nowrap">
            {{ getWord("name") }}
          </h1>
      </div>
      <NavBarProfile/>
      <NavBarSearch class=" md:max-w-4xl "/>
      <NavBarBasket/>
      
    </div>
  </nav>
</template>
<script setup>
import { useFiltersStore } from '~/app.vue'

const filtersStore = useFiltersStore()
const { getWord } = filtersStore
</script>