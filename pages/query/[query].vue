<template>
    <div class=" flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        <VerticalCard v-for="product in products" :key="product._id" :product="product" />
    </div>
</template>
<script setup>
import allProducts from "../../assets/statics/products.json"
const route = useRoute()

const products = allProducts.filter((product)=>{
    if(product.title.toLowerCase().includes(route.params.query.toLowerCase()) || product.description.toLowerCase().includes(route.params.query.toLowerCase()) ){
        return product
    }
})
</script>