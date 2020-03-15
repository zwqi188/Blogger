<template>
  <div>
    <div class="css-concern css-width3">
      <div class="infinite-list2">
        <div class="all-concern">全部关注</div>
      </div>
      <div class="infinite-list">
        <ul>
          <li v-for="item in followList" :key="item" class="concern-li">
            <div class="recommend-content css-width2">
              <el-avatar :size="45" :src="item.avatarUrl"></el-avatar>
            </div>
            <div class="recommend-content css-width8">
              <div @click="queryUser(item.id)">{{item.userName}}</div>
              <el-tag :key="name" closable :type='success'  @close="unfollow(item.id)">已关注</el-tag>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="css-concern css-width7" v-show="hasClick">
      <div class="css-width2 css-recommend-man">
        <el-avatar :size="70" :src="user.avatarUrl"></el-avatar>
      </div>
      <div class="css-width8 css-recommend-man css-recommend-title">
        <div class="recommend-man-name">{{user.userName}}</div>
        <div class="recommend-maincontent">创作了{{user.keyword}}篇文章 . {{user.like}}人关注</div>
      </div>
      <div class="css-width10 css-recommend-detail">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">最新文章</el-menu-item>
        </el-menu>
      </div>
      <div class="css-width10 css_blog_list">
        <ul>
          <li v-for="item in blogList" :key="item">
            <div class="blogContent blogContent-left css-width8">
              <div class="blog-title" @click="getBlogDetail(item.id)">{{item.articleTitle}}</div>
              <div class="blog-article">{{item.articleInfo}}</div>
              <div class="blog-status"> 作者：{{item.userName}}
                <font-awesome-icon class="css_icon" icon="comments" fixed-width/>{{item.articleReplay}}回复
                <font-awesome-icon class="css_icon" icon="thumbs-up" fixed-width/>{{item.articleLike}}点赞
              </div>
            </div>
            <div v-show="item.articlePic" class="blogContent blogContent-right css-width2">
              <el-image style="width: 120px; height: 110px"
                        :src="item.articlePic" :fit="fit"></el-image>
            </div>
          </li>
        </ul>
      </div>
      <div class="css-width10 css-footer">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page="currentPage"
          :total="total"
          layout="prev, pager, next">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import RequestUrl from '@/utils/RequestUrl'

export default {
  name: 'concernPage',
  data () {
    return {
      count: 10,
      loading: false,
      loginId: '',
      followList: null,
      hasClick: false,
      activeIndex: '1',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      blogList: null,
      user: [],
      selectUser: ''
    }
  },
  mounted () {
    this.loginId = localStorage.user_id_token
    this.getfollow()
  },
  methods: {
    getfollow () {
      if (this.loginId === null) {
        this.$message.warning('请先登录！')
        return
      }
      let params = {}
      let url = RequestUrl.QUERY_FOLLOW
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.followList = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    queryUser (userId) {
      this.hasClick = true
      this.selectUser = userId
      let params = {
        queryUserId: userId
      }
      let url = RequestUrl.QUERY_USER_BY_ID
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.user = res.data
        } else {
          this.$message.error(res.message)
        }
      })
      this.getConcernBlogFromServer()
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getConcernBlogFromServer()
    },
    getBlogDetail (id) {
      this.$router.push({path: '/main/detail', query: {article_id: id}})
    },
    getConcernBlogFromServer () {
      let params = {
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        userId: this.selectUser
      }
      let url = RequestUrl.CONCERN_BLOG
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.total = res.data.count
          this.blogList = res.data.blogList
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style scoped>
  .all-concern {
    font-family: "Arial Black";
    font-size: large;
    padding-left: 40px;
    font-weight: bold;
  }
  .css-concern{
    float: left;
  }
  .infinite-list2 {
    padding-top: 30px;
    text-align: left;
  }
  .infinite-list {
    text-align: left;
  }
  .infinite-list li {
    list-style: none;
  }
  .infinite-list ul li:hover {
    color: #969696;
  }
  .recommend-content{
    float: left;
    height: 70px;
  }
  .concern-li {
    background: #99a9bf;
  }
  .recommend-maincontent{
    font-size: 14px;
    color: #969696;
  }
  .css-recommend-man{
    float: left;
  }
  .recmmend-man-basic {
    float: left;
  }
  .recommend-man-name {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 25px;
    font-weight: bold;
  }
  .css-recommend-title {
    text-align: left;
  }
  .css-recommend-detail {
    padding-top: 80px;
  }
  .css_blog_list {
    height: 120px;
    display: block;
  }

  .css_blog_list li {
    list-style: none;
    height: 120px;
    margin-left: 10px;
  }
  .blogContent {
    float: left;
    margin-top: 20px;
    height: 120px;
  }

  .blogContent-left {
    text-align: left;
    margin-left: -40px;
  }

  .blogContent-right {
    float: right;
  }

  .blog-title {
    font-family: "Arial Black";
    font-size: 20px;
    font-weight: bold;
  }
  .blog-title:hover {
    text-decoration: underline;
  }

  .blog-article {
    margin-top: 3px;
    line-height: 20px;
    font-size: 14px;
    color: #969696;
  }

  .blog-status {
    margin-top: 3px;
    font-size: 14px;
    color: #969696;
  }

  .blog-status {
    padding-top: 8px;
  }
  .css_icon {
    padding-left: 10px;
    padding-right: 5px;
  }
  .css-footer {
    float: left;
    height: 100px;
    padding-top: 30px;
  }
</style>
