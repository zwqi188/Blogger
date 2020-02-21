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
        <div class="recommend-maincontent">写了{{user.keyword}}字 . {{user.like}}喜欢</div>
      </div>
    </div>
  </div>
</template>

<script>
import RequestUrl from '@/utils/RequestUrl'
import Constant from '@/utils/Constant'

export default {
  name: 'concernPage',
  data () {
    return {
      count: 10,
      loading: false,
      loginId: '',
      followList: null,
      hasClick: false,
      user: []
    }
  },
  created () {
    this.getfollow()
  },
  methods: {
    getUserId () {
      let token = Constant.USER_ID_TOKEN
      this.loginId = this.cookie.get(token)
    },
    getfollow () {
      this.getUserId()
      if (this.loginId === null) {
        this.$message.warning('请先登录！')
        return
      }
      let params = {
        userId: this.loginId
      }
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
      let params = {
        userId: userId
      }
      let url = RequestUrl.QUERY_USER
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.user = res.data
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
</style>
