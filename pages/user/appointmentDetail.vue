<template>
	<view class="appointmentDetail">
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar left-icon="back" title="预约详情" backgroundColor="#2d3036" color="#ffffff" @clickLeft="back"></uniNavBar>
		<view class="box" :style="{ height: height + 'px' }">
			<view class="image">
				<view class="txt">
					<view class="success">
						你好，{{appointment.name}}
					</view>
					<view class="name">
						{{appointment.film_name}}
					</view>
				</view>
				<u-image width="100%" height="100%" :src="appointment.film_pic"></u-image>
				<view class="info">
					<!-- <view class="blank"></view> -->
					<view class="date">
						<view class="text">
							地点
						</view>
						<view class="content">
							{{appointment.location}}
						</view>
					</view>
					<view class="time">
						<view class="text">
							时间
						</view>
						<view class="content">
							{{appointment.show_time}}
						</view>
					</view>
					<view class="blank"></view>
				</view>
			</view>
			<view class="code">
				<u-image width="180px" height="180px" :src="codeImg"></u-image>
				<!-- <img src="https://apis.eps.gs/qrcode.php/?text=https://www.325.hk"> -->
			</view>
		</view>
		<!-- <footerTab></footerTab> -->
	</view>
</template>

<script>
	import footerTab from '@/components/common/footerTab.vue';
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import makePanel from '@/pages/film/child/makePanel.vue'

	export default {
		name: "appointmentDetail",
		components: {
			uniNavBar,
			footerTab,
			makePanel
		},
		data() {
			return {
				height: uni.getSystemInfoSync().screenHeight - 85,
				appointment: {},
				codeImg: "https://api.pwmqr.com/qrcode/create/?url="
			};
		},
		methods: {
			// 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
			confirm(e) {
				console.log(e);
			},
			back() {
				uni.navigateBack();
			},
			async getDetail() {
				await this.$request({
					url: "users/appointment/detail/" + this.$Route.query.appointment_id,
					method: 'get',
					success: (res) => {
						this.appointment = res.data || [];
						this.codeImg = this.codeImg + '您已预约在' + this.appointment.location + this.appointment.show_time + '的' + this.appointment.film_name 
						console.log("appointment:", this.appointment);
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
		created() {
			this.getDetail();
		}
	};
</script>

<style lang='less' scoped>
	.appointmentDetail {
		/* background-color: linear-gradient(rgb(45,48,54), rgb(79,84,95)); */
		background-image: linear-gradient(to top , #6e365b , #2d3036);/* 30度位置开始渐变 */
	}

	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.image {
		/* background-image: url(../../static/back4.png);
		background-size: contain;
		background-repeat: no-repeat; */
		background-color: #FFFFFF;
		width: 90%;
		height: 60%;
		display: flex;
		flex-direction: column;

		/* align-items: center; */
		/* position: relative; //设置定位 */
		.txt {
			padding: 2% 3% 2% 5%;
			line-height: 1.5;

			.success {
				font-size: 16px;
				color: #686868;
				font-weight: bold;
				line-height: 1.3;
			}

			.name {
				font-size: 30px;
				font-weight: bold;
			}
		}
	}

	.info {
		display: flex;
		justify-content: space-between;
		padding: 3% 3% 2% 6%;
		.blank {
			width: 10%;
		}
		.text {
			font-size: 16px;
			line-height: 1.5;
		}
		.content {
			font-size: 27px;
			font-weight: bold;
			line-height: 1.8;
		}
	}

	.code {
		background-color: #FFFFFF;
		width: 90%;
		height: 30%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative; //设置定位
	}

	.code::before {
		content: "";
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: block;
		background: #653656;
		position: absolute;
		top: 50%;
		left: -20px;
		transform: translateY(-50%);
	}

	.code::after {
		content: "";
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: block;
		background: #653656;
		position: absolute;
		top: 50%;
		right: -20px;
		transform: translateY(-50%);
	}
</style>
