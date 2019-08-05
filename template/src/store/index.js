
import Vue from 'vue'
import Vuex from 'vuex'
import SideBar from './modules/sidebar'
import User from './modules/user'

Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		User,
		SideBar
	}
})
