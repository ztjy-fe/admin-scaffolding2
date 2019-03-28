import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
const getters = {}
const mutations = {}
const actions = {}
Vue.use(Vuex)
export default new Vuex.Store({
	state: {},
	getters,
	mutations,
	actions,
	modules: {
		User
	}
})
