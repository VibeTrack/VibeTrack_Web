import './assets/main.css'
import 'animate.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './RootLayout.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
