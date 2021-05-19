import request from '@/utils/request'


// 获取枢纽站列表 
export function ajaxJunction() {
  return request({
    url: '/yzjtj/junction/junction/all',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

