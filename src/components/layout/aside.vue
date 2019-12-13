<template>
  <el-aside>
    <el-button-group>
      <el-button type="primary" icon="el-icon-arrow-left" plain>上一篇</el-button>
      <el-button type="primary" plain>下一篇<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
    <div class="demo-image">
      <div class="block">
        <span class="demonstration">fit</span>
        <el-image
          style="width: 100px; height: 100px"
          :src="url"></el-image>
      </div>
    </div>
  </el-aside>
</template>

<script>
import demoImg from '@/assets/images/avatar.png'
export default {
  name: 'aside',
  data () {
    return {
      url: demoImg,
      fits: 'fill'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>
