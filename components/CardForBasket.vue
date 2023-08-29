<template>
   <div class="flex w-full p-2 gap-1 shadow border-slate-500">
      <div class="basis-1/4 ">
         <img :src="getImageUrl(product.avatar)" class=" h-full w-full rounded-md" :alt="product.title">
      </div>
      <div class=" basis-3/4 flex flex-col justify-between p-1">
         <h1 class=" font-bold">
            {{ product.title }}
         </h1>
         <h1>
            قیمت :  {{ product.price.split("").reverse().map((el, i) => {
                  if (i % 3 == 0 && i != 0)
                     return el + ','
                  return el
               }).reverse().join("") }} تومان
         </h1>
         <div class="flex justify-evenly items-center">
            <div class=" rounded-lg  bg-green-500 text-green-100">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-7 h-7" @click="addProductToBasket(product)">
                  <path stroke-linecap="round" stroke-linejoin="round"
                     d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <div class=" rounded-lg  bg-red-500 text-green-100">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-7 h-7" @click="deleteProductFromBasket(product)">
                  <path stroke-linecap="round" stroke-linejoin="round"
                     d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
               </svg>
            </div>
            <div class="w-2/3">
               <p> تعداد :  {{ count }} </p>
            </div>
         </div>
      </div>
   </div>
</template>
<script setup>
import { useFiltersStore } from '~/app.vue'
const props = defineProps({
   product: Object,
   count: Number
})
const product = ref({})
const count = ref(0)
product.value = props.product
count.value = props.count

function getImageUrl(encodedUrl) {
   return `data:image/png;base64,${encodedUrl}`;
}

const filtersStore = useFiltersStore()
const { addToBasket,deleteFromBasket } = filtersStore

function addProductToBasket(product) {
   count.value++
   addToBasket(product)
}
function deleteProductFromBasket(product) {
   count.value--
   deleteFromBasket(product)
}


</script>