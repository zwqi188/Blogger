<template>
  <div class="bods">
    <v-carousel></v-carousel>
    <div>博客列表</div>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  </div>
</template>

<script>
import Carousel from '@/components/carousel'
export default {
  name: 'bloglist',
  components: {
    'v-carousel': Carousel
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
