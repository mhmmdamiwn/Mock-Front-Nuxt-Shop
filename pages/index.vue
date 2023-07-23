<template>
    <swiper :navigation="true" :modules="modules" dir="rtl"
    :scrollbar="{ draggable: true }">
        <swiper-slide>
            <img className="object-fill w-full h-80" src="~/assets/images/1651994211-1651487641-1618030413-2-(1).jpg"
                alt="image slide 1" />
        </swiper-slide>
        <swiper-slide>
            <img className="object-fill w-full h-80" src="~/assets/images/KWC_logo.svg.png" alt="image slide 2" />
        </swiper-slide>
        <swiper-slide>
            <img className="object-fill w-full h-80" src="~/assets/images/1651994211-1651487641-1618030413-2-(1).jpg"
                alt="image slide 3" />
        </swiper-slide>
    </swiper>

    <CardHolder dir="rtl"/>
    
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { defineStore } from 'pinia'

import "swiper/css";

import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Navigation],
        };
    },
};
export const useFiltersStore = defineStore({
  id: 'filter-store',
  state: () => {
    return {
      isLoggedIn : false,
    }
  },
  actions: {
    changeStatusToLoggedIn() {
      this.isLoggedIn = true 
    },
    changeStatusToLoggedOut() {
      this.isLoggedIn = false 
    },
  },
  getters: {
    userStatus: state => state.isLoggedIn,
  },
})

</script>
