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
      redirect: '/main/discovery'
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
        path: 'discovery',
        name: 'vue_discovery',
        component: () => import('@/page/discoveryPage/discovery')
      },
      {
        path: 'editor',
        name: 'vue_editor',
        component: () => import('@/page/tinymce/index')
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
      component: () => import('@/page/tinymce/index'),
      hidden: true
    },
    {
      path: '/sign_in',
      component: () => import('@/page/signInPage/index'),
      hidden: true,
      children: [{
        path: 'sign',
        name: 'vue_sign',
        component: () => import('@/page/signInPage/sign')
      },
      {
        path: 'login',
        name: 'vue_login',
        component: () => import('@/page/signInPage/login')
      }]
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]
})
