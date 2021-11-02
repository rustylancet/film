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
				</view>
				<view class="time">{{ order.maketime }}</view>
				<view class="price">{{ order.price }}元</view>
				<u-gap height="20"></u-gap>
				<view class="location">
					<u-icon class="map-fill" name="map-fill" size="40"></u-icon>
					<view class="txt">{{ order.location }}</view>
				</view>
				<u-gap height="20"></u-gap>
				<view class="detail">
					<view class="detail-title">工作要求</view>
					<view class="detail-txt">{{ order.orderdetail }}</view>
				</view>
			</view>
			<view class="text"><u-tag text="接单伙伴" mode="dark" shape="circle" bg-color="#2d3036" color="#d8d8d8" /></view>
			<view class="personsBox">
				<u-avatar :src="person.avatar_url" size="large"></u-avatar>
				<view class="infoBox">
					<view class="name">{{ person.name }}</view>
					<view class="myclass">{{ person.class }}</view>
					<view class="contact">
						<u-icon class="weixin-fill" name="weixin-fill" size="40" color="#7dd33a"></u-icon>
						<view class="txt">微信：{{ person.wechat }}</view>
					</view>
					<view class="contact">
						<u-icon class="qq-fill" name="qq-fill" size="40" color="#3c79f9"></u-icon>
						<view class="txt">QQ：{{ person.qq }}</view>
					</view>
				</view>
				
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
			person: [],
			height: uni.getSystemInfoSync().screenHeight - 85
		};
	},
	methods: {
		back() {
			let user_id = uni.getStorageSync('user_id');
			// console.log(user_id)
			this.jump('/pages/user/myOrder', { user_id: user_id });
		},
		async getDetail() {
			await this.$request({
				url: 'orders/mypost/detail/' + this.$Route.query.order_id,
				method: 'get',
				success: res => {
					this.order = res.data;
					this.person = res.data.takers[0];
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
		padding: 10px 20px 10px 20px;
		margin: 0 auto;
		width: 95%;
		box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1);
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

		.u-gap {
			border-bottom: 1px solid rgb(224, 224, 224);
		}

		.location {
			height: 35px;
			padding-top: 10px;
			line-height: 25px;

			.map-fill {
				float: left;
			}

			.txt {
				float: left;
				margin-left: 10px;
			}
		}
	}

	.detail {
		border-radius: 10px;
		padding: 10px 0px 20px 0px;
		width: 100%;
		margin: 0 auto;
		background-color: #ffffff;
		margin-bottom: 10px;
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

.text {
	width: 95%;
	margin: 0 auto;
	margin-top: 10px;
	margin-bottom: 10px;
}

.personsBox {
	border-radius: 10px;
	padding: 10px 20px 10px 20px;
	margin: 0 auto;
	width: 95%;
	height: 130px;
	box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1);
	background-color: #ffffff;
	// display: flex;
	// flex-direction: column;
	// justify-content: center;
	// text-align: center;
	.u-avatar, .infoBox {
		float: left;
	}
	.infoBox {
		padding-left: 20px;
	}
	.name, .myclass, .contact {
		font-size: 15px;
		margin: 0 auto;
		height: 25px;
		line-height: 25px;
		
	}
	.contact {		
		.u-icon, .txt {
			float: left;
		}
	}
}
</style>
