<template>
    <div class="h-[100vh] bg-white flex flex-col justify-center items-center">
      <div class=" border p-4 border-gray-500 rounded-xl ">
          <form action="" @submit.prevent="">
          <Input required v-model="userInformation.username" placeholder="enter your username" label="username" />
          <Input  type="email" required v-model="userInformation.email" placeholder="enter your email" label="email" />
          <Input required v-model="userInformation.mobile" placeholder="enter your mobile" label="mobile" />
          <Input type="password" required v-model="userInformation.password" placeholder="enter your password" label="password" />
          <div class="flex justify-center pt-2">
              <Button class="" @click="submitUser" color="default" pill>Submit</Button>
          </div>
          </form>
      </div>
    </div>
  </template>
  <script setup>
  import { Input } from "flowbite-vue";
  import { Button } from 'flowbite-vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const userInformation = {}
  async function submitUser(){
      await fetch('http://localhost:3000/users',{
          method:'POST',
          body:JSON.stringify(userInformation),
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
           "Content-Type": "application/json",
          },
      })
      router.push('/')
  }
  
  definePageMeta({
    layout: false,
  });
  </script>