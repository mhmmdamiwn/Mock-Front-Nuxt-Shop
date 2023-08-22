<template>
  <Carousel :pictures="pictures" :slide="true" :slide-interval="2000"></Carousel>

  <CardHolder dir="rtl" />
  <CardHolder dir="rtl" />
  <CardHolder dir="rtl" />
</template>
<script>
import { Carousel } from 'flowbite-vue'

import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'

export default {
  created() {
    const filtersStore = useFiltersStore()
    const { fillCategories } = filtersStore
    fillCategories()
  },
  data() {
    return {
      baners: [],
      pictures: []
    }
  },
  components: {
    Carousel,
  },
  methods: {
    async getBaners() {
      const response = await fetch("http://localhost:3000/baners")
      this.baners = await response.json()
      this.pictures = this.baners.map((el) => {
        return {
          src: this.getImageUrl(el.avatar),
          alt: el.description
        }
      })
    },
    getImageUrl(encodedUrl) {
      return `data:image/png;base64,${encodedUrl}`;
    }
  },
  mounted() {
    this.getBaners()
  },
  setup() {
    return {
    };
  },
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
    },
    changeStatusToLoggedOut() {
      this.isLoggedIn = false
    },
    async fillCategories() {
      const response = await fetch('http://localhost:3000/categories')
      this.categories = await response.json()
    },
    addToBasket(product) {
      this.basket.push(product)
    }, 
    deleteFromBasket(product){
      this.basket.splice(this.basket.indexOf(product),1)
    }
  },
  getters: {
    userStatus: state => state.isLoggedIn,
  },
})

</script>
