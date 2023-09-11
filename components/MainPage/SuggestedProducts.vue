<template>
    <div v-if="Object.keys(mainPageComponents).length>0">
        <CardHolder v-for="component in mainPageComponents" :key="component[0].displayMessage" :products="component" :message="component[0].displayMessage"/>
    </div>

</template>
<script setup>
const response = await fetch('http://localhost:3000/products/mainPage')
const mainPageComponentNames = ref([])
mainPageComponentNames.value = await response.json()
const mainPageComponentsWithoutOrder = ref([])
const mainPageComponents = ref({})
for( const item of mainPageComponentNames.value ){
    const response = await fetch("http://localhost:3000/products/suggested/"+item.displayMessage)
    mainPageComponentsWithoutOrder.value.push(await response.json())
}

mainPageComponentsWithoutOrder.value.forEach((item)=>{
    if(Object.keys(mainPageComponents.value).includes(item[0].displayMessage)){
        mainPageComponents.value[item[0].displayMessage].push(item)
    }
    else{
        mainPageComponents.value[item[0].displayMessage] = [...item]
    }
})
</script>