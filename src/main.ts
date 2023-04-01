import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/index.css'
import 'normalize.css'
import router from './router'
import pinia from './stores'

const app = createApp(App)

import registerIcons from './global/register-icon'
registerIcons(app)

app.use(router).use(pinia).mount('#app')
