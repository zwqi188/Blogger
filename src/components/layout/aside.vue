<template>
  <div>
    <div class="div_inteview"><dl><dt>日访问</dt><dd>12</dd></dl></div>
    <div class="div_inteview"><dl><dt>周访问</dt><dd>24</dd></dl></div>
    <div class="div_inteview"><dl><dt>月访问</dt><dd>100</dd></dl></div>
    <div class="div_inteview"><dl><dt>总访问</dt><dd>99</dd></dl></div>
  </div>
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
  }
}
</script>

<style scoped>
  .div_inteview {
    width: 25%;
    float: left;
  }
  .div_inteview dl {
    margin-top: -120px;
  }
</style>
