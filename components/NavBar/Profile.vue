<template>
  <div class="border-2 border-white shadow-sm flex rounded-md justify-center">
    <v-menu location="bottom center">
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          <v-icon class=" cursor-pointer" icon="mdi-account" />
        </div>
      </template>

      <v-list>
        <v-list-item v-if="isLoggedIn" class=" cursor-pointer">
          <a class="flex items-center justify-center gap-1" @click="router.push(`/${userInformation.username}/profile`)">
            <v-icon icon="mdi-pencil" />

            <p class=" text-sm">
              {{ userInformation.username }}
            </p>
          </a>
        </v-list-item>
        <v-list-item v-if="isLoggedIn" class=" cursor-pointer">
          <a @click="changeStatusToLoggedOut" class="flex items-center justify-center gap-1">
            <v-icon icon="mdi-logout" />

            <p class=" text-sm text-rose-600">
              خروج
            </p>
          </a>
        </v-list-item>
        <v-list-item v-else class=" cursor-pointer">
            <a @click="isShowModal = true" class="flex justify-center items-center gap-1">
              <v-icon icon="mdi-login" />
              <p class=" text-sm">
                ورود
              </p>
            </a>
        </v-list-item>
      </v-list>
    </v-menu>
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
            class="text-white bg-attention  rounded-lg border border-attention font-medium px-5 py-2.5 ">
            ورود
          </button>
          <button @click="showSignup = true"
            class="text-attention bg-color2  border border-attention  font-medium rounded-lg px-5 py-2.5 text-center">
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
              <v-text-field v-model="userInformationFromForm.username" :rules="usernameRules"
                label="نام کاربری"></v-text-field>
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
              <v-text-field v-model="userInformationFromForm.username" :rules="usernameRules"
                label="نام کاربری"></v-text-field>
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

const userInformationFromForm = ref({})

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
    showSignup.value = false
    isShowModal.value = false
  }
}
async function loginUser() {
  const response = await postRequst('http://localhost:3000/users/login', userInformationFromForm.value)
  const result = await response.json()
  if (response.status === 200) {
    changeStatusToLoggedIn(result)
    showLogin.value = false
    isShowModal.value = false
  }
}
</script>