<template>
	<view class="register" :style="{ height: height + 'px' }">
		<u-gap height="80" bg-color="#ffffff"></u-gap>
		<u-form ref="uForm" label-position="left">
			<!-- <u-form-item label="头像" class="avatar"><u-avatar :src="user.avatar_url" size="large" @click="change"></u-avatar></u-form-item> -->
			<u-form-item label="姓名"><u-field v-model="user.name" class="input-b" /></u-form-item>
			<u-form-item label="班级"><u-field v-model="user.class" class="input-b" /></u-form-item>
			<u-form-item label="手机"><u-field v-model="user.phone" class="input-b"  /></u-form-item>
			<u-form-item label="学号"><u-field v-model="user.stu_number" class="input-b" /></u-form-item>
			<u-form-item label="邮箱"><u-field v-model="user.email" class="input-b"  /></u-form-item>
			<u-form-item label="微信"><u-field v-model="user.wechat" class="input-b" /></u-form-item>
			<u-form-item label="QQ"><u-field v-model="user.qq" class="input-b" /></u-form-item>
			<u-form-item label="密码"><u-field v-model="user.password" class="input-b"/></u-form-item>
			<u-form-item label="个人简介"><u-field v-model="user.intro" class="input-text" type="textarea"/></u-form-item>
		</u-form>
		<u-gap height="80" bg-color="#FFFFFF"></u-gap>
		<button class="sub" @click="submitForm">注册</button>
	</view>
</template>

<script>
export default {
	name: 'register',
	data() {
		return {
			user: {},
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
		change() {
			// this.$refs.uUpload.upload();
			var that = this;
			uni.chooseImage({
				//选择图片
				count: 1,
				sizeType: ['compressed'],
				success(res) {
					var imgsFile = res.tempFilePaths[0]; //获取图片的临时资源
					that.user.avatar_url = imgsFile;
				}
			});
		},
		async submitForm() {
			let obj = this.user;
			let result = 0;
			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (obj[key] === null || obj[key] === '') {
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '所有项不能为空'
						});
					} else {
						result++;
					}
				}
			}
			console.log(result);

			if (result == 9) {
				await this.$request({
					url: 'users',
					method: 'post',
					data: {
						name: this.user.name,
						myclass: this.user.class,
						phone: this.user.phone,
						stu_number: this.user.stu_number,
						email: this.user.email,
						wechat: this.user.wechat,
						qq: this.user.qq,
						intro: this.user.intro,
						password: this.user.password
					},
					success: res => {
						let user_id = res.data;
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: user_id
						});
						setTimeout(() => {
							this.jump('/pages/user/login');
						}, 2000);
					},
					fail: error => {
						console.log(error);
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '404 error'
						});
					}
				});
			} else {
				uni.showToast({
					icon: 'none',
					position: 'center',
					title: '所有项不能为空'
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.register {
	width: 90%;
	margin: 0 auto;
	overflow: hidden;
	overflow-y: scroll;
	overflow-x: hidden;

	// background-image: url(../../static/background.png);
}

.input-text {
	width: 100%;
}

.u-avatar {
	margin: 0 auto;
}
.u-border-bottom:after {
	border: none;
}
.u-form-item {
	background-color: #ffffff;
}
.sub {
	margin-top: 50px;
	width: 90%;
	background-color: #5f728b;
	color: #ffffff;
}
</style>
