<template>
	<view class="info">
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar left-icon="back" title="个人信息" backgroundColor="#2d3036" color="#d8d8d8" @clickLeft="back" rightIcon="compose"
		 @clickRight="jump('/pages/user/update')"></uniNavBar>
		<view class="box" :style="{ height: height +'px' }">
			<u-cell-item title="头像" :arrow="false">
				<u-avatar :src="user.avatar_url" size="large" slot="right-icon"></u-avatar>
			</u-cell-item>
			<u-cell-item title="姓名" :value="user.name" :arrow="false"></u-cell-item>
			<u-cell-item title="班级" :value="user.class" :arrow="false"></u-cell-item>
			<u-cell-item title="手机" :value="user.phone" :arrow="false"></u-cell-item>
			<u-cell-item title="学号" :value="user.stu_number" :arrow="false"></u-cell-item>
			<u-cell-item title="邮箱" :value="user.email" :arrow="false"></u-cell-item>
			<u-cell-item title="微信" :value="user.wechat" :arrow="false"></u-cell-item>
			<u-cell-item title="QQ" :value="user.qq" :arrow="false"></u-cell-item>
		</view>
		<footerTab></footerTab>
	</view>
</template>

<script>
	import footerTab from '@/components/common/footerTab.vue';
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	export default {
		name: 'info',
		components: {
			uniNavBar,
			footerTab,
		},
		data() {
			return {
				user: {},
				height: uni.getSystemInfoSync().screenHeight - 124.8,
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
			async getInfo() {
				// let user_id = uni.getStorageSync('user_id');
				await this.$request({
					url: "users/info",
					method: 'get',
					success: (res) => {
						this.user = res.data[0] || [];
						console.log(this.user)
					},
					fail: (error) => {
						console.log(error);
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '404 error'
						});
					},
				})
			},
		},
		onShow() {
			this.user = {};
			this.getInfo();
		}
	};
</script>

<style lang='less' scoped>
	.box {
		width: 95%;
		margin: 0 auto;
	}
</style>
