import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/layout/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/main.html'
    },
    {
      path: '/main.html',
      component: Layout
    }
  ]
})
