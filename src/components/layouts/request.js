import axios from 'axios'
// 获取天气、时间
// export function ajaxWeatherTime() {
//   return axios.get('http://39.98.198.86:3001/weather').then((res) => {
//     return Promise.resolve(res.data)
//   })
// }


export function ajaxWeatherTime() {
  return axios.get('http://23.99.195.29:3000/weather').then((res) => {
    return Promise.resolve(res.data)
  })
}
