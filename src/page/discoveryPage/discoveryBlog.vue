<template>
  <div>
    <div class="bloglist">
      <ul>
        <li v-for="item in blogList" :key="item" @click="getBlogDetail(item.id)">
          <div class="blogContent blogContent-left css-width8">
            <div class="blog-title">{{item.title}}</div>
            <div class="blog-ariticle">{{item.ariticle}}</div>
            <div class="blog-status">  {{item.name}}
              <i class="el-icon-chat-line-round">  {{item.like}}</i>
              <i class="el-icon-star-on">  {{item.like}}</i></div>
          </div>
          <div class="blogContent blogContent-right css-width2">
            <el-image style="width: 120px; height: 110px"
              :src="url" :fit="fit"></el-image>
          </div>
        </li>
      </ul>
    </div>
    <div class="blogPage">
      <div class="block">
        <div class="css-footer">
          <el-pagination :page-size="20" :pager-count="5" layout="prev, pager, next" :total="1000">
          </el-pagination>
          <div class="footer-relate css-width10">
            关于箴言 | 联系我们 | 说明
          </div>
          <div class="footer-relate css-width10">
            ©2019-2020 科技公司 / 箴言 / 沪ICP备645657657号9 /
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'discoveryBlog',
  components: {
  },
  data () {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      blogList: [ {'name': '利好', 'ariticle': 'ariticledfashfiuarweytyruio3y4q59b6v  t89yuopdfysupiypso  hiosdfuyhosphuiopsh t5435324542gjhfgq bcuytb vuety vqy utcrut rct vfdguyc rtyugvvgf qvt yiuyqeiutieuqrtiuyittrytreuty', 'title': '张54354263465376576三', 'keyword': 12344, 'like': '43K'},
        {'ariticle': 'ariticledfashfiuatiuyqeiutieuqrtiuyittrytreuty', 'title': '897809808907980987078086758三', 'keyword': 12344, 'like': '43K'},
        {'ariticle': 'ariticledfashfiuatiuyqeiutieuqrtiuyittrytreuty', 'title': '785685gfhgfdjhdgjtyru67', 'keyword': 12344, 'like': '43K'},
        {'ariticle': 'ariticledfashfiuatiuyqeiutieuqrtiuyittrytreuty', 'title': '785685gfhgfdjhdgjtyru67', 'keyword': 12344, 'like': '43K'},
        {'ariticle': 'ariticledfashfiuatiuyqeiutieuqrtiuyittrytreuty', 'title': '785685gfhgfdjhdgjtyru67', 'keyword': 12344, 'like': '43K'},
        {'ariticle': 'ariticledfashfiuatiuyqeiutieuqrtiuyittrytreuty', 'title': '785685gfhgfdjhdgjtyru67', 'keyword': 12344, 'like': '43K'},
        {'ariticle': 'ariticledfashfiuatiuyqeiutieuqrtiuyittrytreuty', 'title': '785685gfhgfdjhdgjtyru67', 'keyword': 12344, 'like': '43K'},
        {'ariticle': 'ariticledfashfiuatiuyqeiutieuqrtiuyittrytreuty', 'title': '785685gfhgfdjhdgjtyru67', 'keyword': 12344, 'like': '43K'},
        {'ariticle': 'ariticledfashfiuatiuyqeiutieuqrtiuyittrytreuty', 'title': '785685gfhgfdjhdgjtyru67', 'keyword': 12344, 'like': '43K'},
        {'ariticle': 'ariticledfashfiuatiuyqeiutieuqrtiuyittrytreuty', 'title': '785685gfhgfdjhdgjtyru67', 'keyword': 12344, 'like': '43K'},
        {'ariticle': 'ariticledfashfiuatiuyqeiutieuqrtiuyittrytreuty', 'title': '785685gfhgfdjhdgjtyru67', 'keyword': 12344, 'like': '43K'}
      ]
    }
  },
  methods: {
    getBlogDetail () {
      this.$router.push({ path: '/main/detail' })
    }
  }
}
</script>

<style scoped>
  .css-footer{
    float: left;
    height: 100px;
  }
  .footer-relate {
    color: #969696;
    text-align: left;
    font-size: 14px;
  }
  .bloglist {
    height: 120px;
    display: block;
  }
 .bloglist li {
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
.blog-title{
  font-family: "Arial Black";
  font-size: 20px;
  font-weight: bold;
}
.blog-ariticle{
  margin-top: 3px;
  line-height: 20px;
  font-size: 14px;
  color: #969696;
}
.blog-status{
  margin-top: 3px;
  font-size: 14px;
  color: #969696;
}
.blogPage {
}
</style>
