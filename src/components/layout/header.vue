<template>
  <div class="css-header">
    <div class="css-width2">
      <div class="css-maintitle">
        <a href="#/main" class="css-title">箴言</a>
      </div>
    </div>
    <div class="css-width6">
      <div class="css-title-memu">
        <a href="#/main/discovery"><i class="el-icon-view"></i>发现</a>
        <a href="#/main/concern"><i class="el-icon-mobile"></i>关注</a>
<!--        <a href="#/main/share"><i class="el-icon-share"></i>分享</a>-->
        <a href="#/main/message"><i class="el-icon-chat-dot-square"></i>消息</a>
        <a href="#/main/about"><i class="el-icon-crop">关于</i></a>
      </div>
    </div>
    <div class="css-width2">
      <div class="css-title-login">
        <ul class="first">
          <li class="menu" v-show="isLogin">
            <el-avatar :size="45" :src="user.avatarUrl"></el-avatar><i class="el-icon-caret-bottom"></i>
            <ul class="second">
              <li><i class="el-icon-s-home"></i>我的主页</li>
              <li @click="gotoSetting()"><i class="el-icon-user-solid"></i>设置</li>
              <li @click="loginOut()"><i class="el-icon-error"></i>退出</li>
            </ul>
          </li>
          <li v-show="!isLogin">
            <span @click="gotoLogin()" circle>登录</span>|<span @click="gotoSignIn()" circle>注册</span>
          </li>
          <li>
            <el-button type="danger" icon="el-icon-edit" @click="gotoEditor()" round>写文章</el-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import RequestUrl from '@/utils/RequestUrl'

export default {
  name: 'Header',
  data () {
    return {
      activeIndex: '1',
      isLogin: false,
      userId: '',
      user: []
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    queryUser () {
      let params = {
        userId: this.userId
      }
      let url = RequestUrl.QUERY_USER
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.user = res.data
        }
      })
    },
    gotoEditor () {
      this.$router.push({ path: '/main/editor' })
      this.$message.info('稍等，正在加载编辑器！')
    },
    gotoSignIn () {
      this.$router.push({path: '/sign'})
    },
    gotoLogin () {
      this.$router.push({path: '/login'})
    },
    gotoSetting () {
      this.$router.push({path: '/main/setting'})
    },
    checkLogin () {
      this.userId = localStorage.user_id_token
      if (this.userId) {
        this.isLogin = true
      }
      this.queryUser()
    },
    loginOut () {
      let params = {}
      let url = RequestUrl.USER_LOGIN_OUT
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          localStorage.removeItem('user_id_token')
          this.isLogin = false
        }
      })
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
.second li i {
  color: #EB6E5E;
  width: 30px;
  height: 20px;
}
.css-header div {
  float: left;
}
.css-title-memu {
  width: 700px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: normal;
  margin-top: 10px;
}
.css-title-memu a:hover {
  color: #E96E5E;
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
  width: 360px;
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
  background: white;
}
.second>li{
  display: block;
  padding: 8px;
  height: 30px;
  text-align: left;
}
.second>li:hover{
 text-decoration: underline;
}
.menu:hover .second{
  display: block;
}
</style>
