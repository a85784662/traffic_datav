import request from '@/utils/request'

// 分页获取长途班线线路
export function ajaxBusLineList() {
  return request({
    url: `/yzjtj/longdistancebusline/longDistanceBusLine/list`,
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

