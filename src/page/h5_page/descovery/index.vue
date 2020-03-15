<template>
  <el-row>
    <el-col :span="24">
      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <li v-for="item in blogList" class="list-item" :key="item">
            <div class="blog-title" @click="getBlogDetail(item.id)">{{item.articleTitle}}</div>
            <div class="blog_content">
              <div class="blogContent-left">
                <div class="blog-article">{{item.articleInfo}}</div>
              </div>
              <div v-show="item.articlePic" class="blogContent-right">
                <el-image class="blog_pic" :src="item.articlePic" :fit="fit"></el-image>
              </div>
            </div>
            <div class="blog-status"> 作者：{{item.userName}}<span class="css-master" v-show="item.isAdmin">博主</span>
              <font-awesome-icon class="css_icon" icon="comments" fixed-width/>{{item.articleReplay}}回复
              <font-awesome-icon class="css_icon" icon="thumbs-up" fixed-width/>{{item.articleLike}}点赞
            </div>
          </li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import RequestUrl from '@/utils/RequestUrl'

export default {
  name: 'm_descoveryPage',
  data () {
    return {
      count: 10,
      loading: false,
      blogList: null,
      total: 0
    }
  },
  mounted () {
    this.getBlogListFromServer()
  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    },
    getBlogListFromServer () {
      let params = {
        pageSize: 10,
        pageIndex: 1
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
      this.$router.push({path: '/m_main/detail', query: {article_id: id}})
    }
  }
}
</script>

<style scoped>
  .list {
    margin: 0;
    padding: 0;
  }
  .blog_content {
    float : left;
  }
  .blogContent-left {
    width: 60%;
    float: left;
  }
  .blogContent-right {
    width: 40%;
    float: left;
  }
  .blog_pic {
    width: 120px;
    height: 110px;
    margin: 0 auto;
    text-align: center;
  }
  .css_blog_list li {
    display: block;
    list-style: none;
  }
  .list-item {
    /*border:1px dashed green;*/
    padding: 3px;
    height: 180px;
  }
  .css-master {
    border: 1px solid #ccc;
    padding: 5px;
    color: red;
    margin-right: 10px;
    margin-left: 10px;
  }
  .blog-title {
    font-family: "Arial Black";
    font-size: 20px;
    font-weight: bold;
    text-align: left;
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
    text-align: left;
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
