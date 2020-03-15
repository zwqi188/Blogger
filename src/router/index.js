import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/page/mainPage/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/404',
      component: () => import('@/page/404Page/index'),
      hidden: true,
      meta: {keepAlive: true}
    },
    {
      path: '',
      redirect: '/main/discovery'
    },
    {
      path: '/main',
      component: MainPage,
      children: [{
        path: 'detail',
        name: 'vue_detail',
        component: () => import('@/page/detailPage/index')
      },
      {
        path: 'discovery',
        name: 'vue_discovery',
        component: () => import('@/page/discoveryPage/discovery')
      },
      {
        path: 'editor',
        name: 'vue_publishArticle',
        component: () => import('@/page/publishArticle/index')
      },
      {
        path: 'concern',
        name: 'vue_concern',
        component: () => import('@/page/concernPage/index')
      },
      {
        path: 'share',
        name: 'vue_share',
        component: () => import('@/page/sharePage/index')
      }, {
        path: 'about',
        name: 'vue_about',
        component: () => import('@/page/aboutPage/index')
      }, {
        path: 'message',
        name: 'vue_message',
        component: () => import('@/page/messagePage/index')
      }, {
        path: 'setting',
        name: 'vue_setting',
        component: () => import('@/page/settingPage/index')
      }
      ]
    },
    {
      path: '/editor',
      component: () => import('@/page/publishArticle/index'),
      hidden: true
    },
    {
      path: '/sign',
      component: () => import('@/page/signInPage/sign'),
      hidden: true
    },
    {
      path: '/login',
      component: () => import('@/page/signInPage/login'),
      hidden: true
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true,
      meta: {keepAlive: true}
    }
  ]
})
