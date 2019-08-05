import router from '@/router/index'
import store from '@/store/index'
// Progress 进度条
import NProgress from 'nprogress'
// Progress 进度条样式
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import Common from '@/utils/common'
import { USER_TOKEN } from '@/maps/constants'
import { SYSTEM } from '@/api/modules/userApi'
router.beforeEach((to, from, next) => {
	NProgress.start()
	// 已登录
	if (Common.getCookie(USER_TOKEN)) {
		// 是否已经获取过动态路由表
		let accessedRoutes = store.state.User.accessedRoutes
		if (accessedRoutes.length === 0) {
			store.dispatch('User/getAccessMenu').then(res => {
				next()
				accessedRoutes = store.state.User.accessedRoutes
				router.options.routes = [...accessedRoutes, ...router.options.routes]
				router.addRoutes(accessedRoutes)
			}).catch((error) => {
				if (process.env.NODE_ENV === 'development') {
					//
				} else {
					setTimeout(() => {
						// 无权限跳回cms用户权限列表
						window.location.href = SYSTEM.USER.LOGINJUMP + '/sites'
					}, 1000)
				}
				Message.error(error)
			})
		} else {
			next()
		}
	} else {
		if (process.env.NODE_ENV === 'development') {
			console.log(to.path)
			if (to.path !== '/login') {
				console.log('未登录')
				router.push('login')
			} else {
				next()
			}
			NProgress.done()
		} else {
			// 跳到mp的登录页
			window.location.href = SYSTEM.USER.LOGINJUMP
		}
	}
})

router.afterEach(() => {
	// 结束Progress
	NProgress.done()
})
