const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/res",
    createProxyMiddleware({
      target: "http://127.0.0.1:7001/res",
      changeOrigin: true,
    })
  );
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://127.0.0.1:7001/api",
      changeOrigin: true,
    })
  );
  app.use(
    "/static",
    createProxyMiddleware({
      target: "http://127.0.0.1:7001/static",
      changeOrigin: true,
    })
  );
};
