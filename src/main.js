// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import $http from './utils/Axios.js'

// 定义全局变量
Vue.prototype.http = $http

Vue.use(ElementUI, { locale })
Vue.use(VueRouter)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
