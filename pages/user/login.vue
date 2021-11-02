<template>
	<view class="login" :style="{ height: height + 'px' }">
		<view class="logo"><u-avatar :src="logoImage" size="160"></u-avatar></view>
		<u-form :model="form" ref="uForm" class="panel">
			<u-form-item label="手机" prop="phone"><u-input v-model="form.phone" :border="true" border-color="#404D5E" /></u-form-item>
			<u-form-item label="密码" prop="pass"><u-input v-model="form.pass" :border="true" type="password" border-color="#404D5E" /></u-form-item>
		</u-form>
		<button class="btn" @tap="submit" type="success">提交</button>
		<view class="register" @click="jump('/pages/user/register')">注册账号</view>
	</view>
</template>

<script>
export default {
	name: 'login',
	components: {},
	data() {
		return {
			logoImage: '@/static/logo.png',
			phoneData: '', //用户/电话
			passData: '', //密码
			form: {
				phone: '',
				pass: ''
			},
			height: uni.getSystemInfoSync().screenHeight
		};
	},
	methods: {
		// 路由跳转
		jump(path, parmas) {
			// console.log("要传递：", parmas)
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		async submit() {
			// console.log('ready:', this.form.phone, this.form.pass);
			//登录
			var that = this;
			if (this.form.phone.length == '') {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '用户名不能为空'
				});
				return;
			}
			if (this.form.pass == '') {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '用户名不能为空'
				});
				return;
			}

			await this.$request({
				url: 'users/login',
				method: 'post',
				data: {
					phone: this.form.phone,
					password: this.form.pass
				},
				success: function(res) {
					// if (res.data != false) {
					console.log("res:", res)
					//存储用户登录信息
					uni.setStorageSync('user_id', res.data.user_id);
					// uni.setStorageSync('token', res.data.token)
					uni.setStorage({
						key: 'token',
						data: res.data.token,
						success: function() {
							uni.getStorage({
								key: 'token',
							});
						}
					});
					// 登录成功跳转到首页
					uni.switchTab({
						url: '/pages/index/index'
					});
					// that.jump('/pages/index/index')
				},
				fail: error => {
					console.log('error:', error);
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: 'error'
					});
				}
			});
		},
		clear() {
			uni.setStorageSync('user_id', '');
			// uni.setStorageSync('token', res.data.token)
			uni.setStorage({
				key: 'token',
				data: ''
			});
			// this.clearCache();
		},
		// clearCache() {
		// 	let that = this;
		// 	//判断设备类型
		// 	let os = plus.os.name;
		// 	if (os == 'Android') {
		// 		////获取当前Activity  
		// 		let main = plus.android.runtimeMainActivity();
		// 		//获取应用缓存目录
		// 		let sdRoot = main.getCacheDir();
		// 		// 遍历sd卡根目录下的所有文件和文件夹
		// 		let files = plus.android.invoke(sdRoot, 'listFiles');
		// 		let len = files.length;
		// 		for (let i = 0; i < len; i++) {
		// 			let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径
		// 			//检查本地文件
		// 			plus.io.resolveLocalFileSystemURL(
		// 				filePath,
		// 				function(entry) {
		// 					if (entry.isDirectory) {
		// 						entry.removeRecursively(
		// 							function(entry) {
		// 								//递归删除其下的所有文件及子目录
		// 								that.formatSize(); // 重新计算缓存
		// 							},
		// 							function(e) {
		// 								console.log(e.message);
		// 							}
		// 						);
		// 					} else {
		// 						entry.remove();
		// 					}
		// 				},
		// 				function(e) {
		// 					console.log('文件路径读取失败');
		// 				}
		// 			);
		// 		}
		// 	} else {
		// 		// ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错
		// 		plus.cache.clear(function() {
		// 			uni.showToast({
		// 				title: '缓存清理完成',
		// 				duration: 2000
		// 			});
		// 			that.formatSize();
		// 		});
		// 	}
		// }
	},
	mounted() {
		this.clear();
	}
};
</script>

<style lang="less" scoped>
.login {
	background-image: url(../../static/background.png);
	/* color: #FFFFFF !important; */
}

.logo {
	width: 100%;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.panel {
	width: 80%;
	margin: 0 auto;
}

.u-input {
	background-color: #404d5e;
	color: #ffffff !important;
}

.uni-input-wrapper {
	color: #ffffff !important;
}

.btn {
	margin-top: 50px;
	width: 50% !important;
	background-color: #5f728b;
	color: #ffffff;
}
.register {
	width: 100%;
	text-align: center;
	margin-top: 30px;
}
</style>
