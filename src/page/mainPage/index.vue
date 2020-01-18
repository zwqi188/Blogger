<template>
  <div class="div-main">
    <div class="css-width10">
      <v-header></v-header>
    </div>
    <div class="css-width8 showbody">
        <router-view/>
    </div>
    <div class="css-width10">
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default {
  name: 'index.vue',
  data: function () {
    return {}
  },
  components: {
    'v-header': Header,
    'v-footer': Footer
  }
}
</script>

<style>
  .div-main {
    margin-top: 30px;
  }
  a {
    text-decoration: none;
  }
 .css-width1 {
   width: 10%;
 }
 .css-width2 {
   width: 20%;
 }
 .css-width3 {
   width: 30%;
 }
 .css-width4 {
   width: 40%;
 }
 .css-width5 {
   width: 50%;
 }
 .css-width6 {
   width: 60%;
 }
 .css-width7 {
   width: 70%;
 }
 .css-width8 {
   width: 80%;
 }
 .css-width9 {
   width: 90%;
 }
 .css-width10 {
   width: 100%;
 }
  .showbody {
    margin: 0 auto;
  }
</style>
