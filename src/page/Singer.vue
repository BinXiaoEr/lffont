<template>
  <el-container class="home-container">
    <el-header class="header" style="height:90px">
       <Header />
    </el-header>
    <el-main>
       <SingerComponent :singerId="singerId" />
    </el-main>
    <!-- <el-footer>
      <el-row>
        <el-col :span="24">
          <div class="footer">
            <p>© 2020 - 05 - 湖南科技大学毕业设计 - 音乐推荐系统</p>
            <p>- 本站采用 vue+ element-ui 搭建 -</p>
          </div>
        </el-col>
      </el-row>
    </el-footer> -->
  </el-container>
</template>


<script>
import service from "../service/BaseDao";
import splitArray from "../util/splitArray";
import SingerComponent from '../components/SingerComponent'
import Header from "../components/Header";
export default {
  name:'Singer',
   components: {
    SingerComponent,
    Header
  },
  data() {
    return {
      singerId:0,
    };
  },
  created() {
    let match = window.location.href.split("/");
    let id = match.slice(-1)[0]; // 获取id
    this.singerId =id;
  },
  methods: {
    // 获取推荐歌单歌单
    
    logout() {}
  }
};
</script>

<style lang="less" scoped>
// 全局css
#app .el-footer {
  padding: 0;
}
#app .el-header {
  padding: 0;
}
#app .el-main {
  padding: 0;
}
// hear样式
.home-container {
  height: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
}
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
.inputsearch {
  position: absolute;
}
// footer 底部样式
.footer {
  padding: 20px 0;
  color: #999;
  background-color: #333;
  text-align: center;
  font-size: 18px;
}
</style>
  
