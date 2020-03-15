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
      <div class="sign-form">
        <el-input placeholder="用户名建议手机号或邮箱" v-model="loginName">
          <template slot="prepend"><i class="el-icon-user-solid"></i></template>
        </el-input>
        <el-input placeholder="请输入密码" v-model="password" show-password>
          <template slot="prepend"><i class="el-icon-lock"></i></template>
        </el-input>
        <el-input placeholder="请输入下方的验证码" v-model="varifyCode">
          <template slot="prepend"><i class="el-icon-picture-outline"></i></template>
        </el-input>
        <div>
          <img :src="imgCode" @click="getCheckCodeFromServer()" style="width: 100px;height: 35px;cursor: pointer; padding-top: 10px"/>
        </div>
        <el-button class="css-sign-btn" type="primary" icon="el-icon-user" @click="registerFromServer()">注册</el-button>
      </div>
    </div>
    <div class="showbody">
      <router-view/>
    </div>
  </div>
</template>

<script>
import RequestUrl from '@/utils/RequestUrl'
import MD5 from 'js-md5'

export default {
  name: 'sign',
  data () {
    return {
      activeName: 'sign',
      imgCode: null,
      loginName: '',
      password: '',
      varifyCode: ''
    }
  },
  created () {
    if (this.activeName === 'sign') {
      this.getCheckCodeFromServer()
    }
  },
  methods: {
    getCheckCodeFromServer () {
      let url = process.env.BASE_API + RequestUrl.GENERATE_RAND_CHECK_CODE
      let num = Math.ceil(Math.random() * 10)
      this.imgCode = url + '?' + num
    },
    registerFromServer () {
      if (this.loginName === '') {
        this.$message.error('登录名不能为空')
        return
      }
      if (this.password === '') {
        this.$message.error('密码不能为空')
        return
      }
      if (this.varifyCode === '') {
        this.$message.error('验证码不能为空')
        return
      }
      let params = {
        userName: this.loginName,
        userPassword: MD5(this.password),
        varifyCode: this.varifyCode
      }
      console.log(params)
      let url = RequestUrl.USER_REGISTER
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.$message.success(res.message)
        } else {
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
.sign-form {
  width: 400px;
  margin: 0 auto;
  padding-top: 40px;
}
.css-sign-btn{
  margin-top: 30px;
  width: 100%;
}
</style>
