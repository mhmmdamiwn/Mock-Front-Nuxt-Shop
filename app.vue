<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script>

import { defineStore } from 'pinia'
import eng from './assets/language/eng.json'
import fa from './assets/language/fa.json'
import allCategories from "./assets/statics/categories.json"

export default {
  created() {
    if (process.client) {
      const filtersStore = useFiltersStore()
      const { addToBasket, changeStatusToLoggedIn,setDirection } = filtersStore
      const localStorageUserInformation = window.localStorage.getItem('userInformation')
      if (localStorageUserInformation) changeStatusToLoggedIn(JSON.parse(localStorageUserInformation))
      const localStorageBasket = window.localStorage.getItem('basket')
      if (localStorageBasket) {
        addToBasket(JSON.parse(localStorageBasket),true)
      }
      const localStorageDirection = window.localStorage.getItem('dir')
      if (localStorageDirection)
      setDirection(localStorageDirection)
    }
  },
  mounted() {
    
  }
};
export const useFiltersStore = defineStore({
  id: 'filter-store',
  state: () => ({
      isLoggedIn: false,
      userInformation: {},
      basket: [],
      categories: allCategories,
      dir : 'rtl',
      users : []
}),
  actions: {
    changeStatusToLoggedIn(data) {
      this.isLoggedIn = true
      this.userInformation = data
      window.localStorage.setItem('userInformation', JSON.stringify(this.userInformation))
    },
    setDirection(direction){
      this.dir = direction
      window.localStorage.setItem('dir', this.dir)
    },
    changeDirection(){
      this.dir = this.dir === 'rtl' ? 'ltr' : 'rtl'
      window.localStorage.setItem('dir', this.dir)
    },
    getWord(word){
      if(this.dir === 'rtl'){
        return fa[word]
      }
      else{
        return eng[word]
      }
    },
    changeStatusToLoggedOut() {
      this.isLoggedIn = false
      window.localStorage.removeItem('userInformation')
    },
    addToBasket(product,reset=false) {
      if(reset){
        this.basket = product
        return
      }
      window.localStorage.removeItem('basket')
      this.basket.push(product)
      window.localStorage.setItem('basket', JSON.stringify(this.basket))
    },
    deleteFromBasket(product) {
      window.localStorage.removeItem('basket')
      this.basket.splice(this.basket.indexOf(product), 1)

      window.localStorage.setItem('basket', JSON.stringify(this.basket))
    },
    addUser(user){
      const userAlreadyExist = this.users.find(i=>i.username === user.username || i.email === user.email )
      if(!userAlreadyExist){
        this.users.push(user)
        return user
      }
      else{
        return false
      }
    },
    editUser(username,user){
      if(user.username){
         const newUser = this.users.find(item=>item.username === user.username)
         if(!newUser){
          return false
       }
      }
      const index = this.users.findIndex((item)=>item.username === username)
      this.users[index] = user
      return this.users[index]
    }
  },
  getters: {
    userStatus: state => state.isLoggedIn,
  },
})


</script>