<template>
    <div v-if="Object.keys(mainPageComponents).length>0">
        <CardHolder v-for="component in mainPageComponents" :key="component[0].displayMessage" :products="component" :message="component[0].displayMessage"/>
    </div>

</template>
<script setup>
import mainPage from "../../assets/statics/mainpage.json"

const mainPageComponents = ref({})
mainPageComponents.value = mainPage

</script>