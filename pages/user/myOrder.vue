<template>
	<view class="myOrder">
		<!-- 返回导航栏 -->
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar ref="top" left-icon="back" title="我的剧组" backgroundColor="#2d3036" color="#ffffff" @clickLeft="back" border="false"></uniNavBar>
		<u-tabs
			ref="tabs"
			:list="list"
			:is-scroll="false"
			:current="current"
			@change="change"
			font-size="33"
			bar-width="60"
			duration="0.25"
			:change="change"
			active-color="#d8d8d8"
			inactive-color="#b1b2b2"
			bg-color="#2d3036"
		></u-tabs>
		<view class="box" :style="{ height: height + 'px' }">
			<view class="order" v-if="!isShow" v-for="item in orders" :key="item.order_id"><myTake :order="item"></myTake></view>
			<view class="order" v-if="isShow" v-for="item in posts" :key="item.order_id"><myPost :order="item"></myPost></view>
		</view>
		<!-- <footerTab></footerTab> -->
	</view>
</template>

<script>
import footerTab from '@/components/common/footerTab.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import myTake from '@/pages/user/child/myTake.vue';
import myPost from '@/pages/user/child/myPost.vue';

export default {
	name: 'myOrder',
	components: {
		uniNavBar,
		footerTab,
		myTake,
		myPost
	},
	data() {
		return {
			list: [
				{
					name: '我的接单'
				},
				{
					name: '我的发布'
				}
			],
			current: 0,
			isShow: false,
			height: uni.getSystemInfoSync().screenHeight - 124,
			orders: [],
			posts: []
		};
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
			// history.back()
		},

		change(index) {
			this.current = index;
			if (this.current == 0) {
				this.isShow = false;
			} else {
				this.isShow = true;
			}
		},
		async getOrders() {
			await this.$request({
				url: 'orders/mytake',
				method: 'get',
				success: res => {
					this.orders = res.data || [];
				},
				fail: error => {
					console.log(error);
					this.orders = 'fail';
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '404 error'
					});
				}
			});
		},
		async getPosts() {
			await this.$request({
				url: 'orders/mypost',
				method: 'get',
				success: res => {
					this.posts = res.data || [];
					//统计每单接单者人数
					let obj = this.posts;
					for (let key in obj) {
						if (obj.hasOwnProperty(key)) {
							obj[key].takerNum = 0;
							for (let i in obj[key].takers) {
								if (obj[key].takers[i].user_id !== null) {
									obj[key].takerNum++;
								}
							}
						}
					}
					// console.log('post:', this.posts);
				},
				fail: error => {
					console.log(error);
					this.posts = 'fail';
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '404 error'
					});
				}
			});
		}
	},
	onShow() {
		this.getOrders();
		this.getPosts();
	}
};
</script>

<style lang="less" scoped>
.myOrder {
	background-color: #ebebeb;
}

/* 	.uni-navbar {
		border: none;
	} */
.uni-navbar {
	border: none !important;
}

.u-tabs {
	box-shadow: 0px -2px 8px #888888;
	border: none;
}

.box {
	width: 95%;
	margin: 0 auto;
	overflow: hidden;
	overflow-y: scroll;
	overflow-x: hidden;
}

.order:first-child,
.post:first-child {
	margin-top: 10px;
}
</style>
