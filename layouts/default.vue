<template>
      <div class=" bg-cyan-100 ">
            <div class="sticky top-0 z-50">
                  <NavBar />
                  <!-- <Categories /> -->
            </div>

            <slot/>
            <footer class=" bg-blue-700 ">
                  Footer 
            </footer>
      </div>
</template>
<style>
*{
      color: rgb(56, 54, 54);
}
</style>