<template>
  <div class="css-setting css-width10">
    <div class="css-width2">
      <el-menu class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <el-badge :value="messageCount.comment" class="item">
            <el-button size="small" @click="changeShowIndex(1)">评论</el-button>
          </el-badge>
        </el-menu-item>
        <el-menu-item index="2">
          <el-badge :value="messageCount.follow" class="item" type="primary">
            <el-button size="small" @click="changeShowIndex(2)">关注</el-button>
          </el-badge>
        </el-menu-item>
        <el-menu-item index="3">
          <el-badge :value="messageCount.thumbs" class="item">
            <el-button size="small" @click="changeShowIndex(3)">点赞</el-button>
          </el-badge>
        </el-menu-item>
        <el-menu-item index="4">
          <el-badge :value="messageCount.other" class="item" type="warning">
            <el-button size="small" @click="changeShowIndex(4)">其他</el-button>
          </el-badge>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="css-width8">
      <div v-show="showIndex === 1" class="css-width10">
        <div class="css-width10">
          <ul class="css-width10 css-message">
            <li class="css-width10 css-comment" v-for="item in commentList" :key="item">
              <div class="css-width10">
                <span class="css-fans">评论</span>
                <span class="span-name">{{item.sendName}}</span> 回复了你的文章
                <span class="css-delete">{{item.createdAt}}<i class="el-icon-delete-solid css-icon" @click="deleteMessage(item.id)"></i></span>
              </div>
              <div class="css-width10 div-submessge">
                <span class="css-content">{{item.messageContent}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="showIndex === 2" class="css-width10">
        <div class="css-width10">
          <ul class="css-width10 css-message">
            <li class="css-width10 css-follow" v-for="item in followList" :key="item">
              <div class="css-width10">
                <span class="css-fans">粉丝</span> <span class="span-name"> {{item.sendName}} </span> 关注了你
                <span class="css-delete">{{item.createdAt}}<i class="el-icon-delete-solid css-icon" @click="deleteMessage(item.id)"></i></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="showIndex === 3" class="css-width10">
        <div class="css-width10">
          <ul class="css-width10 css-message">
            <li class="css-width10 css-follow" v-for="item in followList" :key="item">
              <div class="css-width10">
                <span class="span-name">{{item.sendName}} </span>给你点了赞
                <span class="css-delete">{{item.createdAt}}<i class="el-icon-delete-solid css-icon" @click="deleteMessage(item.id)"></i></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="showIndex === 4">
        <div class="css-width10">
          <ul class="css-message">
            <li v-for="item in otherList" :key="item">
              <div class="css-width10">
                <span class="span-name">{{item.sendName}} </span>给你发了条消息
              </div>
              <div class="css-width10">
                {{item.messageContent}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RequestUrl from '@/utils/RequestUrl'
import Constant from '@/utils/Constant'
import CommonUtil from '@/utils/CommonUtil'

export default {
  name: 'messagePage',
  data () {
    return {
      'msg': '详情页',
      'messageList': [],
      articleId: '',
      articleDetail: '',
      uploadUrl: process.env.BASE_API + RequestUrl.UPLOAD_IMAGE,
      user: '',
      showIndex: 1,
      loginId: '',
      form: {},
      updatePasswordForm: {},
      avatarUrl: '',
      commentList: [],
      followList: [],
      thumbsList: [],
      otherList: [],
      messageCount: {}
    }
  },
  mounted () {
    this.getMessageCount()
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
      this.getMessageFormServer()
    },
    getMessageCount () {
      this.getUserId()
      if (this.loginId === null) {
        this.$message.warning('请先登录！')
        return
      }
      let param = {
        userId: this.loginId
      }
      let url = RequestUrl.GET_MESSAGE_COUNT
      this.http.postForm(url, param).then(res => {
        if (res.code === '1000') {
          this.messageCount = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    readMessage () {
      let param = {
        userId: this.loginId,
        messageType: this.showIndex
      }
      let url = RequestUrl.UPDATE_READ_STATUS
      this.http.postForm(url, param).then(res => {
        if (res.code === '1000') {
          if (this.showIndex === 1) {
            this.messageCount.comment = ''
          }
          if (this.showIndex === 2) {
            this.messageCount.follow = ''
          }
          if (this.showIndex === 3) {
            this.messageCount.thumbs = ''
          }
          if (this.showIndex === 4) {
            this.messageCount.other = ''
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getMessageFormServer () {
      this.getUserId()
      if (this.loginId === null) {
        this.$message.warning('请先登录！')
        return
      }
      let param = {
        userId: this.loginId,
        messageType: this.showIndex
      }
      let url = RequestUrl.QUERY_MESSAGE
      this.http.postForm(url, param).then(res => {
        if (res.code === '1000') {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].createdAt = CommonUtil.convertTime(res.data[i].createdAt)
          }
          if (this.showIndex === 1) {
            this.commentList = res.data
          }
          if (this.showIndex === 2) {
            this.followList = res.data
          }
          if (this.showIndex === 3) {
            this.thumbsList = res.data
          }
          if (this.showIndex === 4) {
            this.otherList = res.data
          }
          this.readMessage()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    deleteMessage (id) {
      let param = {
        id: id
      }
      let url = RequestUrl.DELETE_MESSAGE
      this.http.postForm(url, param).then(res => {
        if (res.code === '1000') {
          this.getMessageFormServer()
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
  .css-setting {
    text-align: left;
  }
  .css-setting div {
    float: left;
  }
  .css-avatar div{
    float: left;
  }
  .css-message {
    text-align: left;
  }
  .css-comment {
    height: 100px;
  }
  .css-message li {
    list-style: none;
  }
  .span-name {
    color: #389AE9;
    font-weight: bold;
    margin-right: 10px;
  }
  .div-submessge {
    padding-top: 20px;
  }
  .css-fans {
    border: 1px solid #ccc;
    padding: 5px;
    color: red;
    margin-right: 10px;
  }
  .css-delete {
    float: right;
    color: #ccc;
  }
  .css-icon {
    margin-left: 10px;
  }
  .css-icon:hover {
    color: #E96E5E;
  }
  .css-content {
    font-weight: bold;
  }
  .css-content:hover {
    text-decoration: underline;
  }
  .css-follow {
    height: 50px;
  }
  .css-badge {

  }
</style>
