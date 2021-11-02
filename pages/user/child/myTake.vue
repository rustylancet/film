<template>
	<view class="myTake"  @click="jumpDetail">
		<view id="first">
			<u-avatar :src="order.poster.avatar_url"></u-avatar>
		</view>
		<view id="second">
			<view id="row">
				<view class="title">找{{ order.type_name }}</view>
				<view class="price">{{ order.price }}元</view>
			</view>
			<view class="time">{{ order.maketime }}</view>
			<view class="detail">
				<view class="txt">
					{{ order.orderdetail }}
				</view>
				<u-tag :text="stateText" :type="state" mode="dark" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "myTake",
		props: ["order"],
		data() {
			return {
				state: "error",
				stateText: "等待中"
			};
		},
		methods: {
			
			getState() {
				let result = this.order.result;
				if (result == 0) {
					this.state = "primary";
					this.stateText = "等待中";
				} else if (result == 1) {
					this.state = "success"
					this.stateText = "已成功";
				} else {
					this.state = "info"
					this.stateText = "已失败";
				}
			},
			// 路由跳转
			jump(path, parmas) {
				// console.log("要传递：", parmas)
				this.$Router.push({
					path: path,
					query: parmas
				});
			},
			jumpDetail() {
				let result = this.order.result;
				if (result == 0) {
					//等待 蓝色
					this.jump('/pages/user/orders/orderDetail', { order_id: this.order.order_id })
				} else if (result == 1) {
					//成功 绿色
					this.jump('/pages/user/orders/successDetail', { order_id: this.order.order_id })
				} else {
					//失败关闭 灰色
					this.jump('/pages/user/orders/failDetail', { order_id: this.order.order_id })
				}
				
			},
		},
		mounted() {
			this.getState();
		}
	};
</script>

<style lang='less' scoped>
	.myTake {
		/* border-bottom: 1px solid rgb(224, 224, 224); */
		width: 100%;
		margin: 0 auto;
		padding: 2% 3% 3% 3% !important;
		margin-bottom: 10px;
		background-color: #FFFFFF;
		border-radius: 8px;
		box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1.0);
		display: flex;
		flex-direction: row;
		align-items: center;

		#first,
		#second {
			float: left;
			font-size: 12px;
			/* 			padding-top: 10px; */
			/* height: 75px; */
		}

		#first {
			display: flex;
			align-items: center;

			.u-avatar {
				width: 50px !important;
				/* height: 50px !important; */
				margin-right: 20px;
			}
		}

		#second {
			width: 100%;

			#row {
				width: 100%;
				height: 25px;
				line-height: 25px;

				.title {
					font-size: 15px;
					line-height: 1.5;
					width: 180px;
					float: left;
					font-weight: bold;
				}

				.price {
					font-size: 16px;
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
				font-size: 14px;
				line-height: 1.5;
				height: 40px;
				overflow: hidden;
				color: #606266;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
			}

			.txt {
				width: 76%;
				height: 100%;
				overflow: hidden;
			}
		}
	}
</style>
