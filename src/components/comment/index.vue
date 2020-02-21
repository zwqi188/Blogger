<template>
  <div class="css-comment css-width10">
    <div class="css-write-commnet css-width10">
      <div class="comment-head-left"></div>
      <div class="comment-head-middle">写评论</div>
    </div>
    <div class="css-write-commnet css-width10">
      <div class="comment-write css-width10">
        <el-input type="textarea" :rows="5" placeholder="在这里写下你的评论" v-model="comment" maxlength = "120"></el-input>
      </div>
      <div class="comment-write-func css-width10">
        <el-button class="comment-write-publish" type="primary" @click="publishComment()">发表</el-button>
      </div>
    </div>
    <div class="css-commnet-head css-width10">
      <div class="comment-head-left"></div>
      <div class="comment-head-middle">全部评论</div>
      <div class="comment-head-right">{{commentCount}}条评论</div>
    </div>
    <div class="css-commnet-body css-width10">
      <div class="comment-list css-width10" v-for="item in commentList" :key="item">
        <div class="recommend-content css-width1">
          <el-avatar :size="45" :src="item.avatarUrl"></el-avatar>
        </div>
        <div class="recommend-content css-width9">
          <div class="comment-name css-width10">{{item.userName}}</div>
          <div class="comment-time css-width10">{{item.createdAt}}</div>
          <div class="comment-content css-width10">{{item.reviewContent}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatarUrl from '@/assets/images/avatar.jpg'
import RequestUrl from '@/utils/RequestUrl'
import Constant from '@/utils/Constant'
import CommonUtil from '@/utils/CommonUtil'

export default {
  name: 'detailPage',
  data () {
    return {
      circleUrl: avatarUrl,
      loginId: '',
      articleId: '',
      commentList: null,
      commentCount: 0,
      comment: ''
    }
  },
  components: {
  },
  created () {
    this.getArticleDetail()
    this.getCommentListFromServer()
  },
  methods: {
    getUserId () {
      let token = Constant.USER_ID_TOKEN
      this.loginId = this.cookie.get(token)
    },
    getArticleDetail () {
      this.articleId = this.$route.query.article_id
    },
    getCommentListFromServer () {
      let params = {
        articleId: this.articleId
      }
      let url = RequestUrl.GET_COMMENT_BY_ARTICLE_ID
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.commentList = res.data
          for (let i = 0; i < this.commentList.length; i++) {
            this.commentList[i].createdAt = CommonUtil.convertTime(this.commentList[i].createdAt)
          }
          this.commentCount = res.data.length
        } else {
          this.$message.error(res.message)
        }
      })
    },
    publishComment () {
      this.getUserId()
      if (this.loginId === null) {
        this.$message.warning('请先登录！')
        return
      }
      if (!this.comment) {
        this.$message.warning('请先写下你对此文的观点！')
        return
      }
      if (this.comment.length > 120) {
        this.$message.warning('发表评论字数需限制在120个字！')
        return
      }
      let params = {
        articleId: this.articleId,
        reviewContent: this.comment,
        userId: this.loginId
      }
      let url = RequestUrl.PUBLISH_COMMENT
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.$message.success(res.message)
          this.comment = ''
          this.getCommentListFromServer()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style scoped>
.css-comment {
  float: left;
}
.css-comment div{
  float: left;
}
.comment-head-middle {
  font-size: 24px;
}
.css-commnet-head div{
  float: left;
}
.comment-head-left {
  border-width: 3px;
  border-radius: 3px;
  border-style: solid;
  border-color: #E96E5E;
  height: 25px;
  margin-right: 10px;
}
.comment-head-right {
  font-size: 18px;
  margin-left: 10px;
  padding-top: 5px;
  color: #969696;
}
.css-commnet-body {
  padding-top: 20px;
  padding-bottom: 50px;
}
.comment-list {
  padding-top: 20px;
  float: left;
}
.comment-name {
  font-weight: bold;
  text-align: left;
}
.comment-time {
  text-align: left;
  color: #969696;
  font-size: 14px;
  padding-top: 5px;
}
.comment-content {
  text-align: left;
  padding-top: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
.comment-write {
  padding-top: 10px;
  padding-bottom: 10px;
}
.comment-write-publish {
  float: right;
}
</style>
