<template>
    <div class="border-2 border-white shadow-sm h-7 flex bg-slate-100 rounded-md justify-end">
        <div class="dropdown dropdown-end">
        <label tabindex="0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </label>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-24 overflow-hidden">
          <div v-if="isLoggedIn">
            <li>
              <a> 
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 rounded-sm bg-gray-500">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                <p class=" text-sm">
                  Profile
                </p>
                </div>
              </a>
            </li>
            <li >
              <a @click="changeStatusToLoggedOut"> 
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 rounded-sm bg-red-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                <p class=" text-sm">
                  Logout
                </p>
                </div>
              </a>
            </li>
          </div>
          <div v-else>
            <li>
              <a @click="router.push('/auth/login')"> 
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 bg-green-600 rounded-sm">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                <p class=" text-sm">
                  Login
                </p>
                </div>
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
</template>
<script setup>
import { useFiltersStore } from '~/pages/index.vue'
import { storeToRefs } from 'pinia'
import {useRouter} from 'vue-router'
const router  = useRouter()
const state = useFiltersStore()
const {changeStatusToLoggedOut} = state
const { isLoggedIn } = storeToRefs(state)


</script>