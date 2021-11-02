<template>
	<view class="myAppointment">
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar ref="top" left-icon="back" title="我的预约" backgroundColor="#2d3036" color="#ffffff" @clickLeft="back"></uniNavBar>
		<view class="box" :style="{ height: height + 'px' }">
			<appointment v-for="item in appointments" :appointment="item"></appointment>
			<view class="warn" v-if="appointments.length == 0">暂无预约</view>
		</view>
		<!-- <footerTab></footerTab> -->
	</view>
</template>

<script>
import footerTab from '@/components/common/footerTab.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import appointment from '@/pages/user/child/appointment.vue';
export default {
	name: 'myAppointment',
	components: {
		uniNavBar,
		appointment,
		footerTab
	},
	data() {
		return {
			height: uni.getSystemInfoSync().screenHeight - 85,
			appointments: []
		};
	},
	methods: {
		back() {
			try {
				uni.navigateBack();
			} catch (e) {
				//TODO handle the exception
				uni.redirectTo({
					url: '/pages/user/user',
					user_id: uni.getStorageSync('user_id')
				});
			}
			// let user_id = uni.getStorageSync('user_id');
			// // console.log(user_id)
			// this.jump('/pages/user/user', { user_id: user_id });
		},
		async getAppointments() {
			// console.log(this.isActive)
			await this.$request({
				url: 'users/appointment',
				method: 'get',
				success: res => {
					this.appointments = res.data || [];
					console.log(this.appointments)
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
		// 路由跳转
		jump(path, parmas) {
			console.log('要传递：', parmas);
			this.$Router.push({
				path: path,
				query: parmas
			});
		}
	},
	onShow() {
		this.getAppointments();
	}
};
</script>

<style lang="less" scoped>
.myAppointment {
	width: 100%;
	background-color: #ebebeb;
}
.appointment:nth-child(1) {
	margin-top: 10px;
}

.appointment:last-child {
	margin-bottom: 20px;
}
.warn {
	width: 95%;
	margin: 0 auto;
	font-size: 18px;
	text-align: center;
	margin-top: 20px;
}
</style>
