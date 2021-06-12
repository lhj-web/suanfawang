import { verifyRequest, request } from './request'

export function getAuthCode(uuid) {
  return request({
    url: `/api/image_codes/${uuid}`
  })
}

export function addRequirement(info, uuid) {
  return verifyRequest({
    url: '/my/notice',
    method: 'post',
    data: {
      ...info,
      uuid
    }
  })
}
