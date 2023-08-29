<template>
      <div class="bgColor  text-black " dir="rtl">
            <div class="sticky top-0 z-50">
                  <NavBar />
                  <!-- <Categories /> -->
            </div>

            <slot   />
            <footer class=" bg-blue-700 ">
                  Footer
            </footer>
            
      </div>
</template>
<style>
@font-face {
    font-family: "IranSans";
    src: local("Iransans"),
     url(~/assets/fonts/IranianSans.ttf) format("truetype");
}
.bgColor{
      background-color: rgb(255, 253, 246);
}
html {
    font-family: "IranSans";
}
</style>