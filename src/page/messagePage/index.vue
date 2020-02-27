<template>
  <div class="css-setting css-width10">
    <div class="css-width2">
      <el-menu class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="changeShowIndex(1)">
          <i class="el-icon-s-comment"></i>
          <span slot="title">评论</span>
        </el-menu-item>
        <el-menu-item index="2" @click="changeShowIndex(2)">
          <i class="el-icon-files"></i>
          <span slot="title">关注</span>
        </el-menu-item>
        <el-menu-item index="3" @click="changeShowIndex(3)">
          <i class="el-icon-thumb"></i>
          <span slot="title">点赞</span>
        </el-menu-item>
        <el-menu-item index="4" @click="changeShowIndex(4)">
          <i class="el-icon-bangzhu"></i>
          <span slot="title">其他</span>
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
      otherList: []
    }
  },
  mounted () {
    this.getMessageFormServer(1)
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
      this.getMessageFormServer(index)
    },
    getMessageFormServer (messageType) {
      this.getUserId()
      if (this.loginId === null) {
        this.$message.warning('请先登录！')
        return
      }
      let param = {
        userId: this.loginId,
        messageType: messageType
      }
      let url = RequestUrl.QUERY_MESSAGE
      this.http.postForm(url, param).then(res => {
        if (res.code === '1000') {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].createdAt = CommonUtil.convertTime(res.data[i].createdAt)
          }
          if (messageType === 1) {
            this.commentList = res.data
          }
          if (messageType === 2) {
            this.followList = res.data
          }
          if (messageType === 3) {
            this.thumbsList = res.data
          }
          if (messageType === 4) {
            this.otherList = res.data
          }
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
          this.getMessageFormServer(this.showIndex)
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
</style>
