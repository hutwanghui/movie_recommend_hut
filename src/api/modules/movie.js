import request from '../request'
import requestUrl, {apiUrl, authorUrl, userUrl} from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'
import Qs from 'qs'
import axios from "axios/index";
import $ from "jquery";

// 获取用户收藏电影列表
export function getFavoriteMovies(username) {
  return request({
    url: requestUrl('api/movie/favorite/get/?username=' + username),
    method: 'get',
    // headers: {
    //   'Content-Type': 'application/json; charset=utf-8'
    // }
  })
}

// 获取用户当前电影评分
export function getMovieRateByMovieId(movieId,username) {

  return $.ajax({
    url: requestUrl('api/movie/personaldate/get?movieId='+ movieId+'&username='+username),
    method: 'get',
    async: false, //或false,是否异步
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//登陆(简易单系统)
export function login_simple(params) {
  return axios.request({
    url: requestUrl('api/authentication/form'),
    data: params,
    method: 'POST'
  })
}
// 注册
export function register(params) {
  return request({
    url: requestUrl('/api/register'),
    headers: {
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'POST'
  })
}

export function getInfo() {
  return $.ajax({
    url: requestUrl('/api/getuserinfo'),
    method: 'get',
    async: false, //或false,是否异步
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}


export function checkIfFavoriteMovies(params) {
  return request({
    url: requestUrl('/api/movie/checkIfFavorite'),
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = Qs.stringify(data)
      return data
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    params: params
  })
}

// 获取基于用户推荐电影列表
export function getUserRecommendMovies(id) {
  return request({
    url: requestUrl('/sys/user/info' + (isInteger(id) ? id : '')),
    method: 'get'
  })
}

// 获取基于模型推荐电影列表
export function getModelRecommendMovies(params) {
  return request({
    url: requestUrl('/sys/user/password'),
    method: 'post',
    data: requestParam(params)
  })
}

// 用户收藏电影事件
export function addOrRemoveFavorite(params) {
  // window.alert(params)
  return request({
    url: requestUrl('/api/movie/favorite'),
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = Qs.stringify(data)
      return data
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    params: params
  })
}

// 冷启动用户电影获取事件
export function initGet() {
  return request({
    url: requestUrl('/api/movie/initRecommend/get/'),
    method: 'get',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = Qs.stringify(data)
      return data
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 冷启动用户电影保存事件
export function initSave(params) {
  return request({
    url: requestUrl('/api/movie/initRecommend/save'),
    method: 'post',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = Qs.stringify(data)
      return data
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: params
  })
}


// 用户评分电影事件
export function score(params) {
  return request({
    url: requestUrl('/api/movie/kafka/score'),
    method: 'post',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = Qs.stringify(data)
      return data
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: params,
  })
}

// 删除用户
export function del(params) {
  return request({
    url: requestUrl('/sys/user/delete'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}
