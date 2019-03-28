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
	BASE_API = 'http://alpha-api.szy.com'
	break
case 'rc':
	BASE_API = 'http://rc-api.szy.cn'
	break
default:
	BASE_API = 'http://api.szy.cn'
	break
}
const path = path => BASE_API + path

export {
	path
}
