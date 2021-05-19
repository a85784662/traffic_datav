import request from '@/utils/request'

// 获取巡河记录
export function ajaxTourRecord() {
  return request({
    url: 'yzjtj/tourrecord/tourRecord/all',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 获取节水型社会建设内容
export function ajaxWaterSaving() {
  return request({
    url: '/yzjtj/watersaving/waterSaving/latest',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 获取涉河建设项目
export function ajaxWaterProject() {
  return request({
    url: '/yzjtj/waterproject/waterProject/list?pageSize=50',
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

// 获取全量水土保持项目审批数据
export function ajaxWaterSoilPlanIssue() {
  return request({
    url: `/yzjtj/watersoilplanissue/waterSoilPlanIssue/all`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}
