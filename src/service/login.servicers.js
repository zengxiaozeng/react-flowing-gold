import request from './request'

export function getAccountInfo() {
  return request({
    method: 'get',
    url: '/creative/backstage/account'
  })
}

// 手机号码登录
export function loginMboile(data) {
  return request({
    url: '/creative/backstage/public/login',
    method: 'post',
    data: {
      loginName: data.loginName,
      password: data.password,
      rememberMe: true
    }
  })
}


