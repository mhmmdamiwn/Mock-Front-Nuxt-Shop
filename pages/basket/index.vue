<template>
    <div class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CardForBasket v-for="product in productsInBasket" :key="product.product._id" :product="product.product"
            :brand="brands.find(el => el._id === product.product.brandId).title" :count="product.count" />
    </div>


    <div v-if="!changeBasketColor" class=" h-40 flex items-center justify-center">
        <h1>
            {{ getWord("noItem") }}
        </h1>
    </div>
    <div v-else class="flex justify-center items-center">
        <h1 class="m-4">
            {{getWord("totalPrice")}} : {{ String(totalPrice).split("").reverse().map((el, i) => {
                if (i % 3 == 0 && i != 0)
                    return el + ','
                return el
            }).reverse().join("") }} {{getWord("Toman")}}
        </h1>
    </div>
</template>
<script setup>
import { useFiltersStore } from '~/app.vue'
import { storeToRefs } from 'pinia'
import allBrands from "../../assets/statics/brands.json"
const filtersStore = useFiltersStore()
const { basket } = storeToRefs(filtersStore)
const { getWord} = filtersStore
const brands = allBrands
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