<template>
	<aside v-if="isMenuVisible" class="side-menu" @click.stop id="sideMenu">
		<nav>
			<h2>DashMenu</h2>
		</nav>
	</aside>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isMenuVisible = computed(() => store.state.isMenuVisible) // Подключаемся к состоянию Vuex

function handleClickOutside(event) {
	if (!isMenuVisible.value) return

	const sideMenu = document.querySelector('.side-menu')
	if (sideMenu && !sideMenu.contains(event.target)) {
		store.commit('setMenuVisibility', false) // Скрываем меню
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>
<style>
.side-menu {
	width: 200px;
	height: 100vh;
	position: absolute;
	background-color: #2c3e50;
	top: 0;
	transition: transform 0.3s ease; /* Плавное выдвижение меню */
	z-index: 1000; /* Меню над контентом */
}

.menu-open {
	transform: translateX(0); /* Показываем меню */
}
</style>
