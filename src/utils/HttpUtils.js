// get请求获取数据
export function getData (url, sucCallback, failCallback) {
  this.$http.get(url).then(response => {
    sucCallback(response)
  }, response => {
    failCallback(response)
  })
}
/**
 * post请求
 * @param url 要请求的URL地址
 * @param param 要发送的数据对象
 * @param 指定post提交的编码类型为 application/x-www-form-urlencoded
 * @param sucCallback
 * @param failCallback
 */
export function postData (url, param, sucCallback, failCallback) {
  this.$http.post(url, param, { emulateJSON: true }).then(response => {
    sucCallback(response)
  }, response => {
    failCallback(response)
  })
}
// jsonP请求
export function jsonP (url, sucCallback, failCallback) {
  this.$http.jsonp(url).then(response => {
    sucCallback(response)
  }, response => {
    failCallback(response)
  })
}
