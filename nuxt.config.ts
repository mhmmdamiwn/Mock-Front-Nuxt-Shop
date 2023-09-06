// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
modules:[
   "@nuxtjs/tailwindcss",
   '@pinia/nuxt'
],
css:[
   '@fortawesome/fontawesome-svg-core/styles.css',
   'vuetify/lib/styles/main.sass',
   '@mdi/font/css/materialdesignicons.min.css',
],
build: {
   transpile: ['vuetify'],
 },
})
  