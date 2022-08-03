// #ifndef VUE3
import Vue from 'vue'
import App from './App'

//  导入 store 的实例对象
import store from './store/store.js'

// 导入网络请求的包
import {
	$http
} from '@escook/request-miniprogram'

//挂载$http
uni.$http = $http

//请求的根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

//请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中'
	})

	// 判断请求的是否为有权限的 API 接口
	if (options.url.indexOf('/my/') !== -1) {
		// 为请求头添加身份认证字段
		options.header = {
			// 字段的值可以直接从 vuex 中进行获取
			Authorization: store.state.m_user.token,
		}

	}
}

// 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}

// 封装提示错误弹框方法

uni.$showMsg = function(title = '请求数据失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
