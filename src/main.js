/*
 * @Author: your name
 * @Date: 2021-07-16 11:06:15
 * @LastEditTime: 2021-07-19 00:19:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_shoponline\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElemenUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.prototype.$http = axios
Vue.prototype.$message = Message

axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.use(ElemenUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
