import axios from 'axios'
import { Message } from "element-ui"

const responseSuccess = res => {
  const { success, result } = res.data
  if (success) {
    return result
  } else {
    Message.error(result)
    return Promise.reject(result)
  }
}

const responseError = error => {
  Message.error(error.message || '服务器错误！！')
  return Promise.reject(error)
}

axios.defaults.baseURL = '/api'

axios.interceptors.response.use(responseSuccess, responseError)

export default axios