import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/page/mainPage/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/404.html',
      component: () => import('@/page/404Page/index'),
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
        component: () => import('@/components/layout/header')
      }
      ]
    },
    {
      path: '*',
      redirect: '/404.html',
      hidden: true
    }
  ]
})
