<template>
    <div class="overflow-scroll w-full">
        <div class="flex flex-col gap-4 mx-4 mt-4 ">
            <div class=" flex flex-col md:flex-row md:gap-4 md:items-center">
                <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 self-center ">
                    <v-img width="100%" class="rounded-md" :src="product.avatar"></v-img>
                </div>
                <div class="">
                    <div class="flex items-center self-start gap-2">
                        <h2 class="text-sm">
                            {{ getWord("productName") }}  :
                        </h2>
                        <h1 class="font-bold text-lg self-start">
                            {{ product.title }}
                        </h1>
                    </div>
                    <div class="flex items-center self-start gap-2">
                        <h2 class="text-sm">
                            {{ getWord("category") }} :
                        </h2>
                        <h1 class="font-bold text-lg self-start underline text-blue-500"
                            @click="router.push(`/categories/${categories.find(el => el._id === product.categoryId).title}`)">
                            {{ categories.find(el => el._id === product.categoryId).title }}
                        </h1>
                    </div>
                    <div class="flex items-center self-start gap-2">
                        <h1 class="text-sm">
                            {{getWord("brand")}} :
                        </h1>
                        <h1 class="font-bold text-lg self-start">
                            {{ brands.find(el => el._id === product.brandId).title.toUpperCase() }}
                        </h1>
                    </div>
                    <div class="flex items-center self-start gap-2">
                        <h2 class="text-sm">
                            {{ getWord("exist") }} :
                        </h2>
                        <h1 class="font-bold text-lg self-start">
                            {{ product.count }}
                        </h1>
                    </div>
                </div>
            </div>


            <div class="flex flex-col self-start gap-2 mb-4">
                <h2 class="text-sm">
                    {{getWord("description")}} :
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
                    {{ getWord("addToBasket") }}
                </p>
            </v-btn>
        </div>
        <div class="flex items-center gap-2 text-white">
            <h2 class="text-sm">
                {{getWord("price")}} :
            </h2>
            <h1 class="font-bold text-sm self-start">
                {{ product.price.split("").reverse().map((el, i) => {
                    if (i % 3 == 0 && i != 0)
                        return el + ','
                    return el
                }).reverse().join("") }} {{getWord("Toman")}}
            </h1>
        </div>

    </div>
    <CardHolder class="border-t" v-if="suggestedProducts.length>0" :products="suggestedProducts" :message="message"/>
</template>
<script setup>
const router = useRouter()
const route = useRoute()
import allProducts from "../../assets/statics/products.json"
import allBrands from "../../assets/statics/brands.json"
import allCategories from "../../assets/statics/categories.json"
import { useFiltersStore } from '~/app.vue'
import { storeToRefs } from 'pinia'
const product = ref({})
product.value = allProducts.find(item=>item._id === parseInt(route.params.productId,10))
const brands = allBrands
const categories = ref({})
categories.value = allCategories


const filtersStore = useFiltersStore()
const { dir } = storeToRefs(filtersStore)
const { addToBasket,getWord } = filtersStore

function addProductToBasket(product) {
    addToBasket(product)
}

const suggestedProducts = ref({})
suggestedProducts.value = allProducts.filter(i=>i._id !== product.value._id && i.categoryId === product.value.categoryId)
const message = ref("")
message.value=getWord("similiarProducts")
watch(dir, () => {
    message.value=getWord("similiarProducts")
});

</script>