<template>
   <div class=" mt-6 px-2 py-1 ">
      <p class=" text-lg">
         {{ message }}
      </p>
      <div class="flex overflow-scroll gap-2 mt-1 p-2 scrollbar-hide ">
         <Card v-for="product in products" :key="product._id" :product="product" />
      </div>
   </div>
</template>
<script setup>

const props = defineProps({
   products: Object,
   message: String
})
const products = ref([]), message = ref("")
products.value = props.products
message.value = props.message
watch(() => props.products, () => {
   products.value = props.products
})
watch(() => props.message, () => {
   message.value = props.message
})
</script>
<style>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>