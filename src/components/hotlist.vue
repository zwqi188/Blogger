<template>
  <div>
    <div class="div_hot_title">
      热门排行
    </div>
    <div v-for="(o,index) in 4" :key="o" class="text item">
      {{index+1}}:{{'列表内容 ' + o }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'hotlist'
}
</script>

<style scoped>
  .div_hot_title {
    background-color: #D46366;
    height: 30px;
    margin: 0px;
    padding: 0px;
    height: 10px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 10px;
    height: 10px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
