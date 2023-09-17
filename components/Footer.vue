<template>
    <div class="w-full flex flex-col p-4 gap-2">
        <div class="basis-1/2 flex ">
            <div class="basis-1/2">
                <h1 class="text-about text-lg font-bold md:text-2xl ">
                    {{ getWord("name") }}
                </h1>
            </div>
            <div class="basis-1/2 flex justify-end items-center gap-6 ">
                <a href="https://wa.link/t88za4">
                    <v-icon class="text-white" icon="mdi-whatsapp" />
                </a>
                <a href="https://instagram.com/shiraz.gallery41">
                    <v-icon class="text-white" icon="mdi-instagram" />
                </a>
            </div>
        </div>
        <div class="basis-1/2 flex flex-col gap-2 md:flex-row md:gap-10 ">
            <h1 class="smallFont font-semibold text-about"> آدرس : ونک , ملاصدرا , شیرازی جنوبی , پلاک  ۴۱, نمایندگی شیر آلات کلار </h1>
            <h1 class="smallFont font-semibold text-about"> تلفن : 17  29  30 88 -  021‌</h1>


        </div>
    </div>
</template>
<style>
.smallFont {
    font-size: 0.75rem;
}
</style>
<script setup>
import { useFiltersStore } from '~/app.vue'

const filtersStore = useFiltersStore()
const { getWord } = filtersStore
</script>
