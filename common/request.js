// // 全局请求路径，也就是后端的请求基准路径
// const BASE_URL = 'http://10.10.58.55:8000/'
// // 同时发送异步代码的次数，防止一次点击中有多次请求，用于处理
// let ajaxTimes=0;
// // 封装请求方法，并向外暴露该方法
// export const myHttp = (options)=>{
// 	// 解构请求头参数
// 	let header = {...options.header};
// 	// 当前请求不是登录时请求，在header中加上后端返回的token
// 	if(options.url != 'login'){
// 	    header["client-identity"] = uni.getStorageSync('session_id');
// 	}
// 	ajaxTimes++;
// 	// 显示加载中 效果
// 	uni.showLoading({
// 		title: "加载中",
// 	    mask: true,
// 	});
// 	return new Promise((resolve,reject)=>{
// 		uni.request({
// 			url:BASE_URL+options.url,
// 			method: options.method || 'POST',
// 			data: options.data || {},
// 			header,
// 			success: (res)=>{
// 				resolve(res)
// 			},
// 			fail: (err)=>{
// 				reject(err)
// 			},
// 			// 完成之后关闭加载效果
// 			complete:()=>{
// 				ajaxTimes--;
// 				if(ajaxTimes===0){
// 			        //  关闭正在等待的图标
// 			        uni.hideLoading();
// 			    }
// 			}
// 		})
// 	})
// }


import baseurl from './config.js'
// 公共的请求
const request = function(options) {
	options.url = baseurl + options.url;
	try {
		//从本地缓存中同步获取指定 key 对应的内容
		const token = uni.getStorageSync('token');
		const username = uni.getStorageSync('username');

		if (token) {
			options.header = {
				'Authorization': 'Bearer ' + token
			};
		}
	} catch (err) {
		console.log(err)
	}
	return uni.request(options);
}
export default request;

//上传类
export const myUploadFile = (options) => {
	// options.url = baseurl + options.url;
    // let headerlist = options.header;
	try {
		const token = uni.getStorageSync('token');
		const username = uni.getStorageSync('username');
	
		if (token) {
			options.header = {
				'Authorization': 'Bearer ' + token
			};
		}
		
	} catch (err) {
		console.log(err)
	}
	return new Promise((resolve, reject) => {
	 uni.uploadFile({
			url: baseurl + options.url,
			files: options.files,
			filePath: options.filePath,
			filenamename: options.name,
			formData: options.formData,
			// header: headerlist || {},
			success: (res) => {
				console.log(res)
				if (res.statusCode == 200) {
					var data = JSON.parse(res.data)
					resolve(data)
				} else {
					resolve(res)
				}
			},
			fail: (err) => {
				console.log(err)
				uni.showToast({
					title: '获取失败',
					icon: "none"
				})
				reject(err)
			}
		})
	})
}

