<template>
	<view id="orderPanel" @tap.stop="jump('/pages/index/orderDetail', { order_id: order.order_id, type_id: order.type_id })">
		<view id="first">
			<u-avatar :src="order.poster.poster_avatar"></u-avatar>
		</view>
		<view id="second">
			<view id="row">
				<view class="title">找{{ order.type_name }}</view>
				<view class="price">{{ order.price }}元</view>
			</view>
			<view class="time">{{ order.maketime }}</view>
			<view class="detail">{{ order.orderdetail }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "orderPanel",
		props: ["order"],
		data() {
			return {
				// header: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg"
			};
		},
		methods: {
			// 路由跳转
			jump(path, parmas) {
				// console.log("要传递：", parmas)
				this.$Router.push({
					path: path,
					query: parmas
				});
			},
		},
		created() {
			// console.log("this.order:", this.order)
		}
	};
</script>

<style lang="less" scoped>
	#orderPanel {
		// width: 95%;
		margin: 0 auto;
		padding: 3% 4% 3% 4%;
		margin-bottom: 10px;
		// background-color: #f3f3f3;
		background-color: #FFFFFF;
		border-radius: 8px;
		box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1.0);
		display: flex;
		flex-direction: row;
		align-items: center;

		#first,
		#second {
			float: left;
			font-size: 13px;
			line-height: 1.5;
		}

		#first {
			display: flex;
			align-items: center;

			.u-avatar {
				margin-right: 20px;
			}
		}

		#second {
			width: 100%;

			#row {
				width: 100%;
				height: 22.5px;

				.title {
					font-size: 15px;
					line-height: 1.5;
					width: 180px;
					float: left;
					font-weight: bold;
				}

				.price {
					font-size: 15px;
					float: right;
					margin-right: 10px;
					font-weight: bold;
					color: #eb3434;
				}
			}

			.time {
				font-size: 13px;
				height: 19.5px;
				line-height: 1.5;
				color: #999999;
			}

			.detail {
				font-size: 12px;
				line-height: 1.5;
				height: 40px;
				overflow: hidden;
				color: #606266;
			}
		}
	}
</style>
