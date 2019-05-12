// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'       // api: https://github.com/vuejs/vue-router
import store from '@/storage'         // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'  // api: https://github.com/alfhen/vue-cookie
import '@/element-ui'               // api: https://github.com/ElemeFE/element

import '@/scss/variables.scss'
import '@/scss/media-queries.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-list-marquee/dist/vue-list-marquee.css'
import VueListMarquee from 'vue-list-marquee'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.use(VueListMarquee)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  data: {
    eventHub: new Vue()
  }
})
