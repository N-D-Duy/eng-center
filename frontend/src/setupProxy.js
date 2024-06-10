const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://165.232.161.56:8000', // Địa chỉ máy chủ API
      changeOrigin: true,
    })
  );
};
