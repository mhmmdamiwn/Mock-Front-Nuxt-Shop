<template>
  <!-- <Carousel :pictures="pictures" :slide="true" :slide-interval="2000" ></Carousel> -->
  <div class=" mx-auto mt-4  md:w-1/2">
    <v-carousel  cycle :show-arrows="false"  :hide-delimiters="true" progress="blue">
    <v-carousel-item  v-for="picture in pictures" :key="picture.description" :src="picture.src" cover></v-carousel-item>
  </v-carousel>
  </div>
 
  <MainPageSuggestedProducts />
  <MainPageSuggestedProducts />
</template>
<script>

export default {
  data() {
    return {
      baners: [],
      pictures: []
    }
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
