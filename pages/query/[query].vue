<template>
    <div class=" flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        <VerticalCard v-for="product in products" :key="product._id" :product="product" />
    </div>
</template>
<script setup>
const route = useRoute()
const response = await fetch("http://localhost:3000/search?"+new URLSearchParams({
    query: route.params.query
}))
const products = await response.json()
</script>