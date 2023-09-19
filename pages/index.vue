<template>
  <!-- <Carousel :pictures="pictures" :slide="true" :slide-interval="2000" ></Carousel> -->
  <div class=" mt-4 md:w-3/4 mx-auto" id="carousel">
    <v-card :max-height="divWidth * 1 / 2">
      <v-carousel cycle :show-arrows="false" :hide-delimiters="true" progress="blue">
        <v-carousel-item :max-height="divWidth * 1 / 2" v-for="picture in pictures" :key="picture.description"
          :src="picture.src"></v-carousel-item>
      </v-carousel>
    </v-card>

  </div>

  <MainPageSuggestedProducts />
</template>
<script>

export default {
  data() {
    return {
      baners: [],
      pictures: [
        {
          src: "https://i.ibb.co/VwsPnGt/Untitled.png",
          alt: "Slide1"
        }, {
          src: "https://i.ibb.co/RQnwxfm/Untitled-1.png",
          alt: "Slide2"
        },
        {
          src: "https://i.ibb.co/4VXCPdP/Untitled-2.png",
          alt: "Slide3"
        }
      ]
    }
  },
  setup() {
    const divWidth = ref(0)
    onMounted(() => {
      divWidth.value = document.getElementById("carousel").offsetWidth
    })

    return {
      divWidth,
    };
  },
};

</script>
