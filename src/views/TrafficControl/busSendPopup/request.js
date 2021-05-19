import request from '@/utils/request'

// 分页获取客运站发班线路信息
export function ajaxbusScheduleList(start) {
  return request({
    url: `/yzjtj/busschedule/busSchedule/list?start=${start}`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

