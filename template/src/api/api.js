import Axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { SYSTEM } from '@/api/modules/userApi'
import router from '@/router/index'
const qs = require('qs')

const Ajax = Axios.create({
	timeout: 6000
})
Ajax.defaults.headers.post['Content-Type'] = 'application/json'
// request拦截器
Ajax.interceptors.request.use(config => {
	// post数据序列化
	// if (config.method === 'post') {
	// 	config.data = qs.stringify(config.data)
	// }
	const userToken = store.state.User.token
	if (userToken) {
		// 让每个请求携带自定义token 请根据实际情况自行修改
		config.headers['Token'] = userToken
		// 商城接口需要增加siteId请求头，老接口增加会报错
		if (!config.url.includes('ucenter-ztjy.szy')) {
			config.headers['Site-Id'] = 10
		}
	}
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})

// respone拦截器
Ajax.interceptors.response.use(
	response => {
		// returncode为非10000时抛错,可结合自己业务进行修改
		const res = response.data
		let returnCode = res.returncode || res.code + ''
		if (returnCode !== '10000') {
			// 4045:Token 过期
			if (returnCode === '4050' || returnCode === '4051') {
				MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
					confirmButtonText: '重新登录',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					store.dispatch('User/logout').then(() => {
						if (process.env.NODE_ENV === 'development') {
							router.push('login')
						} else {
							// 登出跳倒mp登录页面
							window.location.href = SYSTEM.USER.LOGINJUMP
						}
					})
				})
			} else {
				Message({
					message: res.message,
					type: 'error',
					duration: 3 * 1000
				})
			}
			return Promise.reject(new Error('error'))
		} else {
			return response
		}
	},
	error => {
		console.log('err' + error)
		Message({
			message: error.message,
			type: 'error',
			duration: 3 * 1000
		})
		return Promise.reject(error)
	}
)
const API = {
	get (url, params, conf) {
		return new Promise((resolve, reject) => {
			const config = conf || {}
			Ajax.get(url, {
				params,
				...config
			}).then(res => {
				let returnCode = res.data.returncode || res.data.code + ''
				if (returnCode === '10000') {
					resolve(res.data.body)
				} else {
					reject(res.data.message)
				}
			}).catch((err, errType) => {
				reject(err, errType)
			})
		})
	},
	post (url, params, conf) {
		return new Promise((resolve, reject) => {
			Ajax.post(url, params, conf).then(res => {
				let returnCode = res.data.returncode || res.data.code + ''
				if (returnCode === '10000') {
					resolve(res.data.body)
				} else {
					reject(res.data.message)
				}
			}).catch((err, errType) => {
				reject(err, errType)
			})
		})
	}
}

export { API }
