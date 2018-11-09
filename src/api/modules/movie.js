import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'
import Qs from 'qs'
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

// 用户评分电影事件
export function score(params) {
  return request({
    url: requestUrl('/sys/user/update'),
    method: 'post',
    data: requestParam(params)
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
