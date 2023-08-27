<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script>

import { defineStore } from 'pinia'

export default {
  created() {
    const filtersStore = useFiltersStore()
    const { fillCategories } = filtersStore
    fillCategories()
  },
  mounted() {
    if (process.client) {
      const filtersStore = useFiltersStore()
      const { addToBasket, changeStatusToLoggedIn } = filtersStore
      const localStorageUserInformation = window.localStorage.getItem('userInformation')
      if (localStorageUserInformation) changeStatusToLoggedIn(JSON.parse(localStorageUserInformation))
      const localStorageBasket = window.localStorage.getItem('basket')
      if (localStorageBasket) addToBasket(JSON.parse(localStorageBasket))

    }
  }
};
export const useFiltersStore = defineStore({
  id: 'filter-store',
  state: () => {
    return {
      isLoggedIn: false,
      userInformation: {},
      basket: [],
      categories: []
    }
  },
  actions: {
    changeStatusToLoggedIn(data) {
      this.isLoggedIn = true
      this.userInformation = data
      window.localStorage.setItem('userInformation', JSON.stringify(this.userInformation))
    },
    changeStatusToLoggedOut() {
      this.isLoggedIn = false
      window.localStorage.removeItem('userInformation')
    },
    async fillCategories() {
      const response = await fetch('http://localhost:3000/categories')
      this.categories = await response.json()
    },
    addToBasket(product) {
      this.basket.push(product)
      window.localStorage.setItem('basket', JSON.stringify(this.basket))
    },
    deleteFromBasket(product) {
      this.basket.splice(this.basket.indexOf(product), 1)
      window.localStorage.setItem('basket', JSON.stringify(this.basket))
    }
  },
  getters: {
    userStatus: state => state.isLoggedIn,
  },
})


</script>