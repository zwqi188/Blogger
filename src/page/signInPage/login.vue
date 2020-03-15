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
          <el-input placeholder="手机号或邮箱" v-model="loginName">
            <template slot="prepend"><i class="el-icon-user-solid"></i></template>
          </el-input>
          <el-input placeholder="请输入密码" v-model="password" show-password>
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
          <v-slider v-model="value"/>
          <el-button class="css-login-btn" type="success" icon="el-icon-search" @click="login()">登录</el-button>
      </div>
    </div>
    <div class="showbody">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SliderVerificationCode from '@/components/sliderVerificationCode/index'
import MD5 from 'js-md5'
import RequestUrl from '@/utils/RequestUrl'

export default {
  name: 'login',
  data () {
    return {
      activeName: 'second',
      value: false,
      loginName: '',
      password: ''
    }
  },
  components: {
    'v-slider': SliderVerificationCode
  },
  created () {
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleChange (value) {
      console.log('您验证结果为:', value)
    },
    login () {
      if (this.loginName === '') {
        this.$message.error('登录名不能为空')
        this.value = false
        return
      }
      if (this.password === '') {
        this.$message.error('密码不能为空')
        this.value = false
        return
      }
      if (!this.value) {
        this.$message.error('请拖动滑块解锁')
      }
      let params = {
        userName: this.loginName,
        userPassword: MD5(this.password)
      }
      console.log(params)
      let url = RequestUrl.USER_LOGIN
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          // 默认浏览器关闭，自动清理
          localStorage.user_id_token = res.data
          this.$message.success(res.message + '，正在登录!')
          setTimeout(() => { this.$router.push({path: '/main/discovery'}) }, 1000)
        } else {
          this.value = false
          this.$message.error(res.message)
        }
      })
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
  width: 400px;
  margin: 0 auto;
  padding-top: 40px;
}
.css-login-btn {
  margin-top: 30px;
  width: 100%;
}
</style>
