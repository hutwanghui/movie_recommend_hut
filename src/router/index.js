import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./import-' + process.env.NODE_ENV)
Vue.use(Router)

// 路由定义使用说明:
// 1. 代码中路由统一使用name属性跳转.
// 2. 开放path属性用做简短路由, 比如: '/a1', 访问地址: www.renren.io/#/a1
export default new Router({
  mode: 'hash',
  routes: [
    {
      name: 'home',
      path: '/',
      components: {
        'list-router-view': _import('Home')
      }
    },
    {
      name: 'home-category',
      path: '/movies/:category',
      components: {
        'list-router-view': _import('MoviesList')
      }
    },
    {
      name: 'search',
      path: '/search/:query',
      components: {
        'search-router-view': _import('MoviesList')
      }
    },
    {
      name: 'movie',
      path: '/movie/:id',
      components: {
        'page-router-view': _import('MoviePage')
      },
      beforeEnter: (to, from, next) => {
        if (document.querySelector('.nav__hamburger--active')) {
          document.querySelector('.nav__hamburger').classList.remove('nav__hamburger--active')
          document.querySelector('.nav__list').classList.remove('nav__list--active')
        }
        next()
      }
    },
    {
      name: 'profile',
      path: '/profile',
      components: {
        'search-router-view': _import('Profile')
      }
    },
    {name: 'login', path: '/login', components: {'page-router-view': _import('Login')}},
    {
      name: '404',
      path: '/404',
      components: {
        'page-router-view': _import('404')
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
