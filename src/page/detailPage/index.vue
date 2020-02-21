<template>
  <div>
    <div class="css-blogDetail">
      <div class="blog-title">{{articleDetail.articleTitle}}</div>
      <div class="recommend-list css-width4">
        <div class="recommend-content css-width2">
          <el-avatar :size="45" :src="user.avatarUrl"></el-avatar>
        </div>
        <div class="recommend-content css-width8">
          <div class="css-blogDetailTitle">{{user.userName}}<el-button class="button-new-tag" size="big" @click="follow(user.id)">+ 关注</el-button></div>
          <div class="recommend-maincontent">{{articleDetail.createdAt}} . 字数 {{articleDetail.articleCount}}. 点赞 {{articleDetail.articleLike}}</div>
        </div>
      </div>
    </div>
    <div class="article_detail css-width10" v-html="articleDetail.articleContent">
    </div>
    <div class="recommend-comment css-width10">
      <v-comment></v-comment>
    </div>
    <el-menu collapse="true" class="article-function">
      <el-menu-item index="1" @click="gotoLike(articleDetail.id)">
        <font-awesome-icon icon="thumbs-up" size="lg" />
        <span slot="title">点赞</span>
      </el-menu-item>
      <el-menu-item index="2" @click="gotoDisLike(articleDetail.id)">
        <font-awesome-icon icon="thumbs-down" size="lg" />
        <span slot="title">踩</span>
      </el-menu-item>
      <el-menu-item index="3" @click="gotoEdit()">
        <i class="el-icon-setting"></i>
        <span slot="title">未开发功能</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import RequestUrl from '@/utils/RequestUrl'
import Constant from '@/utils/Constant'
import CommonUtil from '@/utils/CommonUtil'
import Comment from '@/components/comment/index'

export default {
  name: 'detailPage',
  data () {
    return {
      msg: '详情页',
      articleId: '',
      articleDetail: '',
      user: '',
      loginId: ''
    }
  },
  components: {
    'v-comment': Comment
  },
  created () {
    this.getArticleDetail()
  },
  methods: {
    getUserId () {
      let token = Constant.USER_ID_TOKEN
      this.loginId = this.cookie.get(token)
    },
    getArticleDetail () {
      // 将数据放在当前组件的数据内
      this.articleId = this.$route.query.article_id
      let params = {
        articleId: this.articleId
      }
      let url = RequestUrl.GET_ARTICLE_DETAIL
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.articleDetail = res.data.articleDetail
          this.articleDetail.createdAt = CommonUtil.convertTime(this.articleDetail.createdAt)
          this.user = res.data.user
        } else {
          this.$message.error(res.message)
        }
      })
    },
    gotoEdit () {
      this.$message.warning('暂不支持此功能！')
    },
    gotoLike (articleId) {
      this.getUserId()
      if (this.loginId === null) {
        this.$message.warning('请先登录！')
        return
      }
      let params = {
        articleId: articleId,
        userId: this.loginId
      }
      let url = RequestUrl.THUMBS_UP
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.$message.success(res.message)
          this.getArticleDetail()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    gotoDisLike (articleId) {
      this.$message.warning('暂不支持此功能')
    },
    follow (followId) {
      this.getUserId()
      if (this.loginId === null) {
        this.$message.warning('请先登录！')
        return
      }
      let params = {
        followId: followId,
        userId: this.loginId
      }
      let url = RequestUrl.FOLLOW
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.$message.success(res.message)
          this.getArticleDetail()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.css-blogDetail {
  text-align: left;
}
.blog-title{
  font-family: "Arial Black";
  font-size: 32px;
  font-weight: bold;
}
.recommend-list {
  padding-top: 30px;
  text-align: left;
}
.recommend-content{
  float: left;
  height: 70px;
}
.article_detail {
  float: left;
}
.recommend-comment {
  float: left;
}
.thumbs {
  width: 100px;
  float: left;
}
.thumbs:hover {
  color: #EB6E5E;
}
.thumbs-right {
  width: 100px;
  float: right;
}
.recommend-thumbs {
  float: left;
  height: 70px;
  color: #99a9bf;
}
.recommend-click{
  font-family: "Arial Black";
  font-size: 14px;
  color: #46C039;
}
.recommend-maincontent{
  font-size: 14px;
  color: #969696;
}
.article-function {
  position: fixed;
  left: 8%;
  top: 30%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
