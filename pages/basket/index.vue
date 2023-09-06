<template>
    <div class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CardForBasket v-for="product in productsInBasket" :key="product.product._id" :product="product.product"
            :brand="brands.find(el => el._id === product.product.brandId).title" :count="product.count" />
    </div>


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
const brandResponse = await fetch("http://localhost:3000/brands")
const brands = await brandResponse.json()
const changeBasketColor = ref(false), totalPrice = ref(0)
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
onMounted(() => {
    changeBasketColor.value = basket.value.length > 0
    totalPrice.value = basket.value.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.price, 10), 0)
    fillProductsInBasket()
})


watch(basket.value, () => {
    changeBasketColor.value = basket.value.length > 0
    totalPrice.value = basket.value.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.price, 10), 0)
    productsInBasket.value = {}
    fillProductsInBasket()
})


</script>