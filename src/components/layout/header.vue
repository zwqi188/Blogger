<template>
  <el-row class="css-header">
    <el-col :span="3">
      <a href="#/main" class="css-title">记事本</a>
    </el-col>
    <el-col :span="17">
      <div class="css-title-memu">
        <a href="#/main/hotlist"><i class="el-icon-view"></i>发现</a>
        <a href="#/main/hotlist"><i class="el-icon-mobile"></i>关注</a>
        <a href="#/main/hotlist"><i class="el-icon-share"></i>分享</a>
        <a href="#/main/hotlist"><i class="el-icon-chat-dot-square"></i>消息</a>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="div_welcome_right">
        <el-menu mode="horizontal">
          <el-submenu index="1">
            <template slot="title"><el-avatar :size="40" :src="circleUrl"></el-avatar></template>
            <el-menu-item index="1-1"><i class="el-icon-s-home"></i>我的主页</el-menu-item>
            <el-menu-item index="1-2"><i class="el-icon-s-management"></i>收藏的文章</el-menu-item>
            <el-menu-item index="1-3"><i class="el-icon-user-solid"></i>个人信息</el-menu-item>
            <el-menu-item index="1-4"><i class="el-icon-s-help"></i>联系博主</el-menu-item>
          </el-submenu>
          <el-menu-item index="2"><el-button type="danger" round @click="gotoEditor()"><i class="el-icon-edit"></i>写文章</el-button></el-menu-item>
        </el-menu>
      </div>
    </el-col>
  </el-row>
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
      alert('hahh')
      this.$router.push({ path: '/editor' })
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
.el-icon-edit{
  color: white;
}
</style>
