<template>
  <div class="header">
    <div class="main clearfix">
      <div class="logo"><img src="../assets/images/logo.png" alt=""></div>
        <ul class="header-nav clearfix">
          <li v-for="(item, index) in navigations" :key="index" @click="active(index)">
              <router-link v-bind:class="activeIndex===index?'nav-link-active':''" v-bind:to="item.path">{{ item.name }}</router-link>
          </li>
        </ul>
        <div class="search-container"><el-input v-model="searchVaue" placeholder="搜索音乐、歌手" suffix-icon="el-icon-search" @keyup.enter.native="submit"></el-input></div>
        <div class="login">
          <span v-if="username">
            <div class="userbtn">{{username}} <span class="layouticon"> | <router-link v-bind:to="'/login'"> 注销</router-link></span></div>
          </span>
          <span v-else>
           <router-link v-bind:to="'/login'"> 登录 | 注册</router-link>
          </span>
        </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "Heardernew",
  components:{
  
  },
  created(){
    let match = window.location.href.split("/");
    let name = match.slice(-1)[0]; // 获取插叙的type 字段
    let infos={'homepage':0,'artists':1}
    this.activeIndex=infos[name]
    let token=window.sessionStorage.getItem('token')
    // this.username=token.split('|**|')[1].split('"')[0]
    // this.userid=token.split('|**|')[0]
    this.username=this.$cookie.get('username')
    this.userid=this.$cookie.get('userid')
  },
  data() {
    return {
      navigations: [
        {
          key: 0,
          name: "首页",
          path: "/homepage"
        },
        {
          key: 1,
          name: "歌手",
          path: "/artists"
        },
        {
          key: 4,
          name: "歌单",
          path: "/playlists"
        },
        // {
        //   key: 5,
        //   name: "MV",
        //   path: "/mv"
        // }
      ],
      activeIndex: 0,
      searchVaue: '',
      username:'',
      userid:''
    };
  },

  methods: {

    // changeUser() {
    //   this.$cookies.remove('username');
    //   this.$router.push('/login');
    //   this.$router.push('/');
    // },
    active(index) {
      this.activeIndex = index;
    },
    // submit(){
    //   this.$router.push(`/search?key=${this.searchVaue}`)
    // }
    submit(){
      this.$router.push(`/search?key=${this.searchVaue}`)
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 90px;
  line-height: 90px;
  border-bottom: 1px solid #cccccc;
}
.logo {
  float: left;
  width: 170px;
  margin-right: 22px;
  height: 90px;
}
.logo img {
  width: 100%;
  vertical-align: middle;
}
.header-nav{
  float: left;
  margin-left: 50px;
}
.header-nav li {
  float: left;
  margin-right: 5px;
}
.nav-link-active {
  background-color: #31c27c;
  color: #fff !important;
}
.header-nav li a {
  display: block;
  padding: 0 30px;
  line-height: 90px;
  height: 90px;
  text-align: center;
  font-size: 18px;
  transition: all .5s;
}
.header-nav li a:hover {
  color: #31c27c;
}
.search-container{
  float: left;
  width: 220px;
}
.login{
  position: absolute;
  margin-left: 80%;
  font-size: 18px;
  width: 220px;
}
.father-ul li:hover .drop-div {
  display: block;
}
.drop-div {
  display: none;
}
</style>
