<template>
  <div class="css-header">
    <div class="css-width2">
      <div class="css-maintitle">
        <a href="#/main" class="css-title">记事本</a>
      </div>
      <div class="css-maintitle">
        <a href="#/main" class="css-subtitle">戚郑伟的个人博客</a>
      </div>

    </div>
    <div class="css-width6">
      <div class="css-title-memu">
        <a href="#/main/carousel"><i class="el-icon-view"></i>发现</a>
        <a href="#/main/hotlist"><i class="el-icon-mobile"></i>关注</a>
        <a href="#/main/hotlist"><i class="el-icon-share"></i>分享</a>
        <a href="#/main/hotlist"><i class="el-icon-chat-dot-square"></i>消息</a>
      </div>
    </div>
    <div class="css-width2">
      <div class="css-title-login">
        <ul class="first">
          <li class="menu"><el-avatar :size="45" :src="circleUrl"></el-avatar>
            <ul class="second">
              <li><i class="el-icon-s-home"></i>我的主页</li>
              <li><i class="el-icon-s-management"></i>收藏的文章</li>
              <li><i class="el-icon-user-solid"></i>个人信息</li>
              <li><i class="el-icon-s-help"></i>联系博主</li>
            </ul>
          </li>
          <li><el-button type="danger" round @click="gotoEditor()"><i class="el-icon-edit"></i>写文章</el-button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import avatarUrl from '@/assets/images/avatar.jpg'

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
    },
    gotoEditor () {
      this.$router.push({ path: '/main/editor' })
    }
  }
}
</script>

<style scoped>
.css-maintitle {
  width: 100%;
}
.css-subtitle {
  font-family: 'tinymce-mobile', sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: black;
}
.css-title {
  font-family: "Microsoft YaHei";
  font-size: 32px;
  font-weight: bold;
  color: #EB6E5E;
}
.css-header div {
  float: left;
}
.css-title-memu {
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: normal;
  margin-top: 10px;
}
.css-title-memu a{
  float: left;
  width: 12%;
  color: #1a1a1a;
}
.css-title-memu a:active{
  float: left;
  width: 12%;
  color: #E96E5E;
}
.css-title-login {
  width: 100%;
}
.el-icon-edit{
  color: white;
}
li{
  list-style: none;
  cursor: pointer;
}
.first{
  position: relative;
}
.first>li{
  float: left;
  display: block;
  padding: 8px;
}
.second{
  position: absolute;
  left: 0px;
  display: none;
  border: 1px solid #8a8f97;
}
.second>li{
  display: block;
  padding: 8px;
  text-align: left;
}
.menu:hover .second{
  display: block;
}
</style>
