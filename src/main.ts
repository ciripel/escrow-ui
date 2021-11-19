import { createApp } from 'vue'
import Header from './Header.vue'
import App from './App.vue'
import router from './router'

const headApp = createApp(Header)
const app = createApp(App)

app.use(router)

headApp.mount('#header')
app.mount('#app')
