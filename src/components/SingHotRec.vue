<template>
  <div class="recommend-wrap">
    <div class="recommend">
      <h2 class="title">热门歌手</h2>
      <el-carousel v-bind:autoplay="false" arrow="always" height="350px">
        <el-carousel-item v-for="(page, pindex) in singlist" :key="pindex">
          <ul class="main clearfix">
            <li v-for="(item, index) in page" :key="index" class="song-menu-item clearifx">
              <!-- <div class="show-img scale-img"> -->
              <div class="show-img scale-img float-left">
                <router-link v-bind:to="'/play/sing/'+item.id">
                  <img v-bind:src="item.picUrl" alt />
                  <div class="mask">
                    <i class="el-icon-caret-right"></i>
                  </div>
                </router-link>
              </div>
              <div class="show-content float-left">
                <h3 class="nowrap-text">
                  <router-link  v-bind:to="'/singer/'+item.id">{{ item.singer }}</router-link>
                </h3>
              </div>
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


<style  lang="less" scoped>
.recommend-wrap {
  background: #ffffff;
  height: 450px;
  padding-top:5px ;
  /* padding: 5px; */
}
.song-menu{
  height: auto;;
}
h3{
  margin: 5px 0;
}
.nowrap-text{
  margin-left:80px ;
}
.title {
  font-size: 32px;
  text-align: center;
}
.song-menu-item {
  width: 20%;
  float: left;
  padding: 0 20px;
  overflow: hidden;
}
.show-img{
  position: relative;
  width: 230px;
  height: 230px;
  overflow: hidden;
  transition: all .3s;
}
.show-img:hover .mask{
  opacity: 1;
}
.mask{
  opacity: 0;
  transition: all .3s;
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
