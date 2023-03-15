const { createProxyMiddleware } = require('http-proxy-middleware')    //现在的
// const proxy = require("http-proxy-middleware");        //原来的
 
module.exports = function (app) {
	app.use(
		createProxyMiddleware('/api', {      //这里也要改成createProxyMiddleware
			target: 'http://localhost:5001',
			changeOrigin: true,
			pathRewrite: { '^/api': '' },
		})
	)
	
}