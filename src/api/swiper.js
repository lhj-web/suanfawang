import { request } from './request'

export function getSwiperImg() {
  return request({
    url: '/api/indexcontents'
  })
}
