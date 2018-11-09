import request from '../request'
import {authorUrl, apiUrl} from '../requestUrl'
import requestParam from '../requestParam'
import axios from 'axios'
import Qs from 'qs'
import $ from 'jquery'
// 获取验证码
export function captcha(uuid) {
  return authorUrl(`/oauthcode/image?_=` + uuid)
}

// 登录
export function login(params) {
  // request.defaults.headers.common['Authorization'] = 'Basic a2tjbXMtY2xpZW50OmtrY21zLXNlY3JldA=='
  // return request({
  //   // url: requestUrl('/sys/login'),
  //   url: authorUrl('/authentication/form'),
  //   method: 'post',
  //   headers: {
  //     'Authorization': 'Basic a2tjbXMtY2xpZW50OmtrY21zLXNlY3JldA=='
  //   },
  //   data: requestParam(params)
  // })

  return axios.request({
    url: authorUrl('/authentication/form'),
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = Qs.stringify(data)
      return data
    }],
    headers: {
      'Authorization': 'Basic ' + 'a2tjbXMtY2xpZW50OmtrY21zLXNlY3JldA==',
      'Content-Type': 'application/x-www-form-urlencoded',
      'devicedId': 'wanghui'
    },
    data: params,
    method: 'POST'
  })
}

export function getInfo(token) {
  return $.ajax({
    url: apiUrl('rest/jwt'),
    method: 'get',
    async: false, //或false,是否异步
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

// 退出
export function logout() {
  return request({
    // url: requestUrl('/sys/logout'),
    url: authorUrl('/logout'),
    method: 'post',
    data: requestParam()
  })
}
