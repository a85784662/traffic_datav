import request from '@/utils/request'

// 企业概况
export function ajaxTransCorpSummary() {
  return request({
    url: '/yzjtj/transcorpsummary/transCorpSummary/one',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}

// 企业概况
export function ajaxServCorpEvnt() {
  return request({
    url: '/yzjtj/servcorpevnt/servCorpEvnt/all',
    method: 'get'
  }).then(res => {
    if (res.code == 200) {
      return res.result
    } else {
      return Promise.reject(res.message)
    }
  })
}
