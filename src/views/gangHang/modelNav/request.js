import request from '@/utils/request'


// 获取趸船列表 
export function ajaxBoatList() {
  return request({
    url: '/yzjtj/boat/boat/v2/list',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

