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

export function getServiceInfo() {
  return request({
    url: '/api/customer/service'
  })
}

export function takeOrder(id) {
  return verifyRequest({
    url: `/my/receive/${id}`,
    method: 'post',
  })
}

export function cancelOrder(id) {
  return verifyRequest({
    url: `/my/receive/${id}`,
    method: 'delete',
  })
}

export function getInfoByid(id) {
  return verifyRequest({
    url: `/api/userinfo/${id}`
  })
}

export function payOrder(id, data) {
  return verifyRequest({
    url: `/my/payorder/${id}`,
    method: 'post',
    data
  })
}

export function popularization() {
  return verifyRequest({
    url: '/my/popularization',
  })
}

export function getTechnician() {
  return request({
    url: '/api/rank'
  })
}

export function userFeedback(data) {
  return jsonRequest({
    url: '/my/feedback',
    method: 'post',
    data,
  })
}

export function getUserProfile(id) {
  return verifyRequest({
    url: `/api/userindex/${id}`,
  })
}

export function getFeedback() {
  return request({
    url: '/api/feedbacklist',
  })
}

export function getMyComment(id) {
  return verifyRequest({
    url: '/my/comment',
    params: {
      payorder_id: id,
    }
  })
}

export function publishComment(data) {
  return verifyRequest({
    url: '/my/comment',
    method: 'post',
    data,
  })
}

export function getPayOrders() {
  return verifyRequest({
    url: '/my/payorders',
  })
}

export function getMyComments() {
  return verifyRequest({
    url: '/my/comments'
  })
}
