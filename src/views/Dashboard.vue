<template>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard!</p>
    <div class="container">
      <Note/>
      <StickerDesk/>
      <WritingSpace/>
      <Forecast/>
      <News/>
    </div>
</template>

<script>
import StickerDesk from "@/components/StickerDesk.vue";
import Note from "@/components/Note.vue";
import WritingSpace from "@/components/WritingSpace.vue";
import Forecast from "@/components/Forecast.vue";
import News from "@/components/News.vue";

export default {
  name: 'Dashboard',
  components: {News, Forecast, WritingSpace, Note, StickerDesk}
}
</script>

<style scoped>
.container{
  display: grid;
  grid-template-columns: 50% 25% 25%;
  grid-template-rows: auto auto auto;
  gap: 10px;
  /* Автоматическое размещение в колонку */
  grid-auto-flow: column;
  height: 100vh;
}

.container > section {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(157, 123, 123, 0.6);
  border-radius: 15px;

}
</style>
