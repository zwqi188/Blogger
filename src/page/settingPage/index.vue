<template>
  <div class="css-setting css-width10">
    <div class="css-width3">
      <h2>设置</h2>
      <el-menu class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="changeShowIndex(1)">
          <i class="el-icon-menu"></i>
          <span slot="title">基础设置</span>
        </el-menu-item>
        <el-menu-item index="2" @click="changeShowIndex(2)">
          <i class="el-icon-files"></i>
          <span slot="title">个人资料</span>
        </el-menu-item>
        <el-menu-item index="3" @click="changeShowIndex(3)">
          <i class="el-icon-document"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
        <el-menu-item index="4" @click="changeShowIndex(4)">
          <i class="el-icon-setting"></i>
          <span slot="title">其他功能</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="css-width7">
      <div v-show="showIndex === 1">
        <div class="css-width10 css-avatar">
          <div class="css-width2"><el-avatar :size="85" :src="avatarUrl"></el-avatar></div>
          <div class="css-width8 css-change-avatar">
            <el-upload
              :action="uploadUrl"
              accept="image/jpeg,image/gif,image/png"
              :limit="1"
              :on-success="handleSucc">
              <el-button size="small" type="primary">修改头像</el-button>
            </el-upload>
          </div>
        </div>
        <div class="css-width10 css-form">
          <el-form ref="form" label-width="80px">
            <el-form-item class="css-width10" label="昵称">
              <el-input v-model="form.loginName"></el-input>
            </el-form-item>
            <el-form-item class="css-width10" label="性别">
              <el-radio-group class="css-userGender" v-model="form.userGender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="css-width10" label="手机号">
              <el-input v-model="form.userMobile"></el-input>
            </el-form-item>
            <el-form-item class="css-width10" label="邮箱">
              <el-input v-model="form.userEmail"></el-input>
            </el-form-item>
            <el-form-item class="css-width10">
              <el-button type="primary" @click="updateUser(form)">立即保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="showIndex === 2">
        <div class="css-width10">
          <el-form ref="form" label-width="80px">
            <el-form-item class="css-width10" label="兴趣">
              <el-input></el-input>
            </el-form-item>
            <el-form-item class="css-width10" label="爱好">
              <el-input></el-input>
            </el-form-item>
            <el-form-item class="css-width10" label="身份证号">
              <el-input></el-input>
            </el-form-item>
            <el-form-item class="css-width10" label="地址">
              <el-input></el-input>
            </el-form-item>
            <el-form-item class="css-width10">
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button>清空</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="showIndex === 3">
        <div class="css-width10">
          <el-form ref="form" label-width="80px">
            <el-form-item class="css-width10" label="原密码">
              <el-input placeholder="请输入密码" v-model="updatePasswordForm.orignPassword" show-password></el-input>
            </el-form-item>
            <el-form-item class="css-width10" label="新密码">
              <el-input placeholder="请输入新密码" v-model="updatePasswordForm.userPassword" show-password></el-input>
            </el-form-item>
            <el-form-item class="css-width10" label="确认密码">
              <el-input placeholder="请确认新密码" v-model="updatePasswordForm.userPassword2" show-password></el-input>
            </el-form-item>
            <el-form-item class="css-width10">
              <el-button type="primary" @click="updatePassword(updatePasswordForm)">更改密码</el-button>
              <el-button @click="cleanUpdatePasswordForm()">清空</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="showIndex === 4">
        <div class="css-width10">
          <el-form ref="form" label-width="150px">
            <el-form-item class="css-width10" label="打包下载所有文章">
              <el-button type="info" @click="packageFile()">下载我的所有文章</el-button>
            </el-form-item>
            <el-form-item class="css-width10" label="永久删除帐号">
              <el-button type="danger">删除账号</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RequestUrl from '@/utils/RequestUrl'
import Constant from '@/utils/Constant'
import MD5 from 'js-md5'

export default {
  name: 'settingPage',
  data () {
    return {
      msg: '详情页',
      articleId: '',
      articleDetail: '',
      uploadUrl: process.env.BASE_API + RequestUrl.UPLOAD_IMAGE,
      user: '',
      showIndex: 1,
      loginId: '',
      form: {},
      updatePasswordForm: {},
      avatarUrl: ''
    }
  },
  components: {
  },
  created () {
    this.getUserId()
    this.queryUser()
  },
  methods: {
    handleSucc (file) {
      this.avatarUrl = file.location
    },
    getUserId () {
      let token = Constant.USER_ID_TOKEN
      this.loginId = this.cookie.get(token)
    },
    changeShowIndex (index) {
      this.showIndex = index
      if (index === 1) {
        this.queryUser()
      }
    },
    queryUser () {
      if (this.loginId === null) {
        return
      }
      let params = {
        userId: this.loginId
      }
      let url = RequestUrl.QUERY_USER
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.form = res.data
          this.avatarUrl = res.data.avatarUrl
        } else {
          this.$message.error(res.message)
        }
      })
    },
    updateUser (form) {
      form.avatarUrl = this.avatarUrl
      form.userId = this.loginId
      let url = RequestUrl.UPDATE_USER
      this.http.postForm(url, form).then(res => {
        if (res.code === '1000') {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    updatePassword (updatePasswordForm) {
      if (updatePasswordForm.userPassword !== updatePasswordForm.userPassword2) {
        this.$message.error('新输入的两次密码不一致')
      }
      let params = {
        userId: this.loginId,
        orignPassword: MD5(updatePasswordForm.orignPassword),
        userPassword: MD5(updatePasswordForm.userPassword)
      }
      updatePasswordForm.userId = this.loginId
      let url = RequestUrl.UPDATE_USER_PASSWORD
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.cleanUpdatePasswordForm()
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    packageFile () {
      this.$message.info('请稍等！正在打包')
      let url = RequestUrl.PACKAGE_FILE
      let params = {
        userId: this.loginId
      }
      this.http.postForm(url, params).then(res => {
        console.log(res)
        this.download(res)
      })
    },
    download (data) {
      if (!data) {
        return
      }
      var blob = new Blob([data], {type: 'application/zip;charset=utf-8'})
      var url = window.URL.createObjectURL(blob)
      var aLink = document.createElement('a')
      aLink.style.display = 'none'
      aLink.href = url
      aLink.setAttribute('download', 'file.rar')
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
      window.URL.revokeObjectURL(url)
    },
    cleanUpdatePasswordForm () {
      this.updatePasswordForm = {}
    },
    openMessage () {
      this.$prompt('请输入图片地址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.avatarUrl = value
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
</script>

<style scoped>
.css-setting {
  text-align: left;
}
.css-setting div {
  float: left;
}
.css-avatar div{
  float: left;
}
.css-form {
  float: left;
  padding-top: 30px;
}
.css-userGender {
  padding-top: 13px;
}
.css-change-avatar {
  padding-top: 20px;
}
</style>
