<template>
   <div class="flex p-2 shadow" dir="rtl">
      <div class="basis-1/4 ">
         <img :src="getImageUrl(product.avatar)" class=" h-fit w-full rounded-md" :alt="product.title">
      </div>
      <div class=" basis-3/4 max-w-[75%]  flex flex-col justify-between p-1">
         <h1 class="font-bold">
            {{ product.title }}
         </h1>
         <h2 class=" max-h-12 text-clip overflow-hidden  ">
            {{ description }}
         </h2>
         <div class="flex justify-evenly items-center" >
            <div class=" rounded-lg  bg-green-500 text-green-100">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-7 h-7" @click="addProductToBasket(product)">
                  <path stroke-linecap="round" stroke-linejoin="round"
                     d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>

            </div>
            <div class="w-2/3">
               <p> {{ product.price }} تومان</p>
            </div>
         </div>
      </div>
   </div>
</template>
<script setup>
import { useFiltersStore } from '~/pages/index.vue'
const props = defineProps({
   product: Object
})
const product = props.product
function getImageUrl(encodedUrl) {
   return `data:image/png;base64,${encodedUrl}`;
}

const filtersStore = useFiltersStore()
const { addToBasket } = filtersStore
const description = computed(() => {
  return product.description
})
function addProductToBasket(product){
   addToBasket(product)
}


</script>