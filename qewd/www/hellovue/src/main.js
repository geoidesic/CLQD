import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import QEWD from the qewd-client
import { QEWD } from 'qewd-client'

const app = createApp(App)

// add QEWD as a global property
// now you can use QEWD in all your app components as `this.$qewd.reply(...)`
app.config.globalProperties.$qewd = QEWD


app.use(createPinia())
app.use(router)

app.mount('#app')
