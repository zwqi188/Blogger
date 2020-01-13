<template>
  <el-row class="css-header">
    <el-col :span="3"><a href="#/main" class="css-title">记事本</a></el-col>
    <el-col :span="18">
      <a href="#/main/hotlist">发现</a>
      <a href="#/main/hotlist">关注</a>
      <a href="#/main/hotlist">分享</a>
      <a href="#/main/hotlist">消息</a>
    </el-col>
    <el-col :span="3"><a href="#/main/hotlist">二级</a></el-col>
  </el-row>
</template>

<script>
import avatarUrl from '@/assets/images/avatar.png'

export default {
  name: 'Header',
  data () {
    return {
      activeIndex: '1',
      circleUrl: avatarUrl
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.css-title {
  font-family: "Microsoft YaHei";
  font-size: 32px;
  font-weight: bold;
  color: #EB6E5E;
}
.div_header {
  background-color: #409EFF;
}
.el_my_func {
  float: right;
}
.line {
  height: 100px;
  background-color: #D46366;
}
</style>
