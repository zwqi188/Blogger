<template>
  <div class="css-recommend-auth">
    <div class="recommend-title">
      <div class="recommend-title-left css-width3">推荐作者</div>
      <div class="recommend-title-right css-width3"><i class="el-icon-refresh"></i><a href="#">换一批</a></div>
    </div>
    <div class="recommend-list">
      <ul>
        <li v-for="item in recommendAuthList">
          <div class="recommend-content css-width2">
            <el-avatar :size="45" :src="item.avatarUrl"></el-avatar>
          </div>
          <div class="recommend-content css-width6">
            <div>{{item.name}}</div>
            <div class="recommend-maincontent">写了{{item.keyword}}字 . {{item.like}}喜欢</div>
          </div>
          <div class="recommend-content css-width2 recommend-click">
            + 关注
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import avatarUrl from '@/assets/images/avatar.jpg'

export default {
  name: 'recommend',
  data () {
    return {
      recommendAuthList: [
        {'avatarUrl': avatarUrl, 'name': '张三', 'keyword': 12344, 'like': '43K'},
        {'avatarUrl': avatarUrl, 'name': '李四', 'keyword': 54, 'like': '90'},
        {'avatarUrl': avatarUrl, 'name': 'hahha', 'keyword': 5, 'like': '97'},
        {'avatarUrl': avatarUrl, 'name': 'jkjl', 'keyword': 45, 'like': '93K'},
        {'avatarUrl': avatarUrl, 'name': '4242', 'keyword': 65, 'like': '0'}]
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
