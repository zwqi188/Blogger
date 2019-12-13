<template>
  <div class="div_main">
    <el-container>
      <el-header><v-header></v-header></el-header>
      <el-container>
        <el-aside width="300px"><v-aside></v-aside></el-aside>
        <el-container>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
      <el-container>
        <el-footer><v-footer></v-footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/footer'
import Aside from '@/components/layout/aside'
export default {
  name: 'index.vue',
  data: function () {
    return {}
  },
  components: {
    'v-header': Header,
    'v-footer': Footer,
    'v-aside': Aside
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    margin: 0px;
    padding: 0px;
    width: 100%;
    text-align: center;
    line-height: 90px;
  }

  .el-aside {
    color: #333;
    text-align: center;
    line-height: 300px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
