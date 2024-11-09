<script setup>

import RegisterPage from "@/views/Register.vue";
import LoginPage from "@/views/Login.vue";
import Header from "@/components/Header.vue";
import Note from "@/components/Note.vue";
import Forecast from "@/components/Forecast.vue";
import StickerDesk from "@/components/StickerDesk.vue";
import WritingSpace from "@/components/WritingSpace.vue";
import News from "@/components/News.vue";



</script>

<template>
  <Header/>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}



.container section {

}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }


}
</style>
