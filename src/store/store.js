// store.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
        isMenuVisible: true, // Видимость меню (изначально видимо)
    },
    mutations: {
        toggleMenuVisibility(state) {
            state.isMenuVisible = !state.isMenuVisible;
        },
    },
});

export default store;
