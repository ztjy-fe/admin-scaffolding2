import { API } from '../api'
import { LOGIN_API, UCENTER_API } from '../apiHost'
export const SYSTEM = {
	// 用户相关
	USER: {
		// 登录跳转
		LOGINJUMP: LOGIN_API,
		// 用户权限菜单
		ACCESS_MENU: UCENTER_API + '/menu',
		// 登录
		LOGIN: UCENTER_API + '/login'
	}
}
export default {
	async getAccessMenu (params, callback) {
		return await API.get(SYSTEM.USER.ACCESS_MENU, params, callback)
	},
	async login (params, callback) {
		return await API.post(SYSTEM.USER.LOGIN, params, callback)
	}
}
