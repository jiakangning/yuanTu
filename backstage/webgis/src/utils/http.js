import axios from 'axios'

const serivce = axios.create({
  baseURL: '',
  timeout: 5000
})
serivce.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 回复拦截，主要针对部分回掉数据状态码进行处理
serivce.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default serivce
