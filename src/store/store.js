// store.js
import { createStore } from 'vuex'

const store = createStore({
	state: {
		isMenuVisible: false, // Видимость меню (изначально видимо)
	},
	mutations: {
		toggleMenuVisibility(state) {
			state.isMenuVisible = !state.isMenuVisible
		},
		setMenuVisibility(state, isVisible) {
			state.isMenuVisible = isVisible
		},
	},
})

export default store
