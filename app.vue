<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script>

import { defineStore } from 'pinia'
import eng from './assets/language/eng.json'
import fa from './assets/language/fa.json'
export default {
  created() {
    const filtersStore = useFiltersStore()
    const { fillCategories } = filtersStore
    fillCategories()
    if (process.client) {
      const filtersStore = useFiltersStore()
      const { addToBasket, changeStatusToLoggedIn } = filtersStore
      const localStorageUserInformation = window.localStorage.getItem('userInformation')
      if (localStorageUserInformation) changeStatusToLoggedIn(JSON.parse(localStorageUserInformation))
      const localStorageBasket = window.localStorage.getItem('basket')
      if (localStorageBasket) {
        addToBasket(JSON.parse(localStorageBasket),true)
      }
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
      categories: [],
      dir : 'rtl'
}),
  actions: {
    changeStatusToLoggedIn(data) {
      this.isLoggedIn = true
      this.userInformation = data
      window.localStorage.setItem('userInformation', JSON.stringify(this.userInformation))
    },
    changeDirection(){
      this.dir = this.dir === 'rtl' ? 'ltr' : 'rtl'
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
    async fillCategories() {
      const response = await fetch('http://localhost:3000/categories')
      this.categories = await response.json()
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
    }
  },
  getters: {
    userStatus: state => state.isLoggedIn,
  },
})


</script>