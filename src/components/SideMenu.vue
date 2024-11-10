<template>
  <aside v-if="isMenuVisible" class="side-menu" id="sideMenu">
    <nav>
      <h2>DashMenu</h2>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isMenuVisible = computed(() => store.state.isMenuVisible); // Подключаемся к состоянию Vuex

</script>
<style>
.side-menu {
width: 200px;
//height: 100vh;
background-color: #2c3e50;
top: 0;
transition: transform 0.3s ease; /* Плавное выдвижение меню */
z-index: 1000; /* Меню над контентом */
}

.menu-open {
transform: translateX(0); /* Показываем меню */
}

</style>