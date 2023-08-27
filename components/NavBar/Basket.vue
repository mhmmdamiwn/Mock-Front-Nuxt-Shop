<template>
  <div class="border-2 border-white bg-slate-100 shadow-sm rounded-md h-7 flex justify-center relative">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="w-6 h-6" :class="{' bg-blue-500 text-white rounded-md scale-105 transition-all ease-in' : changeBasketColor}" @click="router.push('/basket')" >
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
    <div :class="{' bg-white text-blue-500 border border-blue-500 transition-all ease-in' : changeBasketColor}" 
      class=" bg-slate-100 border border-slate-300 w-4 h-4 text-xs flex justify-center items-center rounded-md absolute left-5 bottom-4">
      {{ basket.length }}
    </div>
  </div>
</template>
<script setup>
import { useFiltersStore } from '~/app.vue'
const router = useRouter()
const changeBasketColor = ref(false)
const filtersStore = useFiltersStore()
const { basket } = filtersStore
watch(basket,()=>{
  changeBasketColor.value = basket.length>0
})
</script>