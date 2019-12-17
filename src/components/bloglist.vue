<template>
  <el-row>
    <el-col :span="24">
      <div>博客列表</div>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </el-col>
    <el-col :span="24">
      <el-pagination
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'bloglist'
}
</script>

<style scoped>
  ul li{
    width: 100%;
    float: left;
    list-style: none;
  }
</style>
