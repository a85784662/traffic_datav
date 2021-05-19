import request from '@/utils/request'

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


// 驾校招生统计
export function ajaxDrivingSch() {
  return request({
    url: `/yzjtj/driving_sch/drivingSch/all`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result.records
    } else {
      return Promise.reject(res.message)
    }
  })
}


// 网约车统计(quan)
export function ajaxVehicle() {
  return request({
    url: `/yzjtj/operatorbaseinfo/operatorBaseInfo/vehicle/online`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}






















