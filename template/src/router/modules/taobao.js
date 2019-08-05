
const _import = require('../import_' + process.env.NODE_ENV)
export default [
	{
		path: '/taobao/static-route/list',
		component: _import('taobao/static-route/List'),
		meta: {
			title: '模板列表'
		}
	}
]
