import request from '@/utils/request'

// 企业信息 - 查询最新企业信息
export function ajaxCorpInfo(params) {
  return request({
    url: '/yzjtj/corpinfo/corpInfo/latest',
    method: 'get',
    params
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 车辆信息 - 查询最新车辆信息
export function ajaxVehicleInfo() {
  return request({
    url: '/yzjtj/vecinfo/vehicleInfo/latest',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 获取水文信息 
export function ajaxWaterInfo() {
  return request({
    url: '/yzjtj/waterinfo/waterInfo/data',
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
    url: '/yzjtj/deptinfo/deptGeneralInfo/latest',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 获取视频监控列表
export function ajaxMonitorInfo(monitorType) {
  return request({
    url: `/yzjtj/moninfo/monitorInfo/list?monitorType=${monitorType}`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 通过车辆类型获取车辆数、吨位数

export function ajaxVariationtendency(type) {
  return request({
    url: `/yzjtj/operatorbaseinfo/operatorBaseInfo/vehicle/variationtendency?type=${type}`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}


// 通过企业经营范围获取企业车辆数

export function ajaxCorpinfo(type) {
  return request({
    url: `/yzjtj/operatorbaseinfo/operatorBaseInfo/corpinfo?scope=${type}`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}



















