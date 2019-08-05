import Vue from 'vue'
import Common from '@/utils/common'

Vue.directive('preview', {
	bind (el, binding, vnode) {
		let img
		el.addEventListener('mouseover', (event) => {
			let offset = Common.getBodyOffset(el)
			img = document.createElement('img')
			img.src = el.src
			img.style.position = 'fixed'
			img.style.width = '800px'
			img.style.top = (offset.top + el.parentNode.clientHeight) + 'px'
			img.style.left = offset.left + 'px'
			img.style.pointerEvents = 'none'
			img.style.boxShadow = '0 1px 20px rgba(0,0,0,.2)'
			img.style.zIndex = 10000
			document.body.appendChild(img)
		})
		el.addEventListener('mouseout', (event) => {
			if (img) {
				document.body.removeChild(img)
				img = null
			}
		})
	}
})
