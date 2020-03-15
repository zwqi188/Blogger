<template>
  <div>
    <div class="css_blog_list">
      <ul>
        <li v-for="item in blogList" :key="item">
          <div class="blogContent blogContent-left css-width8">
            <div class="blog-title" @click="getBlogDetail(item.id)">{{item.articleTitle}}</div>
            <div class="blog-article">{{item.articleInfo}}</div>
            <div class="blog-status"> 作者：{{item.userName}}<span class="css-master" v-show="item.isAdmin">博主</span>
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
    <div class="blogPage">
      <div class="block">
        <div class="css-footer">
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :current-page="currentPage"
            :total="total"
            layout="prev, pager, next">
          </el-pagination>
          <div class="footer-relate css-width10">
            关于箴言 | 联系博主 | 说明
          </div>
          <div class="footer-relate footer-relate2 css-width10">
            ©2019-2020  / 箴言 / 皖ICP备20002817号
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RequestUrl from '@/utils/RequestUrl'

export default {
  name: 'discoveryBlog',
  components: {},
  created () {
    this.getBlogListFromServer()
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      blogList: null
    }
  },
  methods: {
    getBlogListFromServer () {
      let params = {
        pageSize: this.pageSize,
        pageIndex: this.currentPage
      }
      let url = RequestUrl.GET_BLOG_LIST
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.total = res.data.count
          this.blogList = res.data.blogList
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getBlogDetail (id) {
      this.$router.push({path: '/main/detail', query: {article_id: id}})
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getBlogListFromServer()
    }
  }
}
</script>

<style scoped>
  .css-footer {
    float: left;
    height: 100px;
    padding-top: 30px;
  }

  .footer-relate {
    color: #969696;
    text-align: left;
    font-size: 14px;
    padding-top: 20px;
  }

  .footer-relate2 {
    padding-bottom: 60px;
  }
  .css-master {
    border: 1px solid #ccc;
    padding: 5px;
    color: red;
    margin-right: 10px;
    margin-left: 10px;
  }
  .css_blog_list {
    height: 150px;
    display: block;
  }

  .css_blog_list li {
    list-style: none;
    height: 150px;
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
</style>
