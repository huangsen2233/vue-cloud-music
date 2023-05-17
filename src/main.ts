import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/index.css'
import 'normalize.css'
import './assets/iconfont/iconfont.css'
import router from './router'
import pinia from './stores'

const app = createApp(App)

import { registerFuns } from './global'
registerFuns(app)

app.use(router).use(pinia).mount('#app')
