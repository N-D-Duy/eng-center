const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.duynguyendev.xyz', // Địa chỉ máy chủ API
      changeOrigin: true,
    })
  );
};
