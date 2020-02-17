<template>
  <div>
    <div class="login-form">
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
</template>

<script>
import SliderVerificationCode2 from '@/components/sliderVerificationCode/index'

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
    'v-slider': SliderVerificationCode2
  },
  created () {
    this.getCheckCodeFromServer()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleChange (value) {
      console.log('您验证结果为:', value)
    },
    login () {
      if (!this.value) {
        this.$message.error('请拖动滑块解锁')
      }
      console.log(this.value)
      this.$message.error(this.value)
    }

  }
}
</script>

<style scoped>
.login-form {
  width: 400px;
  margin: 0 auto;
  padding-top: 40px;
}
.css-login-btn {
  margin-top: 30px;
  width: 100%;
}
</style>
