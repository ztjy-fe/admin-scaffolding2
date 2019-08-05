const _import = require('./import_' + process.env.NODE_ENV)
export const rootComponent = _import('layout/Layout')
export default [
	{
		path: '/',
		redirect: '/dashboard/index',
		component: rootComponent,
		name: 'Dashboard',
		hidden: true,
		children: [
			{
				path: '/dashboard/index',
				name: 'Dashboard',
				component: _import('dashboard/Index'),
				meta: { title: '首页' }
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: _import('login/Login'),
		hidden: true,
		meta: { title: '登录' }
	}
]
