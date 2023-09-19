<template>
    <div class="w-full flex flex-col p-4 gap-2">
        <div class="basis-1/2 flex ">
            <div class="basis-1/2">
                <h1 class="text-white text-lg font-bold md:text-2xl ">
                    {{ getWord("name") }}
                </h1>
            </div>
            <div class="basis-1/2 flex justify-end items-center gap-6 ">
                <a href="https://wa.link/nl2s7d">
                    <v-icon class="text-white" icon="mdi-whatsapp" />
                </a>
                <a href="https://www.linkedin.com/in/amin-esmaili-c137">
                    <v-icon class="text-white" icon="mdi-linkedin" />
                </a>
                <a href="https://github.com/mhmmdamiwn/">
                    <v-icon class="text-white" icon="mdi-github" />
                </a>
                <a href="mailto:mhmmdamin.esmaili@gmail.com?body=Hello">
                    <v-icon class="text-white" icon="mdi-gmail" />
                </a>
            </div>
        </div>
        <div class="basis-1/2 flex flex-col gap-2 md:flex-row md:gap-10 ">
            <h1 class=" basis-3/4 smallFont font-semibold text-white"> {{ getWord("aboutMe") }} </h1>
            <h1 v-if="dir == 'rtl'" class="smallFont font-semibold text-white"> {{ getWord("phoneNumber") }} : 09212163842</h1>
            <h1 v-if="dir == 'ltr'" class="smallFont font-semibold text-white"> {{ getWord("phoneNumber") }} : +98 9212163842</h1>
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
import { storeToRefs } from 'pinia'; 
const filtersStore = useFiltersStore()
const { getWord } = filtersStore
const {dir} = storeToRefs(filtersStore)
</script>
