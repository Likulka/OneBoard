<template>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard!</p>
    <div class="container">
      <SideMenu />
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
import SideMenu from "@/components/SideMenu.vue";



export default {
  name: 'Dashboard',
  components: {SideMenu, News, Forecast, WritingSpace, Note, StickerDesk}
}
</script>

<style scoped>
.container{
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 15px;
  grid-auto-flow: column;
  height: 100%;



}

.container > section {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(157, 123, 123, 0.6);
  border-radius: 15px;

}
</style>
