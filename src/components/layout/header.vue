<template>
  <el-row class="css-header">
    <el-col :span="3"><a href="#/main" class="css-title">记事本</a></el-col>
    <el-col :span="18">
      <div class="css-title-memu">
        <a href="#/main/hotlist"><i class="el-icon-view"></i>发现</a>
        <a href="#/main/hotlist"><i class="el-icon-mobile"></i>关注</a>
        <a href="#/main/hotlist"><i class="el-icon-share"></i>分享</a>
        <a href="#/main/hotlist"><i class="el-icon-chat-dot-square"></i>消息</a>
      </div>
    </el-col>
    <el-col :span="3">
      <div class="div_welcome_right">
        <el-avatar :size="40" :src="circleUrl"></el-avatar>
      </div>
    </el-col>
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
.css-title-memu {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 25px;
  font-weight: normal;
  margin-top: 10px;
}
.css-title-memu a{
  float: left;
  width: 10%;
  color: #1a1a1a;
}
.css-title-memu a:active{
  float: left;
  width: 10%;
  color: #E96E5E;
}
</style>
