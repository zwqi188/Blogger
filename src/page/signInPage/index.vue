<template>
  <div>
    <div class="css-width10">
      <div class="css-width2">
        <a href="#/" class="css-title-login">箴言</a>
      </div>
      <div class="css-width8">
      </div>
    </div>
    <div class="css-width10">
      <div class="login_form">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="注册" name="sign"></el-tab-pane>
          <el-tab-pane label="登录" name="login"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="showbody">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      activeName: 'sign'
    }
  },
  methods: {
    handleClick (tab, event) {
      this.$router.push({path: tab.name})
    }
  }
}
</script>

<style scoped>
  .css-title-login {
    font-family: "Microsoft YaHei";
    font-size: 42px;
    font-weight: bold;
    color: #EB6E5E;
    text-decoration: none;
  }
  .login_form {
    margin: 0 auto;
    width: 200px;
  }
  .css-width1 {
    width: 10%;
  }
  .css-width2 {
    width: 20%;
  }
  .css-width3 {
    width: 30%;
  }
  .css-width4 {
    width: 40%;
  }
  .css-width5 {
    width: 50%;
  }
  .css-width6 {
    width: 60%;
  }
  .css-width7 {
    width: 70%;
  }
  .css-width8 {
    width: 80%;
  }
  .css-width9 {
    width: 90%;
  }
  .css-width10 {
    width: 100%;
  }
</style>
