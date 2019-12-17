<template>
 <div>
    <div class="div_welcome_left"><i class="el-icon-eleme"></i>欢迎来访！</div>
    <div class="div_welcome_right">注册|登录<el-avatar :size="40" :src="circleUrl"></el-avatar></div>
 </div>
</template>
<script>
import avatarUrl from '@/assets/images/avatar.png'

export default {
  name: 'br',
  data () {
    return {
      circleUrl: avatarUrl
    }
  }
}
</script>

<style scoped>
.div_welcome_left {
  margin-top: 4px;
  padding-left: 25px;
  float: left;
  size: 14px;
}
.div_welcome_right {
  margin-top: 4px;
  padding-right: 25px;
  float: right;
}
</style>
