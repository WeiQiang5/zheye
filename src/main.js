import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './route/router'
import 'bootstrap/dist/css/bootstrap.min.css'

import store from './store/store'
import mitt from 'mitt'

const app = createApp(App)

// 替换 baseURL
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// 下面的 icode 值是从慕课网获取的 token 值，可以在课程右侧的项目接口校验码找到
axios.interceptors.request.use(config => {
  // 添加加载图标
  store.commit('setLoading', true)
  console.log('拦截器', config)
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: 'F6200B9F42ED1107' }
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', 'F6200B9F42ED1107')
  } else {
  // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: 'F6200B9F42ED1107' }
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)

  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 挂载到全局
app.config.globalProperties.$mitt = mitt()

app.use(router).use(store).mount('#app')
