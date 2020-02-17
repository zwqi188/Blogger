<template>
  <div class="css-recommend-auth">
    <div class="recommend-title">
      <div class="recommend-title-left css-width3">推荐作者</div>
      <div class="recommend-title-right css-width3">
        <a href="#" @click="reGetRecommendUserFromServer()">
        <font-awesome-icon class="css_icon" icon="telegram" fixed-width/>换一批</a>
      </div>
    </div>
    <div class="recommend-list">
      <ul>
        <li v-for="item in recommendUser" :key="item">
          <div class="recommend-content css-width2">
            <el-avatar :size="45" :src="item.avatarUrl"></el-avatar>
          </div>
          <div class="recommend-content css-width6">
            <div>{{item.userName}}</div>
            <div class="recommend-maincontent">写了{{item.userWordNumber}}个字  · {{item.userLike}}人喜欢</div>
          </div>
          <div class="recommend-content css-width2 recommend-click">
            <el-button v-show="!item.hasConcern" class="button-new-tag" size="small" @click="showInput">+ 关注</el-button>
            <el-tag v-show="item.hasConcern" :key="name" closable :type='success'>已关注</el-tag>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RequestUrl from '@/utils/RequestUrl'

export default {
  name: 'recommend',
  created () {
    this.getRecommendUserFromServer()
  },
  data () {
    return {
      recommendUser: null,
      recommendIndex: 1
    }
  },
  methods: {
    getRecommendUserFromServer () {
      let params = {
        userId: '1',
        index: this.recommendIndex
      }
      let url = RequestUrl.GET_RECOMMEND_USER
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.recommendUser = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    reGetRecommendUserFromServer () {
      this.recommendIndex = this.recommendIndex + 1
      this.getRecommendUserFromServer()
    }
  }
}
</script>

<style scoped>
  .recommend-title {
    font-family: "Arial Black";
    color: #999999;
    font-size: 15px;
  }
.recommend-title-left{
  float: left;
  padding-left: 20px;
}
.recommend-title-right{
  float: right;
}
.recommend-title-right a{
  color: #999999;
}
.recommend-list {
  padding-top: 30px;
  text-align: left;
}
.recommend-list li{
  list-style: none;
  padding-top: 20px;
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
