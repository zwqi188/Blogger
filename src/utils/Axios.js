import axios from 'axios'
import router from 'vue-router'
import NProgress from 'nprogress'
import qs from 'qs'

let $http = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: true,
  timeout: 10000,
  validateStatus: function (status) {
    switch (status) {
      case 200:
        return status
      case 204:
        return status
      case 401:
        // 未登录
        router.push({path: '/login'})
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.reject('未登录 或 登录已过期')
        break
      case 403:
        // 未登录
        router.push({path: '/403'})
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.reject('无权访问接口')
        break
      case 404:
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.reject('404 资源路径错误')
        break
      default:
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.reject('未处理的status 请检查app.js 中的 checkStatus方法')
    }
  }
})

/* 请求前 拦截器 */
$http.interceptors.request.use(config => {
  NProgress.start()
  return config
}, error => {
  return error
})

/* 响应 拦截器 */
$http.interceptors.response.use(response => {
  NProgress.done()
  // NProgress.remove();
  return Promise.resolve(response.data)
}, error => {
  NProgress.done()
  return Promise.reject(error)
})

$http.postForm = function (url, data, config) {
  if (!config) {
    config = {}
  }
  if (!config['headers']) {
    config['headers'] = {}
  }
  if (!config['headers']['Content-Type']) {
    data = qs.stringify(data)
    config['headers']['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return $http.post(url, data, config)
}

export default $http
