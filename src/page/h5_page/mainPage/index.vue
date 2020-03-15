<template>
  <el-row>
    <el-col :span="24" class="div_title2">
      <el-col :span="4" class="div_title_back2">
        <el-button icon="el-icon-arrow-left" @click="back()"></el-button>
      </el-col>
      <el-col :span="20">
        <el-link class="div_title_content">箴言</el-link>
      </el-col>
    </el-col>
    <el-col :span="24" class="css_content">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<style>
  body {
    margin: 0;
    padding: 0;
  }
  .div_title_back2 {
    float: left;
    margin-top: 10px;
  }
  .div_title_content {
    font-family: "Microsoft YaHei";
    font-size: 32px;
    font-weight: bold;
    margin-left: -60px;
    margin-top: 10px;
    color: #EB6E5E;
  }
  .div_title2 {
    background-color: #E96E5E;
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1;
  }
  .css_content {
    padding-top: 70px;
  }
</style>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    this.getArticleDetail()
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
