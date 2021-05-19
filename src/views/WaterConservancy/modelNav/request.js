import request from '@/utils/request'


// 获取取水点列表
export function ajaxWaterCollectionPoint() {
  return request({
    url: `/yzjtj/watercollectionpoint/waterCollectionPoint/all`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}


















