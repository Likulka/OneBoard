<template>
	<!--    <h1>Dashboard</h1>-->
	<!--    <p>Welcome to your dashboard!</p>-->
	<SideMenu v-if="isMenuVisible" />
	<div :class="['container', { 'menu-visible': isMenuVisible }]">
		<Note />
		<StickerDesk />
		<WritingSpace />
		<Forecast />
		<News />
	</div>
</template>

<script>
import Forecast from '@/components/Forecast.vue'
import News from '@/components/News.vue'
import Note from '@/components/Note.vue'
import SideMenu from '@/components/SideMenu.vue'
import StickerDesk from '@/components/StickerDesk.vue'
import WritingSpace from '@/components/WritingSpace.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'Dashboard',
	components: { SideMenu, News, Forecast, WritingSpace, Note, StickerDesk },
	setup() {
		const store = useStore()
		const isMenuVisible = computed(() => store.state.isMenuVisible) // Получаем состояние видимости меню
		return { isMenuVisible }
	},
}
</script>

<style scoped>
.container {
	display: grid;
	grid-template-columns: 2fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	grid-auto-flow: column;
	height: 100%;
}

.menu-visible {
}

.container > section {
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid rgba(157, 123, 123, 0.6);
}
</style>
