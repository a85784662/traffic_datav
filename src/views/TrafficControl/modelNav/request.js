import request from '@/utils/request'


// 获取圆形范围内公交车的GPS定位 
export function ajaxBusGpsData(center) {
  return request({
    url: `/yzjtj/busgpsdata/busGpsData/range?center=${center}`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 获取原型范围内两客一危车辆的GPS定位

export function ajaxDangerGpsData(center) {
  return request({
    url: `/yzjtj/dangergpsdata/dangerGpsData/range?center=${center}`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 获取全部维修企业信息

export function ajaxVehicle() {
  return request({
    url: `/yzjtj/operatorbaseinfo/operatorBaseInfo/vehicle/maint/all`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}


// 获取驾校场地列表 
export function ajaxQueryInfosWithAddress() {
  return request({
    url: '/yzjtj/driving_sch/drivingSch/queryInfosWithAddress',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}


// 获取监控基础信息全列表
export function ajaxMonitorList(type) {
  return request({
    url: `/yzjtj/monitor/monitor/queryBaseInfo?tag=${type}`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 获取公交线路列表
export function ajaxBusLine(pageSize = 5, corporation = "", pageNo = 1) {
  return request({
    url: `/yzjtj/busline/busLine/list?pageSize=${pageSize}&corporation=${corporation}&pageNo=${pageNo}`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 通过ID获取公交线路详情

export function ajaxQueryById(id) {
  return request({
    url: `/yzjtj//busline/busLine/queryById?id=${id}`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}




















