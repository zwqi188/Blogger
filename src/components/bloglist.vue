<template>
  <div>
    <v-discovery></v-discovery>
    <div>博客列表</div>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  </div>
</template>

<script>
import Discovery from '@/page/discoveryPage/discovery'
export default {
  name: 'bloglist',
  components: {
    'v-discovery': Discovery
  }
}
</script>

<style scoped>
  ul li{
    width: 100%;
    float: left;
    list-style: none;
  }
</style>
