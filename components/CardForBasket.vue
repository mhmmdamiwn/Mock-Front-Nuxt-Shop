<template>
   <div class="flex w-full p-2 gap-1 shadow border cursor-pointer"  @click="router.push('product/'+product._id)">
      <div class="basis-1/2 max-w-[50%] border shadow border-black rounded-md flex justify-center ">
         <v-img width="200" height="200" cover
            :src="product.avatar"></v-img>
      </div>
      <div class="text-sm basis-2/3 flex flex-col justify-between p-1">
         <h1 class=" font-bold">
            {{ product.title }}
         </h1>
         <h1 class="text-sm ">
           {{getWord('brand')}} :  {{ props.brand }}
         </h1>
         <h1>
            {{getWord("price")}} :  {{ product.price.split("").reverse().map((el, i) => {
                  if (i % 3 == 0 && i != 0)
                     return el + ','
                  return el
               }).reverse().join("") }} {{getWord("Toman")}}
         </h1>
         <div class="flex justify-evenly items-center gap-2">
            <div class=" flex justify-center items-center rounded-lg  bg-attention text-white cursor-pointer">
               <v-icon @click.stop="addProductToBasket(product)" icon="mdi-plus" />
            </div>
            <div class="flex justify-center items-center rounded-lg  bg-red text-white cursor-pointer">
               <v-icon @click.stop="deleteProductFromBasket(product)" icon="mdi-delete" />
            </div>
            <div class="w-2/3">
               <p> {{getWord("count")}} :  {{ count }} </p>
            </div>
         </div>
      </div>
   </div>
</template>
<script setup>
import { useFiltersStore } from '~/app.vue'
const props = defineProps({
   product: Object,
   count: Number,
   brand: String
})
const product = ref({})
const count = ref(0)
const router = useRouter()
product.value = props.product
count.value = props.count

const filtersStore = useFiltersStore()
const { addToBasket,deleteFromBasket,getWord } = filtersStore

function addProductToBasket(product) {
   count.value++
   addToBasket(product)
}
function deleteProductFromBasket(product) {
   count.value--
   deleteFromBasket(product)
}


</script>