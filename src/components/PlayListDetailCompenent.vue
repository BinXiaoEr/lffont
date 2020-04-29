<template>
  <div>
    <div class="cover">
      <div class="main clearfix" v-if="data">
        <div class="show-img float-left">
          <img :src="data.playlist.picUrl" alt />
        </div>
        <div class="singer-info float-left">
          <h1>{{ data.playlist.name }}</h1>
          <el-button type="text" @click="open(data.playlist.desc)">歌单介绍</el-button>
          <!-- <p class="desc" v-html=" data.playlist.desc ">{{ data.playlist.desc |ellipsis}}</p> -->
          <ul class="mod-data">
            <li class="mod-data-item">
              单曲
              <strong>{{data.playlist.nums}}首</strong>
            </li>
            <li class="mod-data-item">
              歌曲类型
              <strong>{{data.playlist.tags}}</strong>
            </li>
          </ul>
          <div class="text-left">
            <span class="play_more_btn" @click="toPlay">播放全部单曲</span>
          </div>
        </div>
      </div>
    </div>
    <div class="songlist main">
      <h2>歌单歌曲</h2>
      <ul class="songlist_item odd clearfix">
        <li class="float-left songlist_name">歌曲</li>
        <li class="float-left songlist_album">专辑</li>
        <li class="float-left songlist_album">歌手</li>
        <!-- <li class="float-left songlist_time">时长</li> -->
      </ul>
      <div v-if="data">
        <ul
          v-show="index<10 || showMore"
          :class="(index%2==0?'even ':'odd ') +' songlist_item clearfix'"
          v-for="(item, index) in data.songlist"
          :key="index"
        >
          <li class="float-left songlist_index">{{ index+1 }}</li>
          <li v-if="item.banned" class="float-left songlist_name">
            <span>{{ item.title }}</span>
            <span class="banned">（无版权）</span>
          </li>
          <li v-else class="float-left songlist_name">
            {{ item.title }}
            
            <router-link class="inline-block"  v-bind:to="'/play/song/'+item.id">
              <span class="play">
                <i class="el-icon-service"></i>
              </span>
            </router-link>
          </li>
          <li class="float-left songlist_album">{{ item.album | ellipsis }}</li>
          <li class="float-left songlist_album">
            <router-link
              class="inline-block"
             
              v-bind:to="'/singer/'+item.sid"
            >{{ item.sname | ellipsis }}</router-link>
          </li>
        </ul>
        <div class="text-center">
          <el-button class="max-width" type="success" @click="getMore">{{showMore?"收起":"显示更多"}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import service from "../service/BaseDao";
export default {
  name: "PlayListDetailComponent",
  props: ["playlistId"],
  created() {
    const playlistId = this.playlistId;
    // console.log(playlistId);
    this.getplaylist(playlistId);
    this.url = "/play/playlist/" + playlistId;
  },
  data() {
    return {
      data: null,
      showMore: false
    };
  },
  methods: {
    getplaylist() {
      service.post("/playlist/info/", { id: this.playlistId }).then(data => {
        this.data = data.data;

      });
    },
    //  显示更多内容
    getMore() {
      this.showMore = !this.showMore;
    },
    // 整个歌单播放
    toPlay() {
      let newwindow = this.$router.resolve(this.url);
      window.open(newwindow.href, "_blank");
    },
    open(info) {
      this.$alert({
        title: "html片段",
        message: info,
        dangerouslyUseHTMLString: true
      });
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 20) {
        return value.slice(0, 20) + "...";
      }
      return value;
    }
  }
};
</script>

<style scoped>
.cover {
  height: 330px;
  padding: 40px 0;
  background: #fafafa;
}
.show-img img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
}
.singer-info {
  width: 895px;
  padding-left: 65px;
}
.singer-info h1 {
  font-size: 38px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  margin-right: 10px;
}
.singer-info .desc {
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 2px;
}
.play_more_btn {
  min-width: 122px;
  text-align: center;
  border: 1px solid #ff6600;
  background-color: #ff6600;
  color: #fff;
  cursor: pointer;
  border-radius: 2px;
  font-size: 14px;
  margin-right: 6px;
  padding: 0 23px;
  height: 38px;
  line-height: 38px;
  display: inline-block;
  white-space: nowrap;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 20px;
  transition: all 0.3s;
}
.play_more_btn:hover {
  background-color: #ff6600;
}
.mod-data-item {
  display: inline-block;
  border-right: solid 1px #c9c9c9;
  text-align: center;
  padding-right: 20px;
  margin-right: 20px;
  font-size: 18px;
}
.mod-data-item strong {
  font-size: 25px;
  font-weight: 400;
  margin-left: 10px;
}
.songlist h2 {
  font-size: 24px;
  font-weight: 400;
  line-height: 58px;
}
.songlist_item {
  height: 50px;
  line-height: 50px;
  background-color: #fbfbfd;
  color: #999;
  position: relative;
}
.odd {
  background-color: #fbfbfd;
}
.even {
  background-color: #ffffff;
  color: #333;
}
.play {
  color: #31c27c;
  font-size: 18px;
  margin-left: 20px;
  cursor: pointer;
}
.songlist_index {
  position: absolute;
  top: 0;
  left: 20px;
  color: #999;
  width: 36px;
}
.songlist_name {
  width: 47.685185%;
  white-space: normal;
  padding-left: 4em;
  height: 50px;
}
.songlist_album {
  padding-left: 20px;
  width: 25.5%;
}
.songlist_time {
  position: absolute;
  top: 0;
  right: 38px;
  width: 50px;
}
.banned {
  color: #c20c0c;
}
/* .el-button{
  background-color:#ff6600;
  border-color:#ff6600
} */
</style>


