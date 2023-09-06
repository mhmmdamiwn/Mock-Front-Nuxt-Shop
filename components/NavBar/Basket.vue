<template>
  <div class="border-2 border-color2 shadow-sm rounded-md flex justify-center relative cursor-pointer">
    <v-icon class=" " @click="router.push('/basket')"
      :class="{ ' bg-attention text-white rounded-md scale-105 transition-all ease-in': changeBasketColor }"
      icon="mdi-cart" />



    <div v-show="changeBasketColor"
      :class="{ ' bg-color2 text-attention border-attention transition-all ease-in': changeBasketColor }"
      class=" border w-4 h-4 text-xs flex justify-center items-center rounded-sm absolute left-6 bottom-4">
      {{ basket.length }}
    </div>
  </div>
</template>
<script setup>
import { useFiltersStore } from '~/app.vue'
import { storeToRefs } from 'pinia'

const router = useRouter(), changeBasketColor = ref(false),
  filtersStore = useFiltersStore(), { basket } = storeToRefs(filtersStore)

onMounted(() => {
  changeBasketColor.value = basket.value.length > 0
})

watch(basket.value, () => {
  changeBasketColor.value = basket.value.length > 0
})
</script>