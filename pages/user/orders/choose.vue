<template>
	<view id="choose">
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
				</view>
				<u-gap height="20"></u-gap>
				<view class="detail">
					<view class="detail-title">工作要求</view>
					<view class="detail-txt">{{ order.orderdetail }}</view>
				</view>
			</view>
			<view class="text"><u-tag text="候选人" mode="dark" shape="circle" bg-color="#2d3036" color="#d8d8d8" /></view>
			<!-- <view class="warn" v-if="!takers[0].user_id">暂无候选人</view> -->
			<view class="personsBox">
				<view class="persons" v-for="item in takers" v-if="takers[0].user_id != null">
					<view class="personPanel">
						<u-avatar :src="item.avatar_url" @click="jump('/pages/index/personDetail', { user_id: item.user_id })"></u-avatar>
						<view class="intro">
							<view class="name">{{ item.name }}</view>
							<view class="class">{{ item.class }}</view>
						</view>
						<u-button class="btn" type="success" @click="decide(item.user_id)">选择</u-button>
					</view>
					<view class="info">
						<view class="info-title">个人介绍</view>
						<view class="info-txt">{{ item.intro }}</view>
					</view>
					<view class="info2">
						<view class="info-films">个人作品</view>
						<u-icon class="more" name="arrow-right" size="40" @click="jump('/pages/index/personDetail', { user_id: item.user_id })"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import orderPanel from '@/pages/index/child/orderPanel.vue';
export default {
	name: '',
	components: {
		uniNavBar,
		orderPanel
	},
	data() {
		return {
			height: uni.getSystemInfoSync().screenHeight - 85,
			order: {},
			takers: []
		};
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		async getDetail() {
			await this.$request({
				url: 'orders/mypost/detail/' + this.$Route.query.order_id,
				method: 'get',
				success: res => {
					this.order = res.data || [];
					this.takers = res.data.takers || [];
					// console.log(this.takers);
					console.log("takers" + this.takers[0].user_id)
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
				title: '即将删除！'
			});
			await this.$request({
				url: 'orders/delete/' + this.order.order_id,
				method: 'post',
				success: res => {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '删除成功，即将跳转'
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
		async decide(taker_id) {
			var that = this;
			await this.$request({
				url: 'orders/decide',
				method: 'post',
				data: {
					order_id: this.order.order_id,
					taker_id: taker_id
				},
				success: res => {
					if (res.statusCode == 200) {
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '选择成功，即将跳转'
						});
						setTimeout(function() {
							that.jump('/pages/user/orders/successPost', { order_id: that.order.order_id });
						}, 3000);
					} else {
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '网络差错'
						});
					}
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
#choose {
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
.warn {
	width: 95%;
	margin: 0 auto;
	font-size: 18px;
	text-align: center;
}
.personsBox {
	width: 95%;
	// height: 350px;
	margin: 0 auto;
	overflow-y: hidden;
	overflow-x: scroll;
	display: flex;
	flex-wrap: nowrap;
	margin-bottom: 20px;
}
.persons {
	width: 100%;
	height: 400px;
	margin: 0 auto;
	background-color: #ffffff;
	border-radius: 10px;
	flex-shrink: 0;
	margin-right: 10px;
	overflow-x: hidden;
	overflow-y: scroll;

	.personPanel {
		height: 90px;
		padding: 10px 20px 10px 20px;
		width: 100%;
		margin: 0 auto;
		display: flex;
		align-items: center;

		.u-avatar {
			width: 50px !important;
			height: 50px !important;
			float: left;
		}

		.intro {
			// height: 60px;
			float: left;
			padding-left: 20px;

			.name {
				margin-bottom: 5px;
			}
		}
		.btn {
			float: right;
		}
	}

	.info {
		width: 90%;
		padding-bottom: 20px;
		margin: 0 auto;
		margin-bottom: 10px;
		font-size: 14px;
		line-height: 1.5;
		color: #606266;

		.info-title,
		.info-films {
			width: 100%;
			color: #333333;
			font-size: 19px;
			font-weight: bold;
		}
	}
	.info2 {
		width: 90%;
		padding-bottom: 20px;
		margin: 0 auto;
		margin-bottom: 10px;
		height: 50px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;

		.info-films {
			float: left;
			color: #333333;
			font-size: 19px;
			font-weight: bold;
			padding-bottom: 20px;
			line-height: 30px;
		}
		.more {
			float: right;
			line-height: 50px;
		}
	}
}
</style>
