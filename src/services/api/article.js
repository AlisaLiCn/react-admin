import http from '../axios'

export const getArtilceList = async (params) => {
  const res = await http.request({
    url: '/v4/articles/',
    method: 'GET',
    params,
  })
  return res
}
