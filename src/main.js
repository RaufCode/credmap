import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'


axios.defaults.baseURL = "https://staging.afcfta.app/api/"
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(toast)

app.mount('#app')
