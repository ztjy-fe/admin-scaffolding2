import { API } from '../api'
import { BASE_ROOT_API } from '../apiHost'

export const BASEROOT = {
	// 用户相关
	CITY: BASE_ROOT_API + '/cityCode/getAllCity'
}

export default {
    async getCityList (params, callback) {
		return await API.post(BASEROOT.CITY, params, callback)
    }
}
