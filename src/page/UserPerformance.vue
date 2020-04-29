<template>
  <el-container class="home-container">
    <el-header class="header" style="height:90px">
      <Header />
    </el-header>
    <el-main>
      <!-- 历史播放记录 -->
      <div v-if="showinfo">
        <UserHisory :userhistory="userhistory" />
        <!-- 歌单推荐 -->
        <UserPlayListRec :playlist="playlist" />
        <!-- 歌手推荐 -->
        <UserSingRec :singlist="singlist" />
        <!-- 歌曲推荐 -->
        <UserSongRec :songlist="songlist" />
      </div>
      <div v-else>
        <div class="title">
          <h1>暂无播放记录</h1>
        </div>
      </div>
    </el-main>
  </el-container>
</template>


<script>
import service from "../service/BaseDao";
import splitArray from "../util/splitArray";
import UserSingRec from "../components/user/UserSingRec";
import UserPlayListRec from "../components/user/UserPlayListRec";
import UserSongRec from "../components/user/UserSongRec";
import UserHisory from "../components/user/UserHistory";
import Header from "../components/Header";
export default {
  name: "Index",
  components: {
    Header,
    UserSingRec,
    UserPlayListRec,
    UserSongRec,
    UserHisory
  },
  data() {
    return {
      playlist: [],
      songlist: [],
      singlist: [],
      userhistory: [],
      username: "",
      userid: "",
      loading: false,
      showinfo:true
    };
  },
  created() {
    this.username = this.$cookie.get("username");
    this.userid = this.$cookie.get("userid");
    this.getuserperformance();
    console.log(this.userid, this.username);
  },
  methods: {
    // 获取推荐歌单歌单
    getuserperformance() {
      var rq_data = {
        userid: this.userid,
        username: this.username
      };
      service.post("/user/performance/", rq_data).then(data => {
        // 歌手推荐
        this.singlist = splitArray(data.data.singlist, 5);
        // 歌单推荐
        this.playlist = splitArray(data.data.playlist, 5);
        // 歌曲推荐
        this.songlist = splitArray(data.data.songlist, 9);
        // 历史记录
        this.userhistory = splitArray(data.data.userhistory, 10);
        if (this.userhistory.length==0){
          this.showinfo=false
        }
        // console.log(data.data.userhistory);
        // console.log(this.songlist, this.userhistory);
      });
    }
  }
};
</script>

<style lang="less" scoped>
#app .el-footer {
  bottom: 0;
}
#app .el-header {
  padding: 0;
}
#app .el-main {
  padding: 0;
}
.title {
  margin: 0 auto;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 40%;
  font-size: 20px;
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
</style>
  
