<template>
      <div class="bgColor  text-black min-h-[100vh] flex flex-col  " id="main" :dir="direction">
            <div class="sticky top-0 z-50">
                  <NavBar />
                  <!-- <Categories /> -->
            </div>
            <div class=" grow ">

                  <slot />
            </div>
            <Footer class=" bg-footer" />

      </div>
</template>
<style>
@font-face {
      font-family: "IranSans";
      src: local("Iransans"),
            url(~/assets/fonts/IRANYekanXFaNum.woff) format("truetype");
}

.bgColor {
      background-color: rgb(255, 253, 246);
}

html {
      font-family: "IranSans";
}
</style>
<script setup>
import { useFiltersStore } from '~/app.vue'
import { storeToRefs } from 'pinia'
const state = useFiltersStore()
const { dir } = storeToRefs(state)
const direction = ref("")
onMounted(() => {
      direction.value = dir.value
})

watch(dir, (newDir) => {
      direction.value = dir.value
      // Change font-family based on the value of 'dir'
      const htmlElement = document.querySelector('html');
      htmlElement.style.fontFamily = newDir === 'ltr' ? 'sans-serif' : 'IranSans';
});
</script>