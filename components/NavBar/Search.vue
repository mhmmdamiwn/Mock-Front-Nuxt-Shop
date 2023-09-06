<template>
  <div class="border-2 border-white shadow-sm h-7  flex justify-around input w-full p-0  bg-color2">
    <input type="text" class="w-full p-1 border-none  focus:ring-0"
      placeholder="جست و جو" v-model="query" @keydown.enter="changePage">
    <v-icon @click="changePage" class="cursor-pointer h-6 w-6"
      :class="{ ' bg-attention text-white rounded-md scale-105 transition-all ease-in': activeButton }"
      icon="mdi-magnify" />
  </div>
</template>
<script setup>
const router = useRouter()
const query = ref("")
const activeButton = ref(false)
watch(query, () => {
  activeButton.value = query.value.length > 0
})
function changePage() {
  if (activeButton.value)
    router.push(`/query/${query.value}`)
}
</script>