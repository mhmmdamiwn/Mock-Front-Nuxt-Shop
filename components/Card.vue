<template>
   <div class="flex w-[15rem] flex-col justify-between p-2 border shadow-md rounded-md cursor-pointer " @click="router.push('/product/'+product.productId)">
      <div class="basis-1/2 max-h-[75%] border shadow flex justify-center ">
         <v-img height="200" width="200" cover class=" "
            :src="product.avatar"></v-img>
      </div>
      <div class="m-1">
         <div class="text-sm text-clip">
            {{ product.title }}
         </div>
      </div>
      <div class="m-1">
         <div class="flex justify-between items-center gap-2">
            <div class="flex justify-center items-center rounded-lg  bg-attention text-white">
               <v-icon @click.stop="addProductToBasket(product)" icon="mdi-plus" />
            </div>
            <div class="text-sm">
               <p> {{ product.price.split("").reverse().map((el, i) => {
                  if (i % 3 == 0 && i != 0)
                     return el + ','
                  return el
               }).reverse().join("") }} {{ getWord("Toman") }}</p>
            </div>
         </div>
      </div>

   </div>
</template>
<script setup>
const props = defineProps({
   product: Object,
})
const products = ref([])
products.value = props.product


import { useFiltersStore } from '~/app.vue'
const filtersStore = useFiltersStore()
const { addToBasket,getWord } = filtersStore

function addProductToBasket(product) {
   addToBasket(product)
}
const router = useRouter()
</script>