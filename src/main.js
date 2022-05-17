import { createApp } from 'vue'
import App from './App.vue'
import router from './route/router'
import 'bootstrap/dist/css/bootstrap.min.css'

import store from './store/store'
import mitt from 'mitt'

const app = createApp(App)

// 挂载到全局
app.config.globalProperties.$mitt = mitt()

app.use(router).use(store).mount('#app')
