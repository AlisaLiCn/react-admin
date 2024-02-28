// eslint-disable-next-line
const { createProxyMiddleware } = require('http-proxy-middleware')

// eslint-disable-next-line
module.exports = function (app) {
  app.use(
    '/v4',
    createProxyMiddleware({
      target: 'https://api.spaceflightnewsapi.net',
      // pathRewrite: {
      //   '^/api': '',
      // },
      changeOrigin: true,
    }),
  )
}
