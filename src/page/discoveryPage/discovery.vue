<template>
  <div class="block">
    <div class="css-carousel css-width7">
      <el-carousel :interval="5000" trigger="click" height="220px">
        <el-carousel-item v-for="item in imageList" :key="item">
          <h3 class="small"><img class="banner_img" :src="item.pic" @click="dirTarget(item.dir)" /></h3>
        </el-carousel-item>
      </el-carousel>
      <v-discoveryBlog></v-discoveryBlog>
    </div>
    <div class="css-recommend css-width3">
      <v-recommend></v-recommend>
    </div>
  </div>
</template>

<script>
import Recommend from '@/page/discoveryPage/recommend'
import DiscoveryBlog from '@/page/discoveryPage/discoveryBlog'
import kangji from '@/assets/images/kangji.jpg'
import theme from '@/assets/images/theme.jpg'

export default {
  name: 'discovery',
  components: {
    'v-recommend': Recommend,
    'v-discoveryBlog': DiscoveryBlog
  },
  methods: {
    dirTarget (dir) {
      if (dir) {
        window.location.href = dir
      }
    }
  },
  data () {
    return {
      imageList: [{pic: kangji, dir: 'https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_3'}, {pic: theme}]
    }
  }
}
</script>

<style scoped>
  .small {
    background: white;
  }
  .banner_img {
    border-radius: 10px;
  }
  .css-content div{
    float: left;
  }
  .css-carousel{
    float: left;
  }
  .css-recommend {
    height: 100px;
    float: left;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
