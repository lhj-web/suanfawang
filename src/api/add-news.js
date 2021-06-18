import { uploadRequest, request } from './request'

export function getAuthCode(uuid) {
  return request({
    url: `/api/image_codes/${uuid}`
  })
}

export function addRequirement(data) {
  return uploadRequest({
    url: '/my/notice',
    method: 'post',
    data
  })
}

export function updateRequirement(id, data) {
  return uploadRequest({
    url: `/my/notice/${id}`,
    method: 'put',
    data
  })
}
