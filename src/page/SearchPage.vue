<template>
  <div>
    <Header />
    <div>
      <div class="search-form">
        <el-input
          class="search-input"
          v-model="searchVaue"
          placeholder="搜索音乐、歌手"
          suffix-icon="el-icon-search"
          @keyup.enter.native="submit"
        ></el-input>
      </div>
      <div class="main">
        <div class="songlist_item odd clearfix">
          <div class="float-left songlist_name">歌曲</div>
          <div class="float-left songlist_album">歌手</div>
          <div class="float-left songlist_album">专辑</div>
          <!-- <div class="float-left songlist_time">时长</div> -->
        </div>
        <ul v-if="currentPage">
          <li
            :class="(index%2==0?'even ':'odd ') +' songlist_item clearfix'"
            v-for="(item, index) in currentPage"
            :key="index"
          >
            <div class="songlist_index">{{ index+1 }}</div>
            <div class="songlist_name">
              <!-- <span>{{ item.title |ellipsis}}</span> -->
              <router-link target="_blank" v-bind:to="'/play/song/'+item.id">
              <span>{{ item.title |ellipsis}}</span>
                <!-- <span class="play">
                  <i class="el-icon-service"></i>
                </span> -->
              </router-link>
            </div>
            <div class="songlist_album">
              <router-link :to="'/singer/'+item.singid">{{item.singname}}</router-link>
            </div>
            <div class="songlist_album">{{ item.album }}</div>
          </li>
        </ul>
        <div v-if="currentPage" class="text-center">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="quryinfo.page"
        @current-change="getPageChange"
        class="text-center"
      ></el-pagination>
    </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import service from "../service/BaseDao";
export default {
  name: "Artists",
  components: {
    Header
  },
  data() {
    return {
      searchVaue: "",
      size: 10,
      pageIndex: 0,
      currentPage: null,
      searchData: [],
      keyword: null,
      total: null,
      quryinfo: {
        page: 1,
        pagesize: 10
      },
      userid:"",
      username:''
    };
  },
  created() {
    console.log(window.location.href);
    this.keyword = decodeURI(window.location.href).split("key=")[1];
    console.log(this.keyword);
    this.getSearch(this.keyword, this.quryinfo);
    this.username = this.$cookie.get("username");
    this.userid = this.$cookie.get("userid");
  },
  methods: {
    getSearch(keyword, queryinfo) {
      service
        .post("/song/search/", {
          keyword: keyword,
          quryinfo: queryinfo
        })
        .then(data => {
          this.currentPage = data.data.data;
          this.total = data.data.total;
        });
    },
    submit() {
      this.$router.push(`/search?key=${this.searchVaue}`);
      this.keyword = this.searchVaue;
      this.quryinfo = {
        page: 1,
        pagesize: 10
      };
      this.getSearch(this.keyword, this.quryinfo);
    },
    getPageChange(page) {
      this.quryinfo.page = page;
      this.getSearch(this.keyword, this.quryinfo);
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 15) {
        return value.slice(0, 15) + "...";
      }
      return value;
    }
  }
};
</script>

<style scoped>
.main {
  margin-left: 20%;
}
/* .text-center {
  margin-left: 15%;
} */
.search-form {
  position: relative;
  height: 247px;
  background-position: 50%;
  background-size: cover;
  background-image: url("../assets/images/bg_search.jpg");
  text-align: center;
  line-height: 247px;
}
.search-input {
  width: 554px;
  height: 50px;
}

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
.mod-data-item {
  display: inline-block;
  border-right: solid 1px #c9c9c9;
  text-align: center;
  padding-right: 20px;
  margin-right: 20px;
  font-size: 18px;
}
.play {
  color: #31c27c;
  font-size: 18px;
  margin-left: 20px;
  cursor: pointer;
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
.songlist_index {
  position: absolute;
  top: 0;
  left: 20px;
  color: #999;
  width: 36px;
}
.songlist_name {
  width: 500px;
  white-space: normal;
  padding-left: 4em;
  display: inline-block;
}
.songlist_album {
  padding-left: 20px;
  width: 200px;
  display: inline-block;
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
</style>
