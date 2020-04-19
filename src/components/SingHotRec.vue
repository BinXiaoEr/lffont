<template>
  <div class="recommend-wrap">
    <div class="recommend">
      <h2 class="title">歌手推荐</h2>
      <el-carousel v-bind:autoplay="false" arrow="always" height="350px">
        <el-carousel-item v-for="(page, pindex) in singlist" :key="pindex">
          <ul class="main clearfix">
            <li v-for="(item, index) in page" :key="index" class="song-menu-item clearifx">
              <div class="show-img scale-img">
                <router-link target="_blank" v-bind:to="'/singer/'+item.id">
                  <img v-bind:src="item.picUrl" alt />
                  <div class="mask">
                    <i class="el-icon-caret-right"></i>
                  </div>
                </router-link>
              </div>
              <h3 class="nowrap-text">
                <router-link target="s" v-bind:to="'/singer/'+item.id">{{ item.singer }}</router-link>
              </h3>

            
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingHotRec",
  props: ["singlist"]
};
</script>

<style scoped>
.recommend-wrap {
  background: #ffffff;
  height: 530px;
  padding: 20px;
}
.recommend {
}
.song-menu {
  height: auto;
}
.title {
  font-size: 32px;
  text-align: center;
}
.song-menu-item {
  padding-left: 100px;
  width: 33.3%;
  float: left;
  padding-right: 15px;
}
/* .show-img{
    position: relative;
    float: left;
    width: 86px;
    height: 86px;
    margin-right: 14px;
    overflow: hidden;
} */
.show-img {
  position: relative;
  width: 230px;
  height: 230px;
  overflow: hidden;
  transition: all 0.3s;
}
.show-img:hover .mask {
  opacity: 1;
}
.mask {
  opacity: 0;
  transition: all 0.3s;
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  color: #ffffff;
  font-size: 60px;
  padding-top: 70px;
  padding-left: 75px;
}
</style>
