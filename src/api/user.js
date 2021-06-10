import { request, verifyRequest, jsonRequest } from './request'

function generateUuid() {
  const tempUrl = URL.createObjectURL(new Blob());
  const uuid = tempUrl.toString();
  URL.revokeObjectURL(tempUrl);
  return uuid.substr(uuid.lastIndexOf('/') + 1);
}

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
    method: 'put',
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
