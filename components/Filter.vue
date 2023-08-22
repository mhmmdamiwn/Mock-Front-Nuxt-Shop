<template>
    <div class=" bg-blue-200 p-2 flex gap-1 items-center" dir="rtl">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6 border border-blue-500 rounded-md" @click="toggleShowFilter">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>

        </div>
        <div class="dropdown" v-show="showFilters">
            <label tabindex="0" class="flex border-dotted border-b border-t border-black">
                <h2>
                    price
                </h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
            </label>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
        </div>
        <div class="dropdown" v-show="showFilters">
            <label tabindex="0" class="flex border-dotted border-b border-t border-black">
                <h2>
                    brand
                </h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>

            </label>
            <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow bg-white rounded-box">
                <li v-for="brand in brands" :key="brand" class="gap-1 flex justify-between items-center">
                    <h2>
                        {{ brand.title }}
                    </h2>
                    <input type="checkbox" class=" rounded-lg" @change="(e) => filterBrand(brand._id,e)">
                </li>
            </ul>
        </div>
        <div v-show="showFilters" class="flex items-center gap-1 border-dotted border-b border-t border-black">
            <h2>exist</h2>
            <input type="checkbox" class=" rounded-lg" v-model="existingProducts">
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits()
const props = defineProps({
    brands: Object
})
const brands = ref({})
brands.value = props.brands
const showFilters = ref(false)
function toggleShowFilter() {
    showFilters.value = !showFilters.value
}
const existingProducts = ref(false)

watch(existingProducts, () => {
    emit('existingProducts', existingProducts.value)
})
const existingBrands = ref({})
Object.keys(brands.value).forEach(key=>{
    if(!Object.keys(existingBrands.value).includes(key)){
        existingBrands.value[key] = false
    }
})
function filterBrand(_id,event){
    existingBrands.value[_id] = event.target.checked
    emit('existingBrands',existingBrands.value)
}


</script>
