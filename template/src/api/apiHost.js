const currentHost = window.location.host
let prefix = process.env.NODE_ENV === 'production' ? '' : 'alpha'
let BASE_API = ''
let LOGIN_API = ''
let UCENTER_API = ''
let IMGUPLOAD = ''
let BASE_ROOT_API = ''

if (currentHost.indexOf('-') > -1) {
	prefix = currentHost.split('-')[0]
}
switch (prefix) {
case 'dev':
	BASE_API = 'http://dev-api-mp.szy.net/proxy/mallAdmin'
	LOGIN_API = 'http://dev-mp.szy.net'
	UCENTER_API = 'http://dev-api-ucenter-ztjy.szy.net'
	IMGUPLOAD = 'http://dev-admin-ztjy.szy.net/Upload/imgFile'
	BASE_ROOT_API = 'http://dev-api-mp.szy.net'
	break
case 'alpha':
	BASE_API = 'http://alpha-api-mp.szy.com/proxy/mallAdmin'
	LOGIN_API = 'http://alpha-mp.szy.com'
	UCENTER_API = 'http://alpha-api-ucenter-ztjy.szy.com'
	IMGUPLOAD = 'http://alpha-admin-ztjy.szy.com/Upload/imgFile'
	BASE_ROOT_API = 'http://alpha-api-mp.szy.com'
	break
case 'rc':
	BASE_API = 'http://rc-api-mp.szy.cn/proxy/mallAdmin'
	LOGIN_API = 'http://rc-mp.szy.cn'
	UCENTER_API = 'http://rc-api-ucenter-ztjy.szy.cn'
	IMGUPLOAD = 'http://rc-admin-ztjy.szy.cn/Upload/imgFile'
	BASE_ROOT_API = 'http://rc-api-mp.szy.cn'
	break
default:
	BASE_API = 'http://api-mp.szy.cn/proxy/mallAdmin'
	LOGIN_API = 'http://mp.szy.cn'
	UCENTER_API = 'http://api-ucenter-ztjy.szy.cn'
	IMGUPLOAD = 'http://admin-ztjy.szy.cn/Upload/imgFile'
	BASE_ROOT_API = 'http://api-mp.szy.cn'
	break
}
const path = path => BASE_API + path
export {
	path,
	LOGIN_API,
	UCENTER_API,
	IMGUPLOAD,
	BASE_ROOT_API
}
