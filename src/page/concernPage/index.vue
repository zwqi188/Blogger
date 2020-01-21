<template>
  <div>
    <div class="css-concern css-width4">
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
    <div class="css-recommend css-width6">
      <div class="recommend-content css-width2">
        <el-avatar :size="70" :src="user.avatarUrl"></el-avatar>
      </div>
      <div class="recommend-content css-width6">
        <div>{{user.name}}</div>
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
</style>
