<template>
  <div class="header">
    <div class="main clearfix">
      <div class="logo">
        <img src="../assets/images/logo3.jpg" alt />
      </div>
      <ul class="header-nav clearfix">
        <li v-for="(item, index) in navigations" :key="index" @click="active(index)">
          <router-link
            v-bind:class="activeIndex===index?'nav-link-active':''"
            v-bind:to="item.path"
          >{{ item.name }}</router-link>
        </li>
      </ul>
      <div class="search-container">
        <el-input
          v-model="searchVaue"
          placeholder="搜索音乐、歌手"
          suffix-icon="el-icon-search"
          @keyup.enter.native="submit"
        ></el-input>
      </div>
      <div class="login">
        <span v-if="username">
          <div class="userbtn">
            {{username}}
            <a class="layouticon" @click="mylogout">| 注销</a>
          </div>
        </span>

      </div>
    </div>
  </div>
</template>

<script>
import service from "../service/BaseDao";
export default {
  name: "Heardernew",
  components: {},
  created() {
    let match = window.location.href.split("/");
    let name = match.slice(-1)[0]; // 获取插叙的type 字段
    let infos = { homepage: 0, artists: 1 ,playlists:2};
    this.activeIndex = infos[name];
    let token = window.sessionStorage.getItem("token");
    this.username = this.$cookie.get("username");
    this.userid = this.$cookie.get("userid");
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
          key: 2,
          name: "歌单",
          path: "/playlists"
        }
      ],
      activeIndex: 0,
      searchVaue: "",
      username: "",
      userid: ""
    };
  },

  methods: {
    active(index) {
      this.activeIndex = index;
    },

    submit() {
      this.$router.push(`/search?key=${this.searchVaue}`);
    },
    mylogout() {
      var rq_data = {
        useid: this.userid,
        username: this.username
      };
      console.log(rq_data)
      service.post("/user/logout/",rq_data).then(data => {
        
        if (data.data.state == 1) {
          this.$message({
            // this.$message 是自定义的全局的一个组件
            message: "注销成功请重新登录",
            type: "success",
            duration:1000
          });
          this.$router.push("/login");
          window.sessionStorage.clear();
        }
      });
      
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
  margin-left: 20px;
}
.logo img {
  width: 100%;
  height: 90%;
  vertical-align: middle;
}
.header-nav {
  float: left;
  margin-left: 150px;
}
.header-nav li {
  float: left;
  margin-right: 5px;
}
.nav-link-active {
  background-color: #FF6600	;
  color: #fff !important;
}
.header-nav li a {
  display: block;
  padding: 0 30px;
  line-height: 90px;
  height: 90px;
  text-align: center;
  font-size: 18px;
  transition: all 0.5s;
}
.header-nav li a:hover {
  color:  #FF6600;
}
.search-container {
  float: left;
  width: 220px;
  margin-left:50px ;
}
.login {
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
