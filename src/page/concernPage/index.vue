<template>
  <div>
    <div class="css-concern css-width3">
      <div class="infinite-list2">
        <div class="all-concern">全部关注</div>
      </div>
      <div class="infinite-list">
        <ul>
          <li v-for="item in recommendAuthList" :key="item" class="concern-li">
            <div class="recommend-content css-width2">
              <el-avatar :size="45" :src="item.avatarUrl"></el-avatar>
            </div>
            <div class="recommend-content css-width8">
              <div>{{item.name}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="css-concern css-width7">
      <div class="css-width2 css-recommend-man">
        <el-avatar :size="70" :src="user.avatarUrl"></el-avatar>
      </div>
      <div class="css-width8 css-recommend-man css-recommend-title">
        <div class="recommend-man-name">{{user.name}}</div>
        <div class="recommend-maincontent">写了{{user.keyword}}字 . {{user.like}}喜欢</div>
      </div>
    </div>
  </div>
</template>

<script>
import avatarUrl from '@/assets/images/avatar.jpg'

export default {
  name: 'concernPage',
  data () {
    return {
      count: 10,
      loading: false,
      recommendAuthList: [
        {'avatarUrl': avatarUrl, 'name': '张三', 'keyword': 12344, 'like': '43K'},
        {'avatarUrl': avatarUrl, 'name': '李四', 'keyword': 54, 'like': '90'},
        {'avatarUrl': avatarUrl, 'name': 'hahha', 'keyword': 5, 'like': '97'},
        {'avatarUrl': avatarUrl, 'name': 'jkjl', 'keyword': 45, 'like': '93K'},
        {'avatarUrl': avatarUrl, 'name': '4242', 'keyword': 65, 'like': '0'}],
      user: {'avatarUrl': avatarUrl, 'name': '张三', 'keyword': '12344', 'like': '43K'}
    }
  },
  methods: {
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
