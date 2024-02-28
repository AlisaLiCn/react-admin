import http from '../axios'

export const getLoginCode = async (params) => {
  return http
    .request({
      url: '',
      method: 'POST',
      params: params,
    })
    .then((res) => res)
}

export const login = async (params) => {
  return http
    .request({
      url: '',
      method: 'POST',
      data: params,
    })
    .then((res) => res)
}
