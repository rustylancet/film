<template>
	<view class="takeFooter">
		<!-- <u-icon name="heart" size="60" color="#ff181b"></u-icon> -->
		<u-button shape="circle" class="custom-style" type="error" @click="takeOrder">接单</u-button>
	</view>
</template>

<script>
export default {
	name: 'takeFooter',
	props: ['order_id', 'poster_id'],
	data() {
		return {};
	},
	methods: {
		// 路由跳转
		jump(path, parmas) {
			console.log('要传递：', parmas);
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		async takeOrder() {
			let user_id = uni.getStorageSync('user_id');
			console.log(user_id, this.poster_id)
			if (this.poster_id == user_id) {
				uni.showToast({
					icon: 'none',
					position: 'center',
					title: '无法接自己的需求'
				});
			} else {
				await this.$request({
					url: 'orders/take/' + this.order_id,
					method: 'post',
					success: res => {
						if (res.data == false) {
							uni.showToast({
								icon: 'none',
								position: 'center',
								title: '无法重复接单'
							});
						} else {
							uni.showToast({
								icon: 'none',
								position: 'center',
								title: '成功接单，即将跳转'
							});
							setTimeout(() => {
								this.jump('/pages/user/orders/orderDetail', { order_id: this.order_id });
								// this.jump('/pages/index/orderDetail', { order_id: res.data.takeorder_id })
							}, 2000);
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
			}
		}
	}
};
</script>

<style lang="less" scoped>
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
		width: 80%;
		/* background-color:#eb3434;
			color: #d8d8d8; */
	}
}
</style>
