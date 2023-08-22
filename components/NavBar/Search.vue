<template>
    <div class="border-2 border-white shadow-sm basis-1/2 h-7 overflow-hidden flex justify-around input w-full p-0 bg-white">
        <input :class="{'text-black  ' : activeButton}" type="text" class="w-[80%] p-1 border-none  focus:ring-0" placeholder="Search ..." v-model="query">
        <svg @click="changePage" class="h-6 w-6" :class="{' bg-blue-500 text-white rounded-md scale-105 transition-all ease-in' : activeButton}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
</template>
<script setup>
const router = useRouter()
const query = ref("")
const activeButton = ref(false)
watch(query,()=>{
  activeButton.value = query.value.length>0
})
function changePage(){
  if(activeButton.value)
    router.push(`/query/${query.value}`)
}
</script>