<template>
    <div class="overflow-scroll w-full">
        <div class="flex flex-col gap-4 mx-4 mt-4 ">
            <div class=" flex flex-col md:flex-row md:gap-4 md:items-center">
                <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 self-center ">
                    <v-img width="100%" class="rounded-md" :src="getImageUrl(product.avatar)"></v-img>
                </div>
                <div class="">
                    <div class="flex items-center self-start gap-2">
                        <h2 class="text-sm">
                            نام محصول :
                        </h2>
                        <h1 class="font-bold text-lg self-start">
                            {{ product.title }}
                        </h1>
                    </div>
                    <div class="flex items-center self-start gap-2">
                        <h2 class="text-sm">
                            در دسته :
                        </h2>
                        <h1 class="font-bold text-lg self-start underline text-blue-500"
                            @click="router.push(`/categories/${categories.find(el => el._id === product.categoryId).title}`)">
                            {{ categories.find(el => el._id === product.categoryId).title }}
                        </h1>
                    </div>
                    <div class="flex items-center self-start gap-2">
                        <h1 class="text-sm">
                            برند :
                        </h1>
                        <h1 class="font-bold text-lg self-start">
                            {{ brands.find(el => el._id === product.brandId).title.toUpperCase() }}
                        </h1>
                    </div>
                    <div class="flex items-center self-start gap-2">
                        <h2 class="text-sm">
                            موجودی :
                        </h2>
                        <h1 class="font-bold text-lg self-start">
                            {{ product.count }}
                        </h1>
                    </div>
                </div>
            </div>


            <div class="flex flex-col self-start gap-2">
                <h2 class="text-sm">
                    توضیحات :
                </h2>
                <h1 class="font-bold text-lg self-start w-full whitespace-break-spaces">
                    {{ product.description }}
                </h1>
            </div>
        </div>
    </div>
    <div
        class="w-full md:w-1/2 lg:w-1/3 md:mx-auto bg-attention  md:rounded-md sticky bottom-0  z-40  flex p-2 items-center gap-2 justify-evenly">
        <div @click="addProductToBasket(product)">
            <v-btn elevation="4" color="green">
                <p class="text-xs">
                    افزودن به سبد
                </p>
            </v-btn>
        </div>
        <div class="flex items-center gap-2">
            <h2 class="text-sm">
                قیمت :
            </h2>
            <h1 class="font-bold text-lg self-start">
                {{ product.price.split("").reverse().map((el, i) => {
                    if (i % 3 == 0 && i != 0)
                        return el + ','
                    return el
                }).reverse().join("") }} تومان
            </h1>
        </div>

    </div>
    <CardHolder class="border-t" v-if="suggestedProducts.length>1" :products="suggestedProducts" :message="message"/>
</template>
<script setup>
const router = useRouter()
const route = useRoute()
const response = await fetch("http://localhost:3000/products/" + route.params.productId)
const product = ref({})
product.value = await response.json()

function getImageUrl(encodedUrl) {
    return `data:image/png;base64,${encodedUrl}`;
}

const brandResponse = await fetch("http://localhost:3000/brands")
const brands = await brandResponse.json()

const categories = ref({})
const categoryResponse = await fetch("http://localhost:3000/categories")
categories.value = await categoryResponse.json()

import { useFiltersStore } from '~/app.vue'

const filtersStore = useFiltersStore()
const { addToBasket } = filtersStore

function addProductToBasket(product) {
    addToBasket(product)
}
const suggestedProductResponse = await fetch("http://localhost:3000/products/category/?" + new URLSearchParams({
    categoryTitle : categories.value.find(el => el._id === product.value.categoryId).title
}))
const suggestedProducts = ref({})
suggestedProducts.value= await suggestedProductResponse.json()
suggestedProducts.value = suggestedProducts.value.filter(i=>i._id !== product.value._id)
const message = 'محصولات مشابه'
</script>