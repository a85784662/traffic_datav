import request from '@/utils/request'

// 企业信息 - 查询最新企业信息
export function ajaxCorpInfo(params) {
  return request({
    url: '/yzjtj/operatorbaseinfo/operatorBaseInfo/corp/statistics',
    method: 'get',
    params
  }).then(res => {
    if (res.code == 200) {
      return res.result.detail
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 车辆信息 - 查询最新车辆信息
export function ajaxVehicleInfo() {
  return request({
    url: '/yzjtj/operatorbaseinfo/operatorBaseInfo/vehicle/statistics',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result.detail
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 获取水文信息 
export function ajaxWaterInfo() {
  return request({
    url: '/yzjtj/hydrologyinfo/hydrologyInfo/latest?interval=5',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 获取部门信息 
export function ajaxDeptGeneralInfo() {
  return request({
    url: '/yzjtj/announcement/announcement/latest',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}























