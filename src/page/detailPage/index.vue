<template>
  <div>
    <div class="css-blogDetail">
      <div class="blog-title">{{blogDetail.title}}</div>
      <div class="recommend-list css-width3">
        <div class="recommend-content css-width2">
          <el-avatar :size="45" :src="blogDetail.avatarUrl"></el-avatar>
        </div>
        <div class="recommend-content css-width6">
          <div class="css-blogDetailTitle">{{blogDetail.authName}}          <el-tag type="success" effect="plain">关注</el-tag></div>
          <div class="recommend-maincontent">写了{{blogDetail.keyword}}字 . {{blogDetail.like}}喜欢</div>
        </div>
      </div>
    </div>
    <div class="recommend-content css-width10">
      {{blogDetail.content}}
    </div>
  </div>
</template>

<script>
import avatarUrl from '@/assets/images/avatar.jpg'

export default {
  name: 'detailPage',
  data () {
    return {
      msg: '详情页',
      blogDetail: {'title': '《精英律师》：豆瓣评分5.3，恶评如潮，为何还有人一直在追', 'authName': '来自星星的你', 'avatarUrl': avatarUrl, 'content': 'vue 出现Elements in iteration expect to have &#x27;v-bind:key&#x27; directives问题 - 简书</title><meta name="robots" content="index,follow"/><meta name="googlebot" content="index,follow"/><meta name="description" content="搜尽各大神 最后得出原因是eslint检测出现bug 解决方法有两种 v-for 后添加 :key=&#x27;item&#x27; 在build处关闭eslint检测 ...(config.d..."/><meta name="twitter:card" content="summary"/><meta name="twitter:site" content="@jianshu.com"/><meta property="fb:app_id" content="865829053512461"/><meta property="og:url" content="https://www.jianshu.com/p/2cf1a0736154"/><meta property="og:type" content="article"/><meta property="og:title" content="vue 出现Elements in iteration expect to have &#x27;v-bind:key&#x27; directives问题"/><meta property="og:description" content="搜尽各大神 最后得出原因是eslint检测出现bug 解决方法有两种 v-for 后添加 :key=&#x27;item&#x27; 在build处关闭eslint检测 ...(config.d...', 'keyword': 12344, 'like': '43K'}
    }
  },
  methods: {

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
.recommend-click{
  font-family: "Arial Black";
  font-size: 14px;
  color: #46C039;
}
.recommend-maincontent{
  font-size: 14px;
  color: #969696;
}
</style>
