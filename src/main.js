import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/store.js'; // импортируем наше хранилище


createApp(App).use(router).use(store).mount('#app')

