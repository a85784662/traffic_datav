import axios from 'axios'
import request from '@/utils/request'

// 获取铁建项目列表 
export function ajaxRailwayProjectList() {
  return request({
    url: '/yzjtj/railproj/railwayProject/v2/list',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

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

// 获取监控基础信息全列表
export function ajaxMonitorList() {
  return request({
    url: '/yzjtj/monitor/monitor/queryBaseInfo',
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
    url: `/yzjtj/busline/busLine/queryById?id=${id}`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// // 获取交通状况
// export function ajaxTrafficStatus() {
//   return axios.get('http://23.99.195.29:3000/traffic/status').then((res) => {
//     return Promise.resolve(res.data)
//   })
// }


// // 获取人流状况
// export function ajaxPopulation() {
//   return axios.get('http://23.99.195.29:3000/population').then((res) => {
//     return Promise.resolve(res.data)
//   })
// }

// 获取交通状况
export function ajaxTrafficStatus() {
  return axios.get('http://172.168.10.21:3000/traffic/status').then((res) => {
    return Promise.resolve(res.data)
  })
}


// 获取人流状况
export function ajaxPopulation() {
  return axios.get('http://172.168.10.21:3000/population').then((res) => {
    return Promise.resolve(res.data)
  })
}

















