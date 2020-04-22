<template>
  <div class="detail-container" v-bind:style="fullSceen">
    <div class="detail-header">
      <h1>
        {{title}}
      </h1>
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
      title: ""
    };
  },
  created() {
    let result = null;
    let match = window.location.href.split("/");
    let id = match.slice(-1)[0]; // 获取插叙的type 字段
    let tyep = match.slice(-2)[0]; // 获取id
    this.getsongs(tyep, id);
  },
  methods: {
    getsongs(tyep, id) {
      service.post("/song/play/", { type: tyep, id: id }).then(data => {
        this.songlistData = data.data.data;
        this.title = data.data.title;
      });
    }
  }
};
</script>


<style lang="less" scoped>
.detail-container {
  background-color: #292a2b;
}
.detail-header h1 {
  margin: 0;
  padding: 10px 0;
  border-bottom: 1px solid #cccccc;
}
.detail-header h1 a {

  color:  #FF6600	;
}
.detail-header h1 a:hover {
  color:  #FF6600	;
}
.detail-header {
  color: #FF6600;
  text-align: center;
}
.music-list {
  color:  #FF6600;
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
  color: ;
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