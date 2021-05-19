import request from '@/utils/request'

// 港航-获取港口企业信息
export function ajaxShippingCorp() {
  return request({
    url: '/yzjtj/shippingcorp/shippingCorp/all',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 港航-获取航运企业信息
export function ajaxPortCorp() {
  return request({
    url: '/yzjtj/portcorp/portCorp/all',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 获取客运数据
export function ajaxVisitorData() {
  return request({
    url: '/yzjtj/visitordata/visitorData/list',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 获取货运数据
export function ajaxCargoData() {
  return request({
    url: '/yzjtj/cargodata/cargoData/list',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}
