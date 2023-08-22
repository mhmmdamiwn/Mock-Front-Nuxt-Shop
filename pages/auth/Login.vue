<template>
  <div class="h-[100vh] bg-white flex flex-col justify-center items-center">
    <div class=" border p-4 border-gray-500 rounded-xl ">
        <form action="" @submit.prevent="">
        <Input required v-model="userInformation.username" minlength="4" placeholder="enter your username" label="username" />
        <Input type="password" minlength="8" required v-model="userInformation.password" placeholder="enter your password" label="password" />
        <div class="flex justify-center pt-2">
            <Button class="" @click="submitUser" color="default" pill>Submit</Button>
        </div>
        </form>
    </div>
  </div>
    <Modal persistent v-if="showModal" size="md">
    <template #body >
            <p class=" text-green-400 text-3xl text-center">
            Login Successful
        </p>
    </template>
  </Modal>

</template>
<script setup>
import { Input } from "flowbite-vue";
import { Button } from 'flowbite-vue'
import { useRouter } from 'vue-router'
import { Modal } from 'flowbite-vue'
import { ref } from 'vue'
import { useFiltersStore } from '~/pages/index.vue'
import postRequst from '~/functions/postRequest'

const filtersStore = useFiltersStore()
const { changeStatusToLoggedIn } = filtersStore

const showModal = ref(false)
const router = useRouter()
const userInformation = {}
async function submitUser(){
    const response = await postRequst('http://localhost:3000/users/login',userInformation)
    const result = await response.json()
    if(response.status === 200){
        changeStatusToLoggedIn(result)
        showModal.value = true
        setTimeout(()=>{
            router.push('/')
        },1000)
    }
}

definePageMeta({
  layout: false,
});
</script>