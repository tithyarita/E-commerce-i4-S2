import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

// ✅ 1. create pinia FIRST
const pinia = createPinia()

// ✅ 2. install pinia BEFORE mount
app.use(pinia)

// ✅ 3. mount app
app.mount('#app')