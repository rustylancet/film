<template>
	<view id="orderDetail">
		<!-- 返回导航栏 -->
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar left-icon="back" backgroundColor="#2d3036" title="招募详情" color="#d8d8d8" @clickLeft="back"></uniNavBar>
		<!-- <hx-navbar :config="config" /> -->
		<view id="box" :style="{ height: height + 'px' }">
			<u-gap height="20"></u-gap>
			<view class="order">
				<view class="title">
					<view class="txt">找{{ order.type_name }}</view>
					<u-icon class="map-fill" name="close" size="40" @click="deletePost()"></u-icon>
				</view>
				<view class="time">{{ order.maketime }}</view>
				<view class="price">{{ order.price }}元</view>
				<u-gap height="20"></u-gap>
				<view class="location">
					<u-icon class="map-fill" name="map-fill" size="40"></u-icon>
					<view class="txt">{{ order.location }}</view>
					<u-icon class="map" name="zhuanfa" size="40"></u-icon>
				</view>
			</view>
			<u-gap height="20"></u-gap>
			<view class="detail">
				<view class="detail-title">工作要求</view>
				<view class="detail-txt">{{ order.orderdetail }}</view>
			</view>
			<view class="personPanel" @click="jump('/pages/index/personDetail', { user_id: poster.poster_id })">
				<u-avatar :src="poster.poster_avatar"></u-avatar>
				<view class="intro">
					<view class="name">{{ poster.poster_name }}</view>
					<view class="class">{{ poster.poster_class }}</view>
				</view>
			</view>
			<!-- <u-gap height="20" bg-color="#dcdcdc"></u-gap> -->
			<!-- <view class="similar">
				<view class="text"><u-tag text="类似需求" mode="dark" shape="circle" bg-color="#2d3036" color="#d8d8d8" /></view>
				<orderPanel v-for="item in similarOrders" :key="item.order_id" :order="item"></orderPanel>
			</view> -->
		</view>

		<view class="takeFooter"><u-button shape="circle" class="custom-style" type="primary" @click="takeOrder">等待中</u-button></view>
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
			// similarOrders: [],
			poster: {},
			height: uni.getSystemInfoSync().screenHeight - 144.8
		};
	},
	methods: {
		back() {
			let user_id = uni.getStorageSync('user_id');
			// console.log(user_id)
			this.jump('/pages/user/myOrder', { user_id: user_id });
			// uni.navigateBack();
		},
		async getDetail() {
			await this.$request({
				url: 'orders/detail/' + this.$Route.query.order_id,
				method: 'get',
				success: res => {
					this.order = res.data;
					this.poster = res.data.poster;
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
		async deletePost() {
			uni.showToast({
				icon: 'none',
				position: 'center',
				title: '即将撤销接单'
			});
			await this.$request({
				url: 'orders/canceltake/' + this.order.order_id,
				method: 'post',
				success: res => {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '撤销成功，即将跳转'
					});
					setTimeout(function() {
						uni.navigateBack();
					}, 3000);
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
		// this.getSimilar();
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

#orderDetail {
	background-color: #ebebeb;
}

#box {
	margin: 0 auto;
	/*禁止纵向滚动*/
	overflow-y: scroll;
	overflow-x: hidden;

	.order {
		border-radius: 10px;
		padding: 4% 4% 3% 4%;
		margin: 0 auto;
		width: 95%;
		box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1);
		background-color: #ffffff;

		.title {
			font-size: 15px;
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
			font-size: 13px;
			line-height: 1.5;
		}

		.time {
			color: #999999;
		}

		.price {
			color: #d90003;
		}

		.u-gap {
			border-bottom: 1px solid rgb(224, 224, 224);
		}

		.location {
			height: 30px;
			padding-top: 10px;

			.map-fill {
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

	.detail {
		border-radius: 10px;
		padding: 4% 4% 4% 4%;
		width: 95%;
		margin: 0 auto;
		box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1);
		background-color: #ffffff;
		margin-bottom: 10px;
		font-size: 14px;
		line-height: 1.5;
		color: #606266;

		.detail-title {
			color: #333333;
			font-size: 15px;
			height: 35px;
			font-weight: bold;
			line-height: 1.5;
		}
		.detail-txt {
			font-size: 13px;
			line-height: 1.5;
		}
	}

	.personPanel {
		height: 90px;
		border-radius: 10px;
		padding: 2% 4% 3% 4%;
		width: 95%;
		margin: 0 auto;
		box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1);
		background-color: #ffffff;
		display: flex;
		align-items: center;

		.u-avatar {
			width: 50px !important;
			float: left;
		}

		.intro {
			height: 60px;
			float: left;
			padding-left: 20px;

			.name {
				margin-bottom: 5px;
			}
		}
	}

	.similar {
		margin-top: 20px;
		margin: 0 auto;
		width: 95%;
		font-size: 13px;

		.text {
			font-size: 13px;
			line-height: 1.5;
			margin-bottom: 10px;
			margin-top: 10px;
		}

		.orderPanel {
			margin-bottom: 20px;
		}
	}
}

.takeFooter {
	background-color: #ffffff;
	bottom: 0px;
	position: fixed;
	width: 100%;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.custom-style {
		margin: 0 auto;
		float: right;
		width: 97%;
	}
}
</style>
