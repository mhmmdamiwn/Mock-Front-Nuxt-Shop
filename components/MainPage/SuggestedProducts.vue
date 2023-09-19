<template>
    <div v-if="Object.keys(mainPageComponents).length>0">
        <CardHolder v-for="component in mainPageComponents" :key="component[0].displayMessage" :products="component" :message="getWord(component[0].displayMessage)"/>
    </div>

</template>
<script setup>
import mainPage from "../../assets/statics/mainpage.json"
import { useFiltersStore } from '~/app.vue'
const filtersStore = useFiltersStore()
const { getWord } = filtersStore
const mainPageComponents = ref({})
mainPageComponents.value = mainPage

</script>