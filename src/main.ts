import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import lazy from './directive/lazy'
import './assets/css/index.css'
import 'normalize.css'
import './assets/iconfont/iconfont.css'

const app = createApp(App)

import { registerFuns } from './global'
registerFuns(app)

app.use(router).use(pinia).directive('lazy', lazy).mount('#app')
