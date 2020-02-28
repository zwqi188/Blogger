<template>
  <div class="css-comment css-width10">
    <div class="css-write-commnet css-width10">
      <div class="about-head-left"></div>
      <div class="comment-head-middle">关于项目</div>
    </div>
    <div class="css-write-commnet css-width10">
      <div class="comment-write css-width10">
        <div class="project-show css-width10">
          <div class="project-title"><h4>门户网站:</h4></div>
          <div class="project-address"><h5><a href="https://github.com/zwqi188/Blogger.git">https://github.com/zwqi188/Blogger.git</a></h5></div>
          <div class="project-desc"><h5>描述：基于 vue-cli 和 element-ui 实现的个人博客网站。</h5>
            <h5>tinymce 富文本编辑器（功能强大、所见即所得的富文本编辑器）。</h5></div>
        </div>
        <div class="project-show css-width10">
          <div class="project-title"><h4>后台:</h4></div>
          <div class="project-address"><h5><a href="https://github.com/zwqi188/Blogger.git">https://github.com/zwqi188/BloggerService.git</a></h5></div>
          <div class="project-desc"><h5>描述：基于 springboot 实现的个人博客网站后台。</h5>
            <h5>数据访问使用JPA的方式。</h5></div>
        </div>
        <div class="project-show css-width10">
          <div class="project-title"><h4>管理站点:</h4></div>
          <div class="project-address"><h5><a href="https://github.com/zwqi188/BloggerManager.git">https://github.com/zwqi188/BloggerManager.git</a></h5></div>
          <div class="project-desc"><h5>描述：基于 angularJs 和 bootstrap 实现的个人网站的管理站点。</h5>
            <h5>详细内容待定。</h5></div>
        </div>
      </div>
    </div>
    <div class="css-write-commnet css-width10">
      <div class="comment-head-left"></div>
      <div class="comment-head-middle">写留言</div>
    </div>
    <div class="css-write-commnet css-width10">
      <div class="comment-write css-width10">
        <el-input type="textarea" :rows="5" placeholder="在这里写下你的评论" v-model="word" maxlength = "120"></el-input>
      </div>
      <div class="comment-write-func css-width10">
        <el-button class="comment-write-publish" type="primary" @click="publishWord()">发表</el-button>
      </div>
    </div>
    <div class="css-commnet-head css-width10">
      <div class="comment-head-left"></div>
      <div class="comment-head-middle">全部留言</div>
      <div class="comment-head-right">{{wordCount}}条留言</div>
    </div>
    <div class="css-commnet-body css-width10">
      <div class="comment-list css-width10" v-for="item in wordList" :key="item">
        <div class="recommend-content css-width1">
          <el-avatar :size="45" :src="item.avatarUrl"></el-avatar>
        </div>
        <div class="recommend-content css-width9">
          <div class="comment-name css-width10">{{item.loginName}}</div>
          <div class="comment-time css-width10">{{item.createdAt}}</div>
          <div class="comment-content css-width10">{{item.wordContent}}</div>
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
  name: 'aboutPage',
  data () {
    return {
      loginId: '',
      articleId: '',
      wordList: [],
      wordCount: 0,
      word: ''
    }
  },
  components: {
  },
  created () {
    this.queryWord()
  },
  methods: {
    getUserId () {
      let token = Constant.USER_ID_TOKEN
      this.loginId = this.cookie.get(token)
    },
    queryWord () {
      let params = {
      }
      let url = RequestUrl.QUERY_WORD
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.wordList = res.data
          for (let i = 0; i < this.wordList.length; i++) {
            this.wordList[i].createdAt = CommonUtil.convertTime(this.wordList[i].createdAt)
          }
          this.wordCount = res.data.length
        } else {
          this.$message.error(res.message)
        }
      })
    },
    publishWord () {
      this.getUserId()
      if (this.loginId === null) {
        this.$message.warning('请先登录！')
        return
      }
      if (!this.word) {
        this.$message.warning('请先写下你的留言！')
        return
      }
      if (this.word.length > 120) {
        this.$message.warning('发表留言字数需限制在120个字！')
        return
      }
      let params = {
        wordContent: this.word,
        userId: this.loginId
      }
      let url = RequestUrl.PUBLISH_WORD
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.$message.success(res.message)
          this.word = ''
          this.queryWord()
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
  .about-head-left {
    border-width: 3px;
    border-radius: 3px;
    border-style: solid;
    border-color: #969696;
    height: 25px;
    margin-right: 10px;
  }
  .project-show {
    text-align: left;
  }
  .project-title {
    float: left;
    width: 10%;
  }
  .project-address {
    float: left;
    width: 90%;
  }
  .project-desc {
    float: left;
  }
</style>
