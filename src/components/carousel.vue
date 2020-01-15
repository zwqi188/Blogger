<template>
  <div>
    co
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in imageList" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  data () {
    return {
      imageList: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576518724394&di=6a63946a4181a269e01d8c0a5a2f4792&imgtype=0&src=http%3A%2F%2Fwww.16aspx.com%2Fcmsimages%2F20170217%2F926992019.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576518724393&di=3389c210c1fdb96064558c2f3026748e&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01596058196af1a84a0e282bfcac74.jpg']
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
