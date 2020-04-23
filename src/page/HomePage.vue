<template>
  <el-container class="home-container">
    <el-header class="header" style="height:90px">
      <!-- 头部样式 -->
      <Header />
    </el-header>
    <el-main>
      <!-- 歌单推荐 -->
      <PlayListHotRec :playlist="playlist" />
      <!-- 歌手推荐 -->
      <SingHotRec :singlist="singlist" />
      <!-- 歌曲推荐 -->
      <SongHotRec :songlist="songlist" />
    </el-main>
    <!-- <el-footer>
      <el-row>
        <el-col :span="24">
          <div class="footer">
            <p>2020 - 05 - 湖南科技大学毕业设计 - 音乐推荐系统</p>
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
import SingHotRec from "../components/SingHotRec";
import PlayListHotRec from "../components/PlayListHotRec";
import SongHotRec from "../components/SongHotRec";
import Header from "../components/Header";
export default {
  name: "Index",
  components: {
    Header,
    SingHotRec,
    PlayListHotRec,
    SongHotRec
  },
  data() {
    return {
      playlist: [],
      songlist: [],
      singlist: []
    };
  },
  created() {
    this.getplaylist(); // 获取推荐歌单
    this.getsinglist(); // 获取推荐歌手
    this.getsonglist(); // 获取推荐歌曲
  },
  methods: {
    // 获取推荐歌单歌单
    getplaylist() {
      service.post("/playlist/hotrec/", {}).then(data => {
        this.playlist = splitArray(data.data, 5);
      });
    },
    // 获取歌手推荐
    getsinglist() {
      service.post("/sing/hotrec/", {}).then(data => {
        this.singlist = splitArray(data.data, 5);
      });
    },
    // 获取歌曲推荐
    getsonglist() {
      service.post("/song/hotrec/", {}).then(data => {
        this.songlist = splitArray(data.data, 9);
      });
    },
    //
    logout() {}
  }
};
</script>

<style lang="less" scoped>
// 全局css
#app .el-footer {


  bottom: 0;
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

// footer 底部样式
.footer {
  padding: 20px 0;
  color: #999;
  background-color: #333;
  text-align: center;
  font-size: 18px;
}
</style>
  
