import { formatFixedDate, getCookie, setCookie, removeCookie } from 'szyutils'
export default {
	getCookie (name) {
		return getCookie(name)
	},

	setCookie (name, value, params) {
		return setCookie(name, value, params)
	},

	removeCookie (name, params) {
		return removeCookie(name, params)
	},
	// 时间格式化函数
	formatFixedDate (date, format) {
		return formatFixedDate(date, format)
	},
	getDomain () {
		return document.domain.split('.').splice(-2).join('.')
	},
	/**
	 * 上传（仅为上传功能，不提供界面）
	 * @param {*} action 上传接口URL
	 * @param {*} maxSize 文件最大体积（M）
	 * @param {*} fileFilter 文件类型过滤，可上传文件类型用英文逗号隔开
	 * @param {*} onStart 上传开始回调（参1：用户选择的文件）
	 * @param {*} onProgress 上传进度回调（参1：进度数据：进度百分比等）
	 * @param {*} onError 上传失败回调
	 * @param {*} onComplete 上传完成回调
	 */
	upload ({ action, maxSize, fileFilter, onStart, onProgress, onError, onComplete }) {
		let input = document.createElement('input')
		input.type = 'file'
		input.click()
		input.onchange = () => {
			let file = input.files[0]
			let tmparr = file.name.split('.')
			let fileType = tmparr[tmparr.length - 1].toLowerCase()
			fileFilter = fileFilter || ''
			fileFilter = fileFilter.split(',')
			let valiedFilter = fileFilter.length === 0 || fileFilter.indexOf(fileType) !== -1
			if (valiedFilter) {
				let sizeM = file.size / 1024 / 1024
				maxSize = maxSize || 5
				if (sizeM <= maxSize) {
					var fd = new FormData()
					fd.append('file', file)
					fd.append('file_tag', 'ad')
					var xhr = new XMLHttpRequest()
					action = action || 'http://localhost:8080/upload'
					xhr.open('POST', action)
					xhr.upload.onloadstart = event => {
						if (onStart) {
							onStart(file)
						}
					}
					xhr.upload.onprogress = event => {
						if (onProgress) {
							onProgress(event)
						}
					}
					xhr.upload.onerror = event => {
						if (onError) {
							onError('网络错误')
						}
					}
					xhr.onreadystatechange = () => {
						if (xhr.readyState === 4) {
							if (xhr.status === 200) {
								let uploadData = JSON.parse(xhr.responseText)
								if (onComplete) {
									onComplete(uploadData)
								}
							}
						}
					}
					xhr.send(fd)
				} else {
					if (onError) {
						onError('文件大小超出限制')
					}
				}
			} else {
				if (onError) {
					onError('文件类型不符合要求')
				}
			}
		}
	},
	getProxyParams (params, method = 'GET') {
		let transparent = {
			method: method
		}
		Object.assign(transparent, params)
		return {
			transparent,
			preposition: '',
			postposition: ''
		}
	}
}
