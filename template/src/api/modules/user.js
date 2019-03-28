import { API } from '../api'
import { path } from '../apiHost'
// 接口地址
export const USER_API_URL = {
	LOGIN: path('/api/login/v1.0')
}
// api请求方法定义
export default {
	async login (params, conf) {
		return await API.post(USER_API_URL.LOGIN, params, conf)
	}
}
