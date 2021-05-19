import axios from 'axios'
// create an axios instance
const service = axios.create({
  // baseURL: config.apiPrefix,

  timeout: 50000,
  headers: {
    post: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    get: {
      'X-Access-Token': '6vFhopNUW1yNNM1hnLzBH3fyY9ksO4KTZx8gGDU0E0ZpTqTZSZzRrcZe8k0dR8mf'
    }
  },

  transformRequest: [function (data) {
    data = JSON.stringify(data)
    return data
  }],

  transformResponse: [function (data) {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }]
})


service.interceptors.response.use(
  response => {
    const res = response.data;
    if (response.status === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service