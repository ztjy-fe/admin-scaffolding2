import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element
import ElementUI from 'element-ui'
import './assets/scss/index.scss'
// 路由鉴权
import '@/utils/permission'
// 自定义指令
import '@/directives/preview'

Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')
