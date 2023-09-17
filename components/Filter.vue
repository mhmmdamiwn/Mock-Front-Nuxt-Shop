<template>
    <div class="text-white bg-attention p-2 flex gap-2 items-center">
        <div class=" cursor-pointer">
            <svg  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6 border border-blue-500 rounded-md" @click="toggleShowFilter">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>

        </div>
        <div class="dropdown" v-show="!showFilters">
            <label tabindex="0" class="flex items-center cursor-pointer">
                <p class=" text-sm">
                    {{getWord("price")}}
                </p>
                <v-icon icon="mdi-cash" />

            </label>
            <ul tabindex="0" class="dropdown-content shadow bg-color2 rounded-box w-64">
                <li class="mt-6 p-3">
                    <v-range-slider v-model="value" :min="0" :max="15000000" step="500000"
                        thumb-label="always"></v-range-slider>
                </li>
                <li v-if="value" class="flex gap-1 px-2 text-black">
                    <p>
                        {{getWord("from")}}
                    </p>
                    <p>
                        {{ String(value[0]).split("").reverse().map((el,i)=>{
                            if(i%3==0 && i!=0)
                                return el+','
                            return el
                        }).reverse().join("") }}
                    </p>
                    <p>
                        {{getWord("to")}}
                    </p>
                    <p>
                        {{ String(value[1]).split("").reverse().map((el,i)=>{
                            if(i%3==0 && i!=0)
                                return el+','
                            return el
                        }).reverse().join("") }}
                    </p>
                    <p>
                        {{getWord("Toman")}}
                    </p>
                </li>
                <li class="flex gap-1 justify-center mb-1 text-black">
                    <button class="border border-black rounded-md p-1" @click="value = null">
                        {{getWord("undo")}}
                    </button>
                    <button class="border bg-blue-500 rounded-md p-1" @click="filterPrice">
                        {{ getWord("submit") }}
                    </button>
                </li>
            </ul>
        </div>
        <div class="dropdown" v-show="!showFilters">
            <label tabindex="0" class="flex items-center cursor-pointer">
                <p class="text-sm ">
                    {{getWord("brand")}}
                </p>
                <v-icon icon="mdi-star-box" />

            </label>
            <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow bg-color2 rounded-box">
                <li v-for="brand in brands" :key="brand" class="gap-1 flex justify-between items-center">
                    <h2 class="text-black">
                        {{ brand.title }}
                    </h2>
                    <input type="checkbox" class="bg-primary border border-black rounded-lg" @change="(e) => filterBrand(brand._id, e)">
                </li>
            </ul>
        </div>
        <div class="flex items-center h-4" v-show="!showFilters" >
            <p class="text-sm">
            {{ getWord("onlyExistingProducts") }}
            </p>
            <v-switch class=""  color="primary" v-model="existingProducts" hide-details></v-switch>
        </div>
    </div>
</template>

<script setup>
import { useFiltersStore } from '~/app.vue'
const state = useFiltersStore()
const {getWord} = state
const value = ref(null);

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
Object.keys(brands.value).forEach(key => {
    if (!Object.keys(existingBrands.value).includes(key)) {
        existingBrands.value[key] = false
    }
})
function filterBrand(_id, event) {
    
    existingBrands.value[_id] = event.target.checked
    emit('existingBrands', existingBrands.value)
}
function filterPrice() {
    emit('filterPrice', value.value)
}

</script>
