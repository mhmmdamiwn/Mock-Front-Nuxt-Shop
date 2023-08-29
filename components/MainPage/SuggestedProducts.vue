<template>
    <CardHolder :products="suggestedProducts" :message="message"/>
</template>
<script setup>
const response = await fetch('http://localhost:3000/products/suggested')
const suggestedProducts = ref([])
suggestedProducts.value = await response.json()
const message = 'محصولات پیشنهادی'
</script>