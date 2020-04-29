<template>
  <div class="rank-container">
    <div class="main clearfix">
      <div class="tabnav float-left">
        <ul>
          <li class="rank-header">热门歌单分类</li>
          <li
            @click="()=>changeIndex(index,item.id)"
            v-for="(item, index) in palytas"
            :key="index"
            :class="index===activeIndex?'active-item':''"
          >
            <span>{{item.name}}</span>
          </li>
          <li>
            <el-pagination
              @current-change="handlePageTags"
              :current-page="tagqueryInfo.pagenum"
              :page-size="tagqueryInfo.pagesize"
              layout="pager"
              :total="total_tags"
              class="el-pagination-tag"
            ></el-pagination>
          </li>
        </ul>
      </div>
      <div class="rank-content float-left">
        <el-table :data="[]" style="width: 100%; heoght:200px" v-if="!currentRankData"></el-table>
        <ul v-if="currentRankData">
          <li class="rank-header">{{tag_name}}类型歌曲</li>
          <!-- <li class="rank-header text-left"><span class="play_more_btn" @click="toPlay">播放全部单曲</span></li> -->
          <li
            v-for="(item, index) in currentRankData"
            :key="index"
            :class="(index%2==0?'even ':'odd ') +' rank-item clearfix'"
          >
            <div class="float-left song-index">{{ index +1}}</div>
            <div class="float-left song-name">
              <router-link  v-bind:to="'/playdetail/'+item.id">
                <img :src="item.picUrl" alt />
                <span>{{ item.title }}</span>
              </router-link>
              
              <router-link  v-bind:to="'/play/playlist/'+item.id">
                <span class="play">
                  <i class="el-icon-service"></i>
                </span>
              </router-link>
            </div>
            <div class="float-left song-artist v-mid nowrap-text">{{item.artist}}</div>
            <!-- <div class="float-left song-time">{{item.playTime}}</div> -->
          </li>
        </ul>
        <el-pagination
          @current-change="handlePagePlaylist"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1,2,5,10]"
          :page-size="queryInfo.pagesize"
          layout="total, prev, pager, next"
          :total="total_playlist"
          class="paginationp_playlist"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import service from "../service/BaseDao";
export default {
  name: "PlaylistComponent",
  data() {
    return {
      palytas: [],
      activeIndex: 0,
      loading: false,
      currentRankData: null,
      tagtitle: null,
      total_playlist: null,
      total_tags: null,
      tag_id: 11,
      tag_name:'流行类歌单',
      queryInfo: {
        pagenum: 1,
        pagesize: 10
      },
      tagqueryInfo: {
        pagenum: 1,
        pagesize: 15
      }
    };
  },
  created() {
    this.getplaytags();
    // console.log(this.mosttag)

    this.get_ongtag_play(this.tag_id, this.queryInfo);
  },
  methods: {
    // 根据tag标签转换
    changeIndex(index, id) {
      this.activeIndex = index;
      this.tag_id = id;
      this.queryInfo = {
        pagenum: 1,
        pagesize: 10
      };
      this.get_ongtag_play(id, this.queryInfo);
    },
    // 获取所有tag
    getplaytags() {
      service
        .post("/playlist/alltags/", { queryinfo: this.tagqueryInfo })
        .then(data => {
          this.palytas = data.data.data;
          this.total_tags = data.data.total;
        });
    },
    // 获取tag下的所有歌单
    get_ongtag_play(id) {
      service
        .post("/playlist/tag_playlist/", { id: id, queryinfo: this.queryInfo })
        .then(data => {
          this.currentRankData = data.data.data;
          this.total_playlist = data.data.total;
          this.tag_name=data.data.tagname
        });
    },
    handlePagePlaylist(page) {
      this.queryInfo.pagenum = page;
      this.get_ongtag_play(this.tag_id, this.queryInfo);
    },
    handlePageTags(page) {
      this.tagqueryInfo.pagenum = page;
      this.getplaytags();
      this.activeIndex=-1
    }
  }
};
</script>

<style  lang="less" scoped>
.paginationp_playlist {
  margin: 15px;
  margin-left: 200px;
}
.el-pagination-tag{
  margin-left: 20px;
}
.rank-container {
  padding: 0 20px;
  background: url("../assets/images/bg_detail.jpg") repeat-x;
}
.tabnav {
  width: 178px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(153, 153, 153, 0.2);
}
.tabnav span {
  font-size: 15px;
  display: block;
  line-height: 22px;
  padding: 8px 17px;
  cursor: pointer;
}
.active-item {
  background-color:  #FF6600	;
  color: #fff;
}
.tabnav span:hover {
  background-color:  #FF6600	;
  color: #fff;
}
.rank-header {
  line-height: 60px;
  font-size: 20px;
  font-weight: 400;
  border-bottom: 1px solid #ebebeb;
  text-align: center;
}

.rank-content {
  width: 900px;
  margin-left: 40px;
}
.rank-item {
  height: 80px;
  line-height: 80px;
  overflow: hidden;
}
.song-index {
  width: 60px;
  text-align: right;
  font-size: 24px;
  color: #333;
}
.song-name {
  width: 550px;
  float: left;
  padding-left: 80px;
}
.song-name img {
  width: 70px;
  height: 70px;
  vertical-align: middle;
  margin-right: 20px;
}
.song-artist {
  margin-right: 20px;
  width: 200px;
  float: left;
  padding-right: 30px;
}
.odd {
  background-color: #fbfbfd;
}
.even {
  color: #333;
}
.banned {
  color: #c20c0c;
}
.play {
  color: #31c27c;
  font-size: 18px;
  margin-left: 20px;
  cursor: pointer;
}
.play_more_btn {
  min-width: 122px;
  text-align: left;
  border: 1px solid #31c27c;
  background-color: #31c27c;
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
  background-color: #009a61;
}
</style>

