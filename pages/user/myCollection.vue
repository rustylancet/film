<template>
	<view class="myCollection">
		<!-- 返回导航栏 -->
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar ref="top" left-icon="back" title="我的收藏" backgroundColor="#2d3036" color="#ffffff" @clickLeft="back"></uniNavBar>
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
			<view class="collection" v-if="current == 0"><orderPanel v-for="item in cOrders" :key="item.collection_id" :order="item"></orderPanel></view>
			<view class="collection" v-if="current == 1"><exhibition-panel v-for="item in cExhibitions" :key="item.exhibition_id" :exhibition="item"></exhibition-panel></view>
			<view class="collection" v-if="current == 2">
				<u-row gutter="16" justify="start">
					<u-col span="4" v-for="item in cFilms"><filmPanel :film="item" :key="item.film_id"></filmPanel></u-col>
				</u-row>
			</view>
		</view>
		<!-- <footerTab></footerTab> -->
	</view>
</template>

<script>
import footerTab from '@/components/common/footerTab.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import orderPanel from '@/pages/index/child/orderPanel.vue';
import personPanel from '@/pages/index/child/personPanel.vue';
import filmPanel from '@/pages/film/child/filmPanel.vue';
import exhibitionPanel from '@/pages/exhibition/child/exhibitionPanel.vue';
export default {
	name: 'myCollection',
	components: {
		uniNavBar,
		footerTab,
		orderPanel,
		personPanel,
		filmPanel,
		exhibitionPanel
	},
	data() {
		return {
			list: [
				{
					name: '招募'
				},
				{
					name: '展映'
				},
				{
					name: '作品'
				}
			],
			current: 0,
			isShow: false,
			height: uni.getSystemInfoSync().screenHeight - 125,
			cOrders: [],
			cExhibitions: [],
			cFilms: [],
			cPersons: []
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
		},
		change(index) {
			this.current = index;
		},
		async getOrders() {
			await this.$request({
				url: 'users/colllections/order',
				method: 'get',
				success: res => {
					this.cOrders = res.data || [];
					console.log('orders:', this.orders);
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
		async getExhibitions() {
			await this.$request({
				url: 'users/colllections/exhibition',
				method: 'get',
				success: res => {
					this.cExhibitions = res.data || [];
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
		async getFilms() {
			await this.$request({
				url: 'users/colllections/film',
				method: 'get',
				success: res => {
					this.cFilms = res.data || [];
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
		async getPersons() {
			await this.$request({
				url: 'users/colllections/person',
				method: 'get',
				success: res => {
					this.cPersons = res.data || [];
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
	},
	onShow() {
		this.getOrders();
		this.getExhibitions();
		this.getFilms();
		this.getPersons();
	}
};
</script>

<style lang="less" scoped>
.myCollection {
	background-color: #ebebeb;
}

.u-tabs {
	box-shadow: 0px -2px 8px #888888;
}

.box {
	overflow: hidden;
	overflow-y: scroll;
	overflow-x: hidden;
}

.collection,
.post {
	width: 100%;
	margin: 0 auto;
}
.u-row {
	width: 95%;
	margin: 0 auto;
}
.collection:first-child,
.post:first-child {
	margin-top: 10px;
}
</style>
