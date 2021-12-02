import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import axios from './services/axios'
import './services/vee'
import './assets/tailwind.css'

import router from './router'

const app = createApp(App)
app.provide('$axios', axios)
app.use(store).use(router).mount('#app')