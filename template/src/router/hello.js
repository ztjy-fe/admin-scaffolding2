const _import = require('./import_' + process.env.NODE_ENV)
const Hello = _import('Index')

export default [
	{
		path: '/',
		component: Hello
	}
]
