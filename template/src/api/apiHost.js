const currentHost = window.location.host
let prefix = process.env.NODE_ENV === 'production' ? '' : 'alpha'
let BASE_API = ''
if (currentHost.indexOf('-') > -1) {
	prefix = currentHost.split('-')[0]
}
switch (prefix) {
case 'dev':
	BASE_API = 'http://dev-api.szy.net'
	break
case 'alpha':
	BASE_API = 'https://alpha-api.szy.cn'
	break
case 'rc':
	BASE_API = 'https://rc-api.szy.cn'
	break
default:
	BASE_API = 'https://api.szy.cn'
	break
}
const path = path => BASE_API + path

export {
	path
}
