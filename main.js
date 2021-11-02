import Vue from 'vue'
import uView from "uview-ui";
import App from './App'
//引入vuex
import store from './store'

import {router,RouterMount} from './router.js' 
// import { myHttp } from './common/request.js'
import request from '@/common/request.js'      
//引进requst方法
import  myUploadFile from '@/common/request.js'     		
import zhouWeiNavBar from "@/components/zhouWei-navBar";

Vue.use(router)

Vue.use(uView);
Vue.component("nav-bar", zhouWeiNavBar);
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false
// Vue.prototype.$myHttp = myHttp
Vue.prototype.$request = request
Vue.prototype.$myUploadFile = myUploadFile //上传
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

// RouterMount(app, '#app')

app.$mount(); //为了兼容小程序及app端必须这样写才有效果
