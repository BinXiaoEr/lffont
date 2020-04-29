import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue';
// import Welcome from '../components/Welcome.vue'
// import User from '../components/user/Users.vue'
import HomePage from '../page/HomePage.vue'
import play from '../page/Play.vue'
import Singer from '../page/Singer.vue'
import Artists from '../page/Artist.vue'
import PlayList from '../page/PlayList.vue'
import SearchPage from '../page/SearchPage.vue'
// import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import PlayListDetail from '../page/PlayListDetail.vue'
import UserPeformance from '../page/UserPerformance.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },// 重定向
  // { path: '/login', component: Login },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  // children 代表是子路由
  // {
  //   path: '/home', component: Home,
  //   redirect: '/welcome', //重定向到vue组件中
  //   children: [
  //     { path: '/welcome', component: Welcome },
  //     { path: '/30', component: User }
  //   ]
  // },
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
  },// 歌手详情
  {
    path: '/artists/:id?',
    name: 'Artists',
    component: Artists,
  }, //所有歌手页面
  {
    path: '/playlists',
    name: 'PlayList',
    component: PlayList,
  },
  // 查询页面
  {
    path: '/search*',
    name: 'search',
    component: SearchPage
  },
  {
    path: '/playdetail/:id',
    name: 'Playdeatil',
    component: PlayListDetail
  },// 歌手详情
  {
    path: '/minus',
    name: 'UserPeformance',
    component: UserPeformance
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转过来的
  // next 是一个函数 表示放心
  if (to.path == '/login') return next();
  if (to.path == '/register') return next();
  const token = window.sessionStorage.getItem('token') // 获取token 
  if (!token) return next('/login') // 如果token不存在或者校验不对 则 直接跳转到登录
  // 有token 则直接跳转到对应的页面
  next()

})
export default router
