import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/page/mainPage/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/404',
      component: () => import('@/page/404Page/index'),
      hidden: true
    },
    {
      path: '',
      redirect: '/main'
    },
    {
      path: '/main',
      component: MainPage,
      children: [{
        path: 'hotlist',
        name: 'vue_hotlist',
        component: () => import('@/components/hotlist')
      },
      {
        path: 'detail',
        name: 'vue_detail',
        component: () => import('@/page/detailPage/index')
      },
      {
        path: 'share',
        name: 'vue_share',
        component: () => import('@/components/hotlist')
      },
      {
        path: 'discovery',
        name: 'vue_discovery',
        component: () => import('@/components/hotlist')
      },
      {
        path: 'editor',
        name: 'vue_editor',
        component: () => import('@/page/tinymce/index')
      }
      ]
    },
    {
      path: '/editor',
      component: () => import('@/page/tinymce/index'),
      hidden: true
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]
})
