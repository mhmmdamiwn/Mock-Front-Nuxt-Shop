<template>
    <div class="">
        <Filter class=" sticky top-10 z-10" @existingProducts="filterExistingProducts" :brands="brands"
            @existingBrands="filterProductsByBrand" @filterPrice="filterPrice" />
        <VerticalCardHolder class="" :products='productsToBeShown'/>

    </div>
</template>
<script setup>
const route = useRoute();
import allCategories from "../../assets/statics/categories.json"
import allBrands from "../../assets/statics/brands.json"
import allProducts from "../../assets/statics/products.json"
const categoryTitle = route.params.category
const category = allCategories.find((item)=>item.title === categoryTitle)
const products = allProducts.filter((product)=>product.categoryId === category._id)
const brands = ref({})
products.forEach((item) => {
    if (!Object.keys(brands).includes(item.brandId)) {
        (() => {
            const brand = allBrands.find((brand)=>brand._id === item.brandId)
            brands.value[item.brandId] = {
                title: brand.title,
                _id: brand._id
            }
        })()
    }
})
const productsToBeShown = ref(products)

function filterExistingProducts(arg) {
    productsToBeShown.value = products.filter(item => arg ? item.count > 0 : true)
}
function filterProductsByBrand(arg){
    const brands = Object.keys(arg).filter(i=>arg[i]?i:false)
    productsToBeShown.value = products.filter(item => brands.length>0 ? (brands.includes(item.brandId) ? item.brandId:false):true)
}
function filterPrice(arg){
    productsToBeShown.value = products.filter(item=>arg!=null?item.price>=arg[0] && item.price<=arg[1]:true)
}


</script>