import request from '@/utils/request'

// 获取视频监控列表
export function ajaxMonitorInfo(type = '', pageNo = 1, pageSize = 7) {

  return request({
    url: `/yzjtj/monitor/monitor/list?type=${type}&pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}