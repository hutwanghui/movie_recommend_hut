/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {}
  // api接口请求地址
  window.SITE_CONFIG.baseUrl = '//localhost:8960/kkcms-houtai'
  // window.SITE_CONFIG.baseUrl = '//www.hutwanghui.club:8960/kkcms-houtai'
  window.SITE_CONFIG.baseUrl_2 = '//localhost:8960/kkcms-gate'
  // window.SITE_CONFIG.baseUrl_2 = '//www.hutwanghui.club:8960/kkcms-gate'
  window.SITE_CONFIG.baseUrl_3 = '//localhost:8960/kkcms-api'
  // window.SITE_CONFIG.baseUrl_3 = '//www.hutwanghui.club:8960/kkcms-api'
  window.SITE_CONFIG.baseUrl_4 = '//localhost:8960/kkcms-user'
  // window.SITE_CONFIG.baseUrl_4 = '//www.hutwanghui.club:8960/kkcms-user'
  // 嵌套iframe地址
  window.SITE_CONFIG.nestIframeUrl = '//localhost:8960/kkcms-houtai/'
  // window.SITE_CONFIG.nestIframeUrl = '//www.hutwanghui.club:8960/kkcms-houtai/'
  // 嵌套iframe路由名称列表
  window.SITE_CONFIG.nestIframeRouteNameList = ['sql']
  // 静态资源文件夹名称
  window.SITE_CONFIG.staticFileName = ''
  // cdn地址
  window.SITE_CONFIG.cdnUrl = './' + window.SITE_CONFIG.staticFileName
})();
