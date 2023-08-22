<template>
    <div class="">
        <Filter class=" sticky top-10 z-10" @existingProducts="filterExistingProducts" :brands="brands"
            @existingBrands="filterProductsByBrand" />
        <VerticalCardHolder class="" :products='productsToBeShown' />

    </div>
</template>
<script setup>
const route = useRoute();
const categoryTitle = route.params.category
const response = await fetch("http://localhost:3000/products/category/?" + new URLSearchParams({
    categoryTitle
}))
const products = await response.json()
const brands = ref({})
products.forEach((item) => {
    if (!Object.keys(brands).includes(item.brandId)) {
        (async () => {
            const response = await fetch(`http://localhost:3000/brands/${item.brandId}`)
            const brand = await response.json()
            brands.value[item.brandId] = {
                title: brand.title,
                _id: brand._id
            }
        })()
    }
})
const productsToBeShown = ref(products)
const existingBrandProducts = ref()
function filterExistingProducts(arg) {
    productsToBeShown.value = products.filter(item => arg ? item.count > 0 : true)
}
function filterProductsByBrand(arg){
    const brands = Object.keys(arg).filter(i=>arg[i]?i:false)
    productsToBeShown.value = products.filter(item => brands.length>0 ? (brands.includes(item.brandId) ? item.brandId:false):true)
}


</script>