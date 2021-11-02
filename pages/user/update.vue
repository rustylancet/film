<template>
	<view class="update">
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar left-icon="back" title="个人信息" backgroundColor="#2d3036" color="#d8d8d8" @clickLeft="back"></uniNavBar>
		<view class="box" :style="{ height: height + 'px' }">
			<u-form ref="uForm" label-position="left">
				<u-form-item label="头像" class="avatar"><u-avatar :src="user.avatar_url" size="large" @click="change"></u-avatar></u-form-item>
				<u-form-item label="姓名"><u-field v-model="user.name" class="input-b" :required="true" /></u-form-item>
				<u-form-item label="班级"><u-field v-model="user.class" class="input-b" :required="true" /></u-form-item>
				<u-form-item label="手机"><u-field v-model="user.phone" class="input-b" :required="true" /></u-form-item>
				<u-form-item label="学号"><u-field v-model="user.stu_number" class="input-b" :required="true" /></u-form-item>
				<u-form-item label="邮箱"><u-field v-model="user.email" class="input-b" :required="true" /></u-form-item>
				<u-form-item label="微信"><u-field v-model="user.wechat" class="input-b" :required="true" /></u-form-item>
				<u-form-item label="QQ"><u-field v-model="user.qq" class="input-b" :required="true" /></u-form-item>
				<u-form-item label="个人简介"><u-field v-model="user.intro" class="input-text" type="textarea" :required="true" /></u-form-item>
			</u-form>
			<u-gap height="80" bg-color="#FFFFFF"></u-gap>
			<u-button class="sub" @click="submitForm" shape="circle" type="success">提交</u-button>
			<u-gap height="80" bg-color="#FFFFFF"></u-gap>
		</view>
		<footerTab></footerTab>
	</view>
</template>

<script>
import footerTab from '@/components/common/footerTab.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';

export default {
	components: {
		uniNavBar,
		footerTab
	},
	data() {
		return {
			user: {},
			height: uni.getSystemInfoSync().screenHeight - 131
			// avatar_url: "",user.avatar_url
		};
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		// 路由跳转
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		change() {
			// this.$refs.uUpload.upload();
			var that = this;
			//获取到一个本地资源的临时文件路径后
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
		async getInfo() {
			await this.$request({
				url: 'users/info',
				method: 'get',
				success: res => {
					this.user = res.data[0] || [];
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
			if (result == 10) {
				console.log('change avatar');
				uni.uploadFile({
					//上传代码
					url: 'http://47.96.228.152:8000/upload/avatar/' + this.user.user_id, //本地node.js服务器地址
					method: 'post',
					filePath: this.user.avatar_url,
					name: 'avatar', //这个东西有点类似与 form表单中的  name值 在后面也需要这个
					success: function(res) {
						console.log(res);
						console.log('123');
					}
				});
				await this.$request({
					url: 'users/update',
					method: 'post',
					data: {
						name: this.user.name,
						myclass: this.user.class,
						phone: this.user.phone,
						stu_number: this.user.stu_number,
						email: this.user.email,
						wechat: this.user.wechat,
						qq: this.user.qq,
						intro: this.user.intro
					},
					success: res => {
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '修改成功，即将跳转'
						});
						setTimeout(() => {
							this.jump('/pages/user/info');
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
			}
		}
	},
	mounted() {
		this.getInfo();
	}
};
</script>

<style lang="less" scoped>
.box {
	width: 95%;
	margin: 0 auto;
	overflow: hidden;
	overflow-y: scroll;
	overflow-x: hidden;
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
</style>
