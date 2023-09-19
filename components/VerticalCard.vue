<template>
   <div class="flex p-2 rounded-md cursor-pointer border shadow-md" @click="router.push('/product/' + product._id)">
      <div class="basis-1/4 border shadow flex justify-center ">
         <v-img cover width="150" height="150" :src="product.avatar"></v-img>
      </div>
      <div class=" basis-3/4 max-w-[75%]  flex flex-col justify-between p-2">
         <div class="flex">
            <p class="text-sm font-bold">
               {{ product.title }}
            </p>
         </div>
         <p class=" text-sm ">
            {{ getWord("brand") }} : {{ brands.find(el => el._id === product.brandId).title }}
         </p>

         <div class="flex text-sm self-end underline">
            <p>
               {{ getWord("exist") }} : {{ product.count }}
            </p>
         </div>

         <div class="flex justify-evenly items-center gap-1 ">

            <div class="flex justify-center items-center rounded-lg  bg-attention text-white cursor-pointer">
               <v-icon @click.stop="addProductToBasket(product)" icon="mdi-plus" />
            </div>
            <div class=" text-sm">
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
import { useFiltersStore } from '~/app.vue'
import allBrands from "../assets/statics/brands.json"
const props = defineProps({
   product: Object,
})
const router = useRouter()
const product = props.product
const brands = allBrands
const filtersStore = useFiltersStore()
const { addToBasket, getWord } = filtersStore
const description = computed(() => {
   return product.description
})
function addProductToBasket(product) {
   addToBasket(product)
}


</script>