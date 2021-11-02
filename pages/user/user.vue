<template>
	<view class="user">
		<!-- <u-gap height="80" bg-color="#2d3036"></u-gap> -->
		<view class="person-box">
			<view class="person">
				<u-avatar :src="user.avatar_url" size="80px"></u-avatar>
				<view class="name">{{ user.name }}</view>
				<view class="myclass">{{ user.class }}</view>
			</view>
		</view>
		<u-grid :col="4" :border="false">
			<u-grid-item @click="jump('/pages/user/myOrder', { user_id: user.user_id })">
				<u-icon name="order" color="#354463" :size="52"></u-icon>
				<view class="grid-text">剧组</view>
			</u-grid-item>
			<u-grid-item @click="jump('/pages/user/myAppointment', { user_id: user.user_id })">
				<u-icon name="clock" color="#354463" :size="52"></u-icon>
				<view class="grid-text">预约</view>
			</u-grid-item>
			<u-grid-item @click="show = true">
				<u-icon name="list-dot" color="#354463" :size="52"></u-icon>
				<view class="grid-text">作品</view>
			</u-grid-item>
			<u-grid-item @click="jump('/pages/user/myCollection', { user_id: user.user_id })">
				<u-icon name="star" color="#354463" :size="52"></u-icon>
				<view class="grid-text">收藏</view>
			</u-grid-item>
		</u-grid>
		<u-gap height="10" bg-color="#ebebeb"></u-gap>
		<view class="funcBox" :style="{ height: height + 'px' }">
			<!-- <view class="func" @click="jump('/pages/user/info', { user_id: user.user_id })">
				<u-icon class="fun-icon" color="#354463" name="account" :size="40"></u-icon>
				<u-section title="个人信息" :show-line="false" sub-title="" font-size="32"></u-section>
			</view>
			<view class="func" @click="jump('/pages/user/login')">
				<u-icon class="fun-icon" color="#354463" name="cut" :size="40"></u-icon>
				<u-section title="退出登录" :show-line="false" sub-title="" font-size="32"></u-section>
			</view> -->
			<u-cell-group>
				<u-cell-item icon="account" title="个人信息" :arrow="true" @click="jump('/pages/user/info', { user_id: user.user_id })"></u-cell-item>
				<u-cell-item icon="lock" title="修改密码" :arrow="true" @click="jump('/pages/user/changePass', { user_id: user.user_id })"></u-cell-item>
				<u-cell-item icon="cut" title="退出登录" :arrow="true" @click="jump('/pages/user/login')"></u-cell-item>
			</u-cell-group>
		</view>
		
		<u-popup v-model="show" mode="center" border-radius="14">
			<u-grid :col="2" :border="false" class="pop-grid">
				<u-grid-item class="pop-item" @click="jump('/pages/user/myFilm')">
					<u-icon name="grid" color="#354463" :size="52"></u-icon>
					<u-gap height="20" bg-color="#FFFFFF"></u-gap>
					<view class="grid-pop-text">我的作品</view>
				</u-grid-item>
				<u-grid-item @click="jump('/pages/user/newFilm')" class="pop-item">
					<u-icon name="order" color="#354463" :size="52"></u-icon>
					<u-gap height="20" bg-color="#FFFFFF"></u-gap>
					<view class="grid-pop-text">新建作品</view>
				</u-grid-item>
			</u-grid>
		</u-popup>
		<footerTab></footerTab>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import footerTab from '@/components/common/footerTab.vue';

export default {
	components: {
		footerTab,
		uniNavBar
	},
	data() {
		return {
			user: {},
			show: false,
			height: uni.getSystemInfoSync().screenHeight - 354
		};
	},
	methods: {
		async getUser() {
			// let user_id = uni.getStorageSync('user_id');
			await this.$request({
				url: 'users/info', 
				method: 'get',
				success: res => {
					this.user = res.data[0];
					console.log(this.user.avatar_url)
				},
				fail: error => {
					console.log(error);
					console.log('fail');
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '404 error'
					});
				}
			});
		},
		// 路由跳转
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		}
	},
	onShow: function() {
		this.user = {};
		this.getUser();
	}
};
</script>

<style lang="less" scoped>
.user {
	background-color: #ebebeb;
}

.person-box {
	width: 100%;
	height: 230px;
	margin: 0 auto;
	box-shadow: 0px -2px 8px #888888;
	background-color: #35446352;
	background-image: url(../../static/back2.webp);

	/* background-image: url(../../static/back.webp); */
	.person {
		margin: 0 auto;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		color: #ffffff;
		background-color: rgba(0, 0, 0, 0.6);

		.u-avatar {
			margin: 0 auto;
			width: 80px;
			height: 80px;
			margin-top: 20px;
		}

		.name {
			font-size: 24px;
			font-weight: bold;
			height: 30px;
			margin-top: 20px;
			line-height: 30px;
		}

		.myclass {
			font-size: 18px;
			height: 30px;
			line-height: 30px;
		}
	}
}

.u-grid {
	background-color: #ffffff;
	border-bottom: 1px solid rgb(224, 224, 224);
}

.funcBox {
	width: 100%;

	.func:first-child {
		margin-top: 10px;
	}

	.func {
		background-color: #ffffff;
		width: 95%;
		height: 50px;
		margin: 0 auto;
		padding: 2% 3% 2% 3%;
		margin-bottom: 10px;
		border-radius: 8px;
		display: flex;
		align-items: center;

		.fun-icon {
			float: left;
			display: inline-block;
			vertical-align: middle;
		}

		.u-section {
			width: 85%;
			float: left;
			height: 20px;
			margin-left: 15px;
		}
	}
}

.grid-pop-text {
	font-size: 18px;
}

.pop-item {
	padding: 20px 20px 20px 20px;
}
</style>
