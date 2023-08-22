<template>
    <VerticalCard v-for="product in products" :key="product._id" :product="product"/>
</template>
<script setup>
const route = useRoute()
const response = await fetch("http://localhost:3000/search?"+new URLSearchParams({
    query: route.params.query
}))
const products = await response.json()
</script>