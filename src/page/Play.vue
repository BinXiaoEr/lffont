<template>
  <div class="detail-container" v-bind:style="fullSceen">
    <div class="detail-header">
      <h1>{{title}}</h1>

      <div class="return" @click="getreturn">返回</div>
    </div>

    <div class="main clearfix">
      <aplayer
        v-if="songlistData.length"
        :list="songlistData"
        autoplay
        preload="auto"
        :controls="true"
        :showLrc="true"
        :music="songlistData[currentMusicIndex]"
        :listMaxHeight="listHeight"
        @loadeddata="getinfo($event)"
      />
    </div>
  </div>
</template>
<script>
import service from "../service/BaseDao";
import Aplayer from "vue-aplayer";
export default {
  components: {
    Aplayer
  },
  data() {
    return {
      currentMusicIndex: 0,
      songlistData: [],
      fullSceen: {
        height:
          (document.documentElement.clientHeight ||
            document.body.clientHeight) + "px",
        "overflow-y": "hidden"
      },
      listHeight:
        (document.documentElement.clientHeight || document.body.clientHeight) -
        65 -
        100 +
        "px",
      title: "",
      userid: "",
      username: ""
    };
  },
  created() {
    let result = null;
    let match = window.location.href.split("/");
    let id = match.slice(-1)[0]; // 获取插叙的type 字段
    let tyep = match.slice(-2)[0]; // 获取id
    this.getsongs(tyep, id);
    this.username = this.$cookie.get("username");
    this.userid = this.$cookie.get("userid");
  },
  methods: {
    getreturn() {
      this.$router.go(-1);
    },
    getsongs(tyep, id) {
      service.post("/song/play/", { type: tyep, id: id }).then(data => {
        this.songlistData = data.data.data;
        this.title = data.data.title;
      });
    },
    // 只要音乐数据加载完成 说明已经在播放音乐 要记录播放音乐信息
    getinfo(e) {
      let mp3url = e.target.currentSrc;
      let song_id = mp3url.split("=")[1].split(".")[0];
      // console.log(song_id)
      let match = window.location.href.split("/");
      let id = match.slice(-1)[0]; // 获取插叙的type 字段
      let tyep = match.slice(-2)[0]; // 获取id
      let rq_data = {
        type: tyep,
        id: id,
        userid: this.userid,
        songid: song_id
      };
      // console.log(rq_data)
      service.post("/user/history/", rq_data).then(data => {});
    }
  }
};
</script>


<style lang="less" scoped>
.return {
  font-size:20px ;
  color: #00008B;
}
.detail-container {
  background-color: #292a2b;
}
.detail-header h1 {
  margin: 0;
  padding: 10px 0;
  border-bottom: 1px solid #cccccc;
}
.detail-header h1 a {
  color: #ff6600;
}
.detail-header h1 a:hover {
  color: #ff6600;
}
.detail-header {
  color: #ff6600;
  text-align: center;
}
.music-list {
  color: #ff6600;
}
.music-list-item {
  font-size: 16px;
  margin: 15px 0;
  text-align: left;
}
.music-list-item a {
  color: #cccccc;
}
.music-list-item a:hover {
  color: #cccccc;
}
.song-name {
  display: inline-block;
  width: 390px;
}
.song-singer {
  display: inline-block;
  width: 180px;
}
.playTime {
  display: inline-block;
  width: 180px;
}
.lyrics {
  width: 350px;
}
</style>