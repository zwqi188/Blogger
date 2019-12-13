<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">生活笔记</el-menu-item>
      <el-menu-item index="3">技术分享</el-menu-item>
      <el-menu-item index="4">福利专区</el-menu-item>
      <el-menu-item index="5">关于博主</el-menu-item>
      <el-submenu index="6" class="el_my_func">
        <template slot="title"><el-avatar :size="40" :src="circleUrl"></el-avatar>我的</template>
        <el-menu-item index="6-1">修改密码</el-menu-item>
        <el-menu-item index="6-2">时间线</el-menu-item>
        <el-menu-item index="6-3">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
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
.div_header{
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
