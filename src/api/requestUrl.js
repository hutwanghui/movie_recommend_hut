/**
 * 请求地址统一处理／组装
 * @param {*} actionName action方法名称
 */
export default function (actionName) {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
}

export function authorUrl (actionName) {
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxy/' : window.SITE_CONFIG. baseUrl_2) + actionName
}
export function apiUrl (actionName) {
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/kkapi/' : window.SITE_CONFIG.baseUrl_3) + actionName
}
