import Vue from 'vue'
import Router from 'vue-router'
import Constant from './constant'

Vue.use(Router)
const routes = [...Constant]

export default new Router({
	mode: 'history',
	routes: [
		...routes
	]
})
