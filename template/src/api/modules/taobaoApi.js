import { API } from '../api'
import { path } from '../apiHost'
export const TAOBAO = {
	LIST: path('/tbmall/thematic/list/v1.0')
}
export default {
	// 获取列表
	async getList (params, conf) {
		return await API.post(TAOBAO.LIST, params, conf)
	}
}
