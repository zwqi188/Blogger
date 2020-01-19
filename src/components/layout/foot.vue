<template>
  <div class="block">
    <div class="css-footer css-width10">
      <div class="footer-link">
        <ul>
          <li>关于箴言</li>
          <li>联系我们</li>
          <li>说明</li>
        </ul>
      </div>
      <div class="footer-relate css-width10">
        ©2019-2020 科技公司 / 箴言 / 沪ICP备645657657号9 /
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'foot'
}
</script>

<style scoped>
  .css-footer{
    margin-top: 90px;
    float: left;
    height: 100px;
  }
  .footer-link {
    color: #969696;
    font-size: 14px;
  }
  .footer-link li {
    list-style: none;
    float: left;
    padding-right: 20px;
  }
  .footer-relate {
    color: #969696;
    font-size: 14px;
  }
</style>
