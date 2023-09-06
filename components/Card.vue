<template>
   <div class="flex flex-col justify-between p-2 border shadow-md rounded-md cursor-pointer " @click="router.push('/product/'+product.productId)">
      <div class="basis-1/2 border shadow">
         <v-img width="10rem" height="10rem"
            :src="getImageUrl(product.avatar)"></v-img>
      </div>
      <div class="m-1">
         <div class="text-lg text-clip">
            {{ product.title }}
         </div>
         <div class="flex justify-between items-center gap-2">
            <div class="flex justify-center items-center rounded-lg  bg-attention text-white">
               <v-icon @click.stop="addProductToBasket(product)" icon="mdi-plus" />
            </div>
            <div class="text-sm">
               <p> {{ product.price.split("").reverse().map((el, i) => {
                  if (i % 3 == 0 && i != 0)
                     return el + ','
                  return el
               }).reverse().join("") }} تومان</p>
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
function getImageUrl(encodedUrl) {
   return `data:image/png;base64,${encodedUrl}`;
}


import { useFiltersStore } from '~/app.vue'
const filtersStore = useFiltersStore()
const { addToBasket } = filtersStore

function addProductToBasket(product) {
   addToBasket(product)
}
const router = useRouter()
</script>