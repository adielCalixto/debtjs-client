import { createApp } from 'vue'
import App from './App.vue'
import Unicon from 'vue-unicons'
import store from './store'
import axios from './services/axios'
import './services/vee'
import './services/icons'
import './assets/tailwind.css'

import router from './router'

const app = createApp(App)
app.provide('$axios', axios)
app.use(store).use(router).use(Unicon).mount('#app')