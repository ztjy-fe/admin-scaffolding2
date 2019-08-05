// webpack配置
module.exports = {
	publicPath: '/',
	assetsDir: 'static', // 打包后静态资源路径
	productionSourceMap: false,
	devServer: {
		host: '0.0.0.0', // 服务启动时的主机名
		port: 8586, // 端口号
		// proxy: { // 代理设置
		// 	'/api': {
		// 		target: '<url>',
		// 		ws: true,
		// 		changeOrigin: true
		// 	}
		// },
		open: true // 自动打开浏览器
	}
}
