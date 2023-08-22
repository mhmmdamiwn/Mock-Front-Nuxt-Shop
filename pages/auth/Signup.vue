<template>
    <div class="h-[100vh] bg-white flex flex-col justify-center items-center">
        <div class=" border p-4 border-gray-500 rounded-xl ">
            <form action="" @submit.prevent="">
                <Input required minlength="4" v-model="userInformation.username" placeholder="enter your username"
                    label="username" />
                <Input type="email" required v-model="userInformation.email" placeholder="enter your email" label="email" />
                <Input required minlength="11" maxlength="11" v-model="userInformation.mobile"
                    placeholder="enter your mobile" label="mobile" />
                <Input type="password" minlength="8" required v-model="userInformation.password"
                    placeholder="enter your password" label="password" />
                <div class="flex justify-center pt-2">
                    <Button class="" @click="submitUser" color="default" pill>Submit</Button>
                </div>
            </form>
        </div>
    </div>
    <Modal persistent v-if="showModal" size="md">
        <template #body>
            <p class=" text-green-400 text-3xl text-center">
                Signup Successful
            </p>
        </template>
    </Modal>
</template>
<script setup>
import { Input } from "flowbite-vue";
import { Button } from 'flowbite-vue'
import { useRouter } from 'vue-router'
import { useFiltersStore } from '~/pages/index.vue'
import { Modal } from 'flowbite-vue'
import { ref } from 'vue'
import postRequst from '~/functions/postRequest'

const showModal = ref(false)
const filtersStore = useFiltersStore()
const { changeStatusToLoggedIn } = filtersStore
const router = useRouter()
const userInformation = {}
async function submitUser() {
    const response = await postRequst('http://localhost:3000/users',userInformation)
    const result = await response.json()
    if (response.status === 200) {
        changeStatusToLoggedIn(result)
        showModal.value = true
        setTimeout(() => {
            router.push('/')
        }, 1000)
    }
}

definePageMeta({
    layout: false,
});
</script>