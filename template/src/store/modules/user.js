import { UserApi } from '@/api/index'
import Common from '@/utils/common'
import { USER_TOKEN, USER_NAME, SITE_MAP, SITE_ID } from '@/maps/constants'

// view
import { danamicRoutes } from '@/router/danamic'
import { rootComponent } from '@/router/constant'

const _import = require('@/router/import_' + process.env.NODE_ENV)
// 获取二级域名
const thisDomain = Common.getDomain()
console.log('thisDomain', thisDomain)
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRoutes
 * @param res
 */
function filterAsyncRoutes (asyncRoutes, res) {
	let routes = []
	try {
		res.menu.forEach(item => {
			let obj = {}
			obj.icon = item.icon
			obj.alwaysShow = true
			obj.component = rootComponent
			obj.meta = {
				title: item.name
			}
			let pathArr = []
			// 菜单
			if (item.isDir === '0') {
				pathArr = item.flag.split('/')
				obj.path = '/' + pathArr[1]
				obj.alwaysShow = false
				obj.children = [{
					path: pathArr[2],
					name: pathArr[1] + pathArr[2],
					component: _import(item.flag.substr(1)),
					meta: {
						title: item.name,
						auth: res.permissions[item.groupId]
					}
				}]
			} else {
				// 目录
				pathArr = item.subMenu[0].flag.split('/')
				obj.path = '/' + pathArr[1]
				obj.redirect = 'noredirect'
				obj.children = []
				obj.name = pathArr[1]
				// 菜单中显示的路由
				item.subMenu.forEach(value => {
					try {
						let flag = value.flag
						let arr = flag.split('/')
						obj.children.push({
							path: flag.substr(flag.indexOf(arr[2])),
							name: arr[1] + arr[2],
							component: _import(flag.substr(1)),
							meta: {
								title: value.name,
								auth: res.permissions[value.groupId]
							}
						})
					} catch (error) {
						return false
					}
				})
			}
			// 菜单中不显示的路由
			asyncRoutes.forEach(subItem => {
				let path = subItem.path
				let arr = path.split('/')
				if (arr[1] === pathArr[1]) {
					subItem.hidden = true
					subItem.path = path.substr(path.indexOf(arr[2]))
					obj.children.push(subItem)
				}
			})
			routes.push(obj)
		})
		return routes
	} catch (error) {
		return false
	}
}

const User = {
	namespaced: true,

	state: {
		token: Common.getCookie(USER_TOKEN),
		username: Common.getCookie(USER_NAME),
		siteId: Common.getCookie(SITE_ID),
		accessedRoutes: []
	},

	getters: {
		getUserToken (state) {
			return state.token
		},
		getUserName (state) {
			return state.username
		},
		getAccessedRoutes (state) {
			return state.accessedRoutes
		}
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_USER_NAME: (state, username) => {
			state.username = username
		},
		SET_ROUTES: (state, routes) => {
			state.accessedRoutes = routes
		}
	},

	actions: {
		// 获取用户可访问路由权限
		getAccessMenu ({ commit, state }) {
			return new Promise((resolve, reject) => {
				const currentHost = window.location.host
				let prefix = 'pro'
				if (currentHost.indexOf('-') > -1) {
					prefix = currentHost.split('-')[0]
				}
				UserApi.getAccessMenu({
					site_id: SITE_MAP[prefix]
				}).then(response => {
					console.log(response)
					let routes = filterAsyncRoutes(danamicRoutes, response)
					commit('SET_ROUTES', routes)
					resolve()
				}).catch((error) => {
					reject(error)
				})
			})
		},

		// 登出
		logout ({ commit, state }) {
			return new Promise((resolve, reject) => {
				console.log('logout')
				commit('SET_TOKEN', '')
				commit('SET_USER_NAME', '')
				Common.removeCookie(USER_TOKEN, { domain: thisDomain, expires: 10 })
				Common.removeCookie(USER_NAME, { domain: thisDomain, expires: 10 })
				resolve()
			})
		}
	}
}

export default User
