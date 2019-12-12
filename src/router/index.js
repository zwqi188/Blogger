import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/page/mainPage/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/404',
      component: () => import('@/components/404'),
      hidden: true
    },
    {
      path: '',
      redirect: '/main.html'
    },
    {
      path: '/main.html',
      component: MainPage,
      children: [{
        path: 'header',
        name: 'vue_header',
        component: () => import('@/components/layout/Header')
      }]
    }
  ]
})
