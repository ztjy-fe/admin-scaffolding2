import Mock from 'mockjs'
import { TAOBAO } from '@/api/modules/taobaoApi'

export default {
	listMock () {
		Mock.mock(TAOBAO.LIST, {
			code: 10000,
			messase: 'ok',
			body: {}
		})
	}
}
