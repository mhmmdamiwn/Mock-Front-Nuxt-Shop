<template>
    <div class=" ">
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