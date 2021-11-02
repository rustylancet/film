<template>
	<view id="successDetail">
		<!-- 返回导航栏 -->
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar left-icon="back" backgroundColor="#2d3036" title="剧组信息" color="#d8d8d8" @clickLeft="back"></uniNavBar>
		<!-- <hx-navbar :config="config" /> -->
		<view id="box" :style="{ height: height + 'px' }">
			<u-gap height="20"></u-gap>
			<view class="order">
				<view class="title">
					<view class="txt">找{{ order.type_name }}</view>
				</view>
				<view class="time">{{ order.maketime }}</view>
				<u-gap height="20"></u-gap>
				<view class="location">
					<u-icon class="rmb" name="rmb" size="40" color="#ef151c"></u-icon>
					<view class="txt">{{ order.price }}元</view>
				</view>
				<view class="location">
					<u-icon class="map-fill" name="map-fill" size="40" color="#ef7b1c"></u-icon>
					<view class="txt">{{ order.location }}</view>
				</view>
				<view class="location">
					<u-icon class="weixin-fill" name="weixin-fill" size="40" color="#7dd33a"></u-icon>
					<view class="txt">{{ poster.wechat }}</view>
				</view>
				<view class="location">
					<u-icon class="qq-fill" name="qq-fill" size="40" color="#3c79f9"></u-icon>
					<view class="txt">{{ poster.qq }}</view>
				</view>
				<view class="location">
					<u-icon class="plus-people-fill" name="plus-people-fill" size="40" color="#4a4a4a"></u-icon>
					<view class="txt">{{ poster.name }}{{ poster.phone }}</view>
				</view>
			</view>
			<view class="blank"></view>
			<view class="detail">
				<view class="detail-title">工作要求</view>
				<view class="detail-txt">{{ order.orderdetail }}</view>
			</view>
			<view class="wechat">
				<view class="text"><u-tag text="工作微信群" mode="dark" shape="circle" bg-color="#2d3036" color="#d8d8d8" /></view>
				<u-image width="150px" height="150px" :src="codeImg"></u-image>
			</view>
		</view>
		<!-- <footerTab></footerTab> -->
	</view>
</template>

<script>
// import hxNavbar from "@/components/hx-navbar/hx-navbar"
import footerTab from '@/components/common/footerTab.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import orderPanel from '@/pages/index/child/orderPanel.vue';

export default {
	components: {
		// hxNavbar,
		uniNavBar,
		orderPanel,
		footerTab
	},
	data() {
		return {
			order: {},
			similarOrders: [],
			poster: {},
			height: uni.getSystemInfoSync().screenHeight - 85,
			codeImg: 'https://api.pwmqr.com/qrcode/create/?url='
		};
	},
	methods: {
		back() {
			// let user_id = uni.getStorageSync('user_id');
			// // console.log(user_id)
			// this.jump('/pages/user/myOrder', { user_id: user_id });
			uni.navigateBack();
		},
		async getDetail() {
			await this.$request({
				url: 'orders/mytake/success/detail/' + this.$Route.query.order_id,
				method: 'get',
				success: res => {
					this.order = res.data;
					this.poster = res.data.poster;
					this.codeImg = this.codeImg + '该剧组的工作群号为' + this.order.groupvx ;
					// console.log(this.poster);
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
	onLoad() {
		this.getDetail();
	}
};
</script>

<style lang="less" scoped>
.uni-navbar {
	height: 44.8px;
	width: 100%;

	.uni-nav-bar-text {
		font-size: 18px;
	}
}

#successDetail {
	background-color: #2d3036;
}

#box {
	margin: 0 auto;
	/*禁止纵向滚动*/
	overflow-y: scroll;
	overflow-x: hidden;

	.order {
		padding: 10px 20px 10px 20px;
		margin: 0 auto;
		width: 95%;
		background-color: #ffffff;

		.title {
			font-size: 19px;
			line-height: 1.8;
			/* height: 40px; */
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			font-weight: bold;
		}

		.time,
		.price {
			height: 30px;
			font-size: 16px;
			line-height: 1.8;
		}

		.time {
			color: #999999;
		}

		.price {
			color: #d90003;
			font-size: 18px;
		}

		.location {
			height: 35px;
			padding-top: 10px;
			line-height: 25px;
			font-size: 18px;

			.rmb,
			.map-fill,
			.weixin-fill,
			.plus-people-fill,
			.qq-fill {
				float: left;
			}

			.txt {
				float: left;
				margin-left: 10px;
			}

			.map {
				float: right;
			}
		}
	}

	.blank {
		background-color: #ffffff;
		width: 95%;
		margin: 0 auto;
		height: 20px;
		position: relative; //设置定位
	}

	.blank::before {
		content: '';
		width: 20px;
		height: 20px;
		border-radius: 50%;
		display: block;
		background: #2d3036;
		position: absolute;
		top: 50%;
		left: -10px;
		transform: translateY(-50%);
	}

	.blank::after {
		content: '';
		width: 20px;
		height: 20px;
		border-radius: 50%;
		display: block;
		background: #2d3036;
		position: absolute;
		top: 50%;
		right: -10px;
		transform: translateY(-50%);
	}

	.detail {
		padding: 0px 20px 10px 20px;
		margin: 0 auto;
		width: 95%;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 1.5;
		color: #606266;

		.detail-title {
			color: #333333;
			font-size: 19px;
			height: 35px;
			font-weight: bold;
			line-height: 1.5;
		}
	}
}

.wechat {
	padding: 20px 20px 10px 20px;
	margin: 0 auto;
	width: 95%;
	background-color: #ffffff;

	.u-image {
		margin: 0 auto;
	}
}
</style>
