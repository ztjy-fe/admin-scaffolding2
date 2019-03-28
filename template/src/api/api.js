import Axios from 'axios'
const Ajax = Axios.create({
	timeout: 6000,
	headers: {
		'Content-Type': 'application/json'
	}
})
const API = {
	get (url, params, conf) {
		return new Promise((resolve, reject) => {
			const config = conf || {}
			Ajax.get(url, {
				params,
				...config
			}).then(res => {
				if (res.data.code === 10000) {
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
				if (res.data.code === 10000) {
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
