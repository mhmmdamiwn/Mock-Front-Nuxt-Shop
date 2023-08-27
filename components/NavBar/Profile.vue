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
      <ul tabindex="0" class="dropdown-content z-[1] menu shadow bg-white rounded-box w-24 overflow-hidden">
        <div v-if="isLoggedIn">
          <li>
            <a class="flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class=" text-sm">
                {{ userInformation.username }}
              </p>
            </a>
          </li>
          <li>
            <a @click="changeStatusToLoggedOut" class="flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <p class=" text-sm text-rose-600">
                خروج
              </p>
            </a>
          </li>
        </div>
        <div v-else>
          <li>
            <a @click="isShowModal=true" class="flex justify-center items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>

              <p class=" text-sm">
                ورود
              </p>
            </a>
          </li>
        </div>
      </ul>
    </div>
  </div>
  <v-dialog v-model="isShowModal" width="auto">
    <v-card>
      <v-card-text class="text-center">
        ورود به اکانت
      </v-card-text>
      <v-divider :thickness="4"></v-divider>
      <v-card-actions>
        <div class="flex justify-evenly gap-1">
          <button @click="showLogin = true"
            class="text-white bg-green-500  rounded-lg border border-green-500 font-medium px-5 py-2.5 ">
            ورود
          </button>
          <button @click="showSignup = true"
            class="text-green-500 bg-white  border border-green-500  font-medium rounded-lg px-5 py-2.5 text-center">
            ثبت نام
          </button>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
    <v-dialog v-model="showLogin" persistent width="1024">
      <v-card>
        <v-card-title>
          <p class="text-h5 text-end">اطلاعات اکانت</p>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="userInformationFromForm.username" :rules="usernameRules" label="نام کاربری"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="userInformationFromForm.password" type="password" label="پسورد"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" variant="text" @click="showLogin = false">
            بستن
          </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="loginUser">
            ورود
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showSignup" persistent width="1024">
      <v-card>
        <v-card-title>
          <p class="text-h5 text-end">اطلاعات زیر را وارد کنید</p>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="userInformationFromForm.username" :rules="usernameRules" label="نام کاربری"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="userInformationFromForm.email" type="email" :rules="emailRules"
                  label="ایمیل"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="userInformationFromForm.mobile" :counter="11" :rules="mobileRules"
                  label="شماره همراه"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="userInformationFromForm.password" type="password" label="پسورد"></v-text-field>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" variant="text" @click="showSignup = false">
            بستن
          </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="signupUser">
            ثبت نام
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script setup>
import { useFiltersStore } from '~/app.vue'
import { storeToRefs } from 'pinia'

import postRequst from '~/functions/postRequest'

const router = useRouter(), state = useFiltersStore(), { changeStatusToLoggedOut, changeStatusToLoggedIn } = state,
  { isLoggedIn, userInformation } = storeToRefs(state), showLogin = ref(false), showSignup = ref(false),
  isShowModal = ref(false)

const userInformationFromForm=ref({})

const usernameRules = [
  value => {
    if (value?.length > 3) return true

    return 'First name must be at least 4 characters.'
  },
]
const emailRules = [
  value => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) return true

    return 'Must be a valid e-mail.'
  }
]
const mobileRules = [
  value => {
    if (/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/i.test(value)) return true

    return 'enter a valid phone number.'
  }
]
async function signupUser() {
  const response = await postRequst('http://localhost:3000/users', userInformationFromForm.value)
  const result = await response.json()
  if (response.status === 200) {
    changeStatusToLoggedIn(result)
    showSignup.value=false
    isShowModal.value = false
  }
}
async function loginUser(){
    const response = await postRequst('http://localhost:3000/users/login',userInformationFromForm.value)
    const result = await response.json()
    if(response.status === 200){
        changeStatusToLoggedIn(result)
        showLogin.value = false
        isShowModal.value = false
    }
}
</script>