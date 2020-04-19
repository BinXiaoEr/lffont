<template>
  <el-container class="home-container">
    <!-- hearer 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- container 是主页面区域 -->
    <el-container>
      <!-- aside 是侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏组件 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :router="true"
          :default-active="activepath" 
        >
        <!-- default-active="/30"  设置当前左测被激活颜色  -->
          <!-- 1级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuslist" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconobj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subitem.id+''" v-for="subitem in item.children" :key="subitem.id" @click="saveState('/'+subitem.id)">
              <!-- 二级菜单模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- main 是右边内容 -->
      <el-main>
        <!-- 放一个路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import service from "../service/BaseDao";
export default {
  // created 进这个界面自动调用
  data() {
    return {
      menuslist: [],
      iconobj: {
        "1": "iconfont icon-user",
        "2": "iconfont icon-tijikongjian",
        "3": "iconfont icon-shangpin",
        "4": "iconfont icon-danju",
        "5": "iconfont icon-baobiao"
      },
      // 被激活的链接地址
      activepath:''
    };
  },

  created() {
    this.getMenulist();
    this.activepath=window.sessionStorage.getItem('activepath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear(); // 清楚缓存
      this.$router.push("/login"); // 重定向到登录页面
    },
    // 获取所有的菜单
    getMenulist() {
      service.post("/user/menus/", {}).then(data => {
        if (data.state == 1) {
          this.menuslist = data.data;
          console.log(this.menuslist);
        }
        //console.log(data) data 是后台返回的json数据
      });
    },
    // 保存链接的激活状态
    saveState(activepath){
        window.sessionStorage.setItem('activepath',activepath)
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
.el-menu {
  border-right: none;
}
.iconfont {
  padding: 10px;
}
</style>


