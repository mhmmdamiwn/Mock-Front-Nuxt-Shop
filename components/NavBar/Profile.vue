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
                  {{ userInformation.username }}
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
              <a @click="showModal"> 
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 bg-green-600 rounded-sm">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                <p class=" text-sm">
                  Enter
                </p>
                </div>
              </a>

            </li>
          </div>
        </ul>
      </div>
    </div>
    <Modal size="xs"  v-if="isShowModal" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">
          Enter
        </div>
      </template>
      <template #body>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          if you already have an account choose login
          otherwise create an account
        </p>
      </template>
      <template #footer>
        <div class="flex justify-evenly">
          <button @click="router.push('/auth/login')" type="button" class="text-white bg-green-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-green-500 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            Login
          </button>
          <button @click="router.push('/auth/signup')" type="button" class="text-green-500 bg-white hover:bg-blue-800 border border-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Signup
          </button>
        </div>
      </template>
    </Modal>
</template>
<script setup>
import { useFiltersStore } from '~/pages/index.vue'
import { storeToRefs } from 'pinia'
import { Modal } from 'flowbite-vue'
import { ref } from 'vue'

const router  = useRouter()
const state = useFiltersStore()
const {changeStatusToLoggedOut} = state
const { isLoggedIn,userInformation } = storeToRefs(state)

const isShowModal = ref(false)
function closeModal() {
  isShowModal.value = false
}
function showModal() {
  isShowModal.value = true
}
</script>