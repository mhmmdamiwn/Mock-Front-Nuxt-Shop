<template>
    <Carousel :pictures="pictures" :slide="true" :slide-interval="2000"></Carousel>

    <MainPageSuggestedProducts/>
</template>
<script>
import { Carousel } from 'flowbite-vue'

export default {
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

</script>
