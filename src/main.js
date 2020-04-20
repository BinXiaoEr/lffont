import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式表
// 导入字体图标
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false
// 导入发送请求的包
import axios from 'axios'
// 配置请求的根路径
// axios.defaults.baseURL='http://127.0.0.1:8888/'
// 注册axios 到所有的 组件中可用
// Vue.prototype.$http = axios
// axios.interceptors.request.use(config => {
//   console.log(config)
//   console.log(1111)
//   return config
// })
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
