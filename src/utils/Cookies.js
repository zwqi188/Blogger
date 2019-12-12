/**
 * session存储数据
 * @param token
 * @param value
 */
export function setCookie (token, value) {
  localStorage.setItem(token, value)
}

/**
 * 获取session
 * @param token
 * @returns {string}
 */
export function getCookie (token) {
  let value = localStorage.getItem(token)
  if (value) {
    return JSON.parse(value)
  }
}

/**
 * 删除session
 * @param token
 */
export function removeCookie (token) {
  return localStorage.removeItem(token)
}
