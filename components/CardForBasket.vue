<template>
   <div class="flex w-full p-2 gap-1 shadow border cursor-pointer"  @click="router.push('product/'+product._id)">
      <div class="basis-1/3 ">
         <v-img width="10rem" height="10rem"
            :src="getImageUrl(product.avatar)"></v-img>
      </div>
      <div class=" basis-2/3 flex flex-col justify-between p-1">
         <h1 class=" font-bold">
            {{ product.title }}
         </h1>
         <h1 class=" font-bold">
           برند :  {{ props.brand }}
         </h1>
         <h1>
            قیمت :  {{ product.price.split("").reverse().map((el, i) => {
                  if (i % 3 == 0 && i != 0)
                     return el + ','
                  return el
               }).reverse().join("") }} تومان
         </h1>
         <div class="flex justify-evenly items-center gap-2">
            <div class=" flex justify-center items-center rounded-lg  bg-attention text-white cursor-pointer">
               <v-icon @click.stop="addProductToBasket(product)" icon="mdi-plus" />
            </div>
            <div class="flex justify-center items-center rounded-lg  bg-red text-white cursor-pointer">
               <v-icon @click.stop="deleteProductFromBasket(product)" icon="mdi-delete" />
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
   count: Number,
   brand: String
})
const product = ref({})
const count = ref(0)
const router = useRouter()
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