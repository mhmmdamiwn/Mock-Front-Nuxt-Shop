<template>
    <div class=" flex justify-center">
        <v-card>
            <v-card-title>
                <p class="text-h5 text-end">اطلاعات اکانت</p>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field :disabled="disableForm" v-model="user.username" :rules="usernameRules"
                                label="نام کاربری"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field :disabled="true" v-model="user.email" type="email" 
                                label="ایمیل"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field :disabled="disableForm" v-model="user.mobile" :counter="11" :rules="mobileRules"
                                label="شماره همراه"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-textarea :disabled="disableForm" v-model="user.address"
                                label=" آدرس"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange-darken-1" variant="text" @click="disableForm = false" v-show="disableForm">
                    ویرایش
                </v-btn>
                <v-btn color="green-darken-1" variant="text" @click="editUser" v-show="!disableForm">
                    ثبت
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script setup>
const route = useRoute()
const disableForm = ref(true)
const username = route.params.username;
const userResponse = await fetch('http://localhost:3000/users/' + username)
const user = ref({})
user.value = await userResponse.json()
if(!user.value.address){
    user.value.address = null
}

const usernameRules = [
    value => {
        if (value?.length > 3) return true

        return 'First name must be at least 4 characters.'
    },
]

const mobileRules = [
    value => {
        if (/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/i.test(value)) return true

        return 'enter a valid phone number.'
    }
]
import putRequest from '~~/functions/putRequest';
async function editUser() {
    const response = await putRequest('http://localhost:3000/users/'+user.value.username, user.value)
    const result = await response.json()
    if (response.status === 200) {
        user.value = result
        disableForm.value =true
    }
}
</script>