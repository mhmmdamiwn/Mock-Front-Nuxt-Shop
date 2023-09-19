<template>
    <div class="mt-2 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-3 p-2">
        <VerticalCard v-for="product in products" :key="product._id" :product="product" />

        
    </div>
</template>
<script setup>
const props = defineProps({
    products:Object,
})
const products = ref([])
products.value = props.products
watch(()=>props.products,()=>{
    products.value = props.products
})
</script>