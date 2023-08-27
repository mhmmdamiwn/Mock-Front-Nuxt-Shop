<template>
    
    <CardForBasket v-for="product in productsInBasket" :key="product.product._id" :product="product.product" :count="product.count"/>
    <div v-if="basket.length <1">
        <h1>
            there is nothing in your basket
        </h1>
    </div>
    <div v-else>
        <h1>
            totalPrice : {{ totalPrice }}
        </h1>
    </div>
</template>
<script setup>
import { useFiltersStore } from '~/app.vue'

const filtersStore = useFiltersStore()
const { basket } = filtersStore
const productsInBasket = ref({})
const totalPrice = ref(basket.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.price, 10), 0))
function fillProductsInBasket() {
    basket.forEach((item) => {
        if (Object.keys(productsInBasket.value).includes(item._id))
            productsInBasket.value[item._id].count++;
        else {
            productsInBasket.value[item._id] = {
                product: item,
                count: 1
            };
        }
    })
}

fillProductsInBasket()
watch(basket, () => {
    totalPrice.value = basket.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.price, 10), 0)
    productsInBasket.value = {}
    fillProductsInBasket()
})


</script>