import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue';
import Welcome from '../components/Welcome.vue'
import User from '../components/user/Users.vue'
import HomePage from '../page/HomePage.vue'
import play from '../page/Play.vue'
import Singer from '../page/Singer.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },// 重定向
  { path: '/login', component: Login },
  // children 代表是子路由
  {
    path: '/home', component: Home,
    redirect: '/welcome', //重定向到vue组件中
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/30', component: User }
    ]
  },
  {
    path:'/homepage',component:HomePage
  },
  {
    path:'/play/play*/:id',component:play
  }, // 根据歌单播放
  {
    path:'/play/sing*/:id',component:play
  },//根据歌手播放
  {
    path:'/play/song*/:id',component:play
  },//根据歌曲播放
  {
    path: '/singer/:id',
    name: 'Singer',
    component: Singer
  },
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {

//   // to 将要访问的路径
//   // from 代表从哪个路径跳转过来的
//   // next 是一个函数 表示放心
//   if (to.path == '/login') return next();
//   const token = window.sessionStorage.getItem('token') // 获取token 
//   if (!token) return next('/login') // 如果token不存在或者校验不对 则 直接跳转到登录
//   // 有token 则直接跳转到对应的页面
//   next()

// })
export default router
