/**
 * 生产环境
 */
;(function () {
  window.SITE_CONFIG = {}
  // api请求地址
  window.SITE_CONFIG.baseUrl = '//www.hutwanghui.club/kkcms-houtai'
  window.SITE_CONFIG.baseUrl_2 = '//www.hutwanghui.club/kkcms-gate'
  window.SITE_CONFIG.baseUrl_3 = '//www.hutwanghui.club/kkcms-api'
  // 嵌套iframe地址
  window.SITE_CONFIG.nestIframeUrl = '//www.hutwanghui.club/kkcms-houtai'
  // 嵌套iframe路由名称列表
  window.SITE_CONFIG.nestIframeRouteNameList = ['sql']

  // 静态资源文件夹名称
  window.SITE_CONFIG.staticFileName = ''
  // cdn地址
  window.SITE_CONFIG.cdnUrl = './' + window.SITE_CONFIG.staticFileName
})();
