import { request, verifyRequest, jsonRequest } from './request'

export function register(data) {
  return request({
    url: '/api/regiser',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return verifyRequest({
    url: '/my/userinfo'
  })
}

export function updateUserInfo(data) {
  return verifyRequest({
    url: '/my/userinfo',
    method: 'post',
    data
  })
}

export function resetPassword(data) {
  return verifyRequest({
    url: '/my/pwd',
    method: 'post',
    data
  })
}

export function changeAvatar(data) {
  return verifyRequest({
    url: '/my/avatar',
    method: 'post',
    data
  })
}
