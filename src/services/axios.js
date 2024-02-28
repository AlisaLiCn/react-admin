import axios from 'axios'
// import { merge } from 'lodash'

function toLogin() {
  setTimeout(() => {
    const url = window.location.origin + '/login'
    window.location.href = url
  }, 200)
}

// 创建实例
const instance = axios.create({
  // timeout: 60000,
})

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    let token = ''
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const status = error?.response?.status
    if (status) {
      switch (status) {
        case 401:
          toLogin()
          break
        default:
          return Promise.reject(error)
      }
    } else {
      return Promise.reject(error)
    }
  },
)

export default instance
