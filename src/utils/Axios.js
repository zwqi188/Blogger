import axios from 'axios'
import NProgress from 'nprogress'
import qs from 'qs'

let $http = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: false,
  timeout: 10000,
  validateStatus: function (status) {
    switch (status) {
      case 200:
        return status
      case 204:
        return status
      case 401:
        // router.push({path: '/login'})
        break
      case 403:
        // 未登录
        // router.push({path: '/403'})
        break
      case 404:
        // router.push({path: '/404'})
        break
      default:
        break
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
  if (response.data.code === '1000') {
    return Promise.resolve(response.data)
  } else if (response.data.code === '1004') {
    alert(response.data.message)
    setTimeout(() => { window.location.href = '#/login' }, 1000)
  }
}, error => {
  // NProgress.done()
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
    config['headers']['token'] = localStorage.user_id_token
    config['withCredentials'] = true
  }
  return $http.post(url, data, config)
}
export default $http
