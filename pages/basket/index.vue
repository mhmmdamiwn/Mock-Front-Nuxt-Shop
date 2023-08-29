<template>
    <CardForBasket v-for="product in productsInBasket" :key="product.product._id" :product="product.product"
        :count="product.count" />
    <div v-if="!changeBasketColor" class=" h-40 flex items-center justify-center">
        <h1>
            هیج آیتمی در سبد خرید شما موجود نمیباشد
        </h1>
    </div>
    <div v-else class="flex justify-center items-center">
        <h1 class="m-4">
            قیمت کل : {{ String(totalPrice).split("").reverse().map((el, i) => {
                  if (i % 3 == 0 && i != 0)
                     return el + ','
                  return el
               }).reverse().join("") }} تومان
        </h1>
    </div>
</template>
<script setup>
import { useFiltersStore } from '~/app.vue'
import { storeToRefs } from 'pinia'
const filtersStore = useFiltersStore()
const { basket } = storeToRefs(filtersStore)
const changeBasketColor = ref(false)
changeBasketColor.value = basket.value.length > 0
const totalPrice = ref(basket.value.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.price, 10), 0))
const productsInBasket = ref({})
function fillProductsInBasket() {
    basket.value.forEach((item) => {
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
watch(basket.value, () => {
    changeBasketColor.value = basket.value.length > 0
    totalPrice.value = basket.value.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.price, 10), 0)
    productsInBasket.value = {}
    fillProductsInBasket()
})


</script>