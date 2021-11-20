import { createApp } from 'vue'
import App from './App.vue'
import axios from './services/axios'
import store from './store'
import './assets/tailwind.css'

import router from './router'

const app = createApp(App)
app.provide('$axios', axios)
app.use(store).use(router).mount('#app')