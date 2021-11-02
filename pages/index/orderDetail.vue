<template>
	<view id="orderDetail">
		<!-- 返回导航栏 -->
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar left-icon="back" backgroundColor="#2d3036" title="招募详情" color="#d8d8d8" @clickLeft="back"></uniNavBar>
		<!-- <hx-navbar :config="config" /> -->
		<view id="box" :style="{ height: height + 'px' }" v-if="isRouterAlive">
			<u-gap height="20"></u-gap>
			<view class="order">
				<view class="title">
					<view class="txt">找{{ order.type_name }}</view>
					<u-icon name="star" size="40" color="#ef151c" v-if="like == false" @click="collect"></u-icon>
					<u-icon name="star-fill" size="40" color="#ef151c" v-if="like == true" @click="getCollectionId()"></u-icon>
				</view>
				<view class="time">{{ order.maketime }}</view>
				<view class="price">{{ order.price }}元</view>
				<u-gap height="20"></u-gap>
				<!-- <u-cell-item icon="map-fill" :title="order.location" :arrow="false"><u-icon class="map" name="zhuanfa" size="40" slot="right-icon"></u-icon></u-cell-item> -->
				<view class="location">
					<u-icon class="map-fill" name="map-fill" size="40"></u-icon>
					<view class="txt">{{ order.location }}</view>
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
			<view class="similar">
				<view class="text"><u-tag text="类似需求" mode="dark" shape="circle" bg-color="#2d3036" color="#d8d8d8" /></view>
				<orderPanel v-for="item in similarOrders" :key="item.order_id" :order="item"></orderPanel>
			</view>
		</view>

		<!-- <footerTab></footerTab> -->
		<takeFooter :order_id="order.order_id" :poster_id="poster.poster_id"></takeFooter>
	</view>
</template>

<script>
// import hxNavbar from "@/components/hx-navbar/hx-navbar"
import footerTab from '@/components/common/footerTab.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import orderPanel from '@/pages/index/child/orderPanel.vue';
import takeFooter from '@/pages/index/child/takeFooter.vue';

export default {
	components: {
		// hxNavbar,
		uniNavBar,
		orderPanel,
		footerTab,
		takeFooter
	},
	provide() {
		//父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
		return {
			reload: this.reload
		};
	},
	data() {
		return {
			order: {},
			similarOrders: [],
			poster: {},
			like: false,
			height: uni.getSystemInfoSync().screenHeight - 140,
			isRouterAlive: true,
			collection_id: 0
		};
	},
	methods: {
		reload() {
			this.isRouterAlive = false; //先关闭，
			this.$nextTick(function() {
				this.isRouterAlive = true; //再打开
			});
		},
		back() {
			// uni.navigateBack();
			// let user_id = uni.getStorageSync('user_id');
			// console.log(user_id)
			// this.jump('/pages/index/index');
			uni.switchTab({
				url: '/pages/index/index'
			});
			//@zxyuns 处理兼容，如果没有上一级界面则返回首页
			// const pages = getCurrentPages();
			// if (pages.length === 2) {
			// 	uni.navigateBack({
			// 		delta: 1
			// 	});
			// } else if (pages.length === 1) {
			// 	uni.switchTab({
			// 		url: '/pages/home/home'
			// 	});
			// } else {
			// 	uni.navigateBack({
			// 		delta: 1
			// 	});
			// }
		},
		async getDetail() {
			await this.$request({
				url: 'orders/detail/' + this.$Route.query.order_id,
				method: 'get',
				success: res => {
					this.order = res.data;
					this.poster = res.data.poster;
					console.log(this.order);
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
		async ifLike() {
			await this.$request({
				url: 'users/colllections/ifLike',
				method: 'post',
				data: {
					type: '1',
					production_id: this.$Route.query.order_id
				},
				success: res => {
					this.like = res.data;
					// this.getCollectionId();
					// console.log(this.like)
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
		async getCollectionId() {
			await this.$request({
				url: 'users/colllections/id',
				method: 'post',
				data: {
					type: '1',
					production_id: this.$Route.query.order_id
				},
				success: res => {
					this.collection_id = res.data;
					this.cancel(this.collection_id);
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
		async getSimilar() {
			await this.$request({
				url: 'orders/type/' + this.$Route.query.type_id,
				method: 'get',
				success: res => {
					this.similarOrders = res.data;
					if (this.similarOrders.length >= 3) {
						this.similarOrders = this.similarOrders.slice(0, 3);
					}
				},
				fail: error => {
					console.log(error);
					this.order = 'fail';
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '404 error'
					});
				}
			});
		},
		async collect() {
			await this.$request({
				url: 'orders/collect/4',
				method: 'post',
				data: {
					order_id: this.$Route.query.order_id
				},
				success: res => {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '收藏成功'
					});
					this.reload();
					this.like = true;
					this.collection_id = res.data.collection_id;
					// console.log(this.collection_id)
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
		async cancel(id) {
			await this.$request({
				url: 'users/collections/cancel/' + id,
				method: 'post',
				success: res => {
					this.like = false;
					// this.reload();
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
		this.getDetail();
		this.ifLike();
		this.getSimilar();
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

		// .u-cell-item {
		// 	padding: 0 !important;
		// }
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
			/* height: 30px; */
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
		padding: 10px 20px 20px 20px;
		width: 95%;
		margin: 0 auto;
		box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1);
		background-color: #ffffff;
		margin-bottom: 10px;
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
}
.similar {
	margin: 0 auto;
	margin-top: 10px;
	width: 95%;
	font-size: 13px;
	.text {
		font-size: 13px;
		line-height: 1.5;
		margin-bottom: 10px;
	}
	.orderPanel {
		margin-bottom: 20px;
	}
}
</style>
