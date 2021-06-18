import { request, verifyRequest } from './request'

export function getCateList() {
  return request({
    url: '/api/categorys'
  })
}

export function getListData(pagenum, cate_id) {
  return request({
    url: '/api/notices',
    params: {
      pagenum,
      cate_id,
      pagesize: 5
    }
  })
}

export function getDetail(id) {
  return request({
    url: `/api/notice/${id}`
  })
}

export function getMyList(pagenum) {
  return verifyRequest({
    url: '/my/notice',
    params: {
      pagenum,
      pagesize: 5
    }
  })
}
