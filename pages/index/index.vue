<template>
	<view>
		<view class="back">
			<u-gap height="80" bg-color="#2d3036"></u-gap>
			<view class="top-box">
				<view class="top">
					<u-subsection
						active-color="#d8d8d8"
						inactive-color="#b1b2b2"
						bg-color="#313e52"
						button-color="#414b62"
						:list="list"
						font-size="35"
						current="curNow"
						@change="sectionChange"
					></u-subsection>
				</view>
			</view>
			<u-gap height="20" bg-color="#2d3036"></u-gap>
			<u-tabs-swiper
				:list="jobs"
				:is-scroll="true"
				font-size="33"
				:current="current"
				@change="change"
				active-color="#d8d8d8"
				inactive-color="#b1b2b2"
				bg-color="#2d3036"
				v-show="isShow"
			></u-tabs-swiper>
		</view>
		<view class="box">
			<!-- <u-gap height="20" bg-color="#ffffff"></u-gap> -->
			<view v-show="isShow" class="orders" :style="{ height: height + 'px' }"><orderPanel v-for="item in orders" :key="item.order_id" :order="item"></orderPanel></view>
			<view class="persons" v-show="!isShow" :style="{ height: height + 'px' }"><personPanel v-for="item in persons" :person="item" :key="item.name"></personPanel></view>
			<footerTab></footerTab>
		</view>
	</view>
</template>
<script>
import orderPanel from '@/pages/index/child/orderPanel.vue';
import footerTab from '@/components/common/footerTab.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import personPanel from '@/pages/index/child/personPanel.vue';
export default {
	components: {
		orderPanel,
		footerTab,
		uniNavBar,
		personPanel
	},
	data() {
		return {
			list: [
				{
					name: '招募'
				},
				{
					name: '人才'
				}
			],
			jobs: [
				{
					name: '导演',
					value: 1,
				},
				{
					name: '编剧',
					value: 2,
				},
				{
					name: '摄影',
					value: 3,
				},
				{
					name: '美术',
					value: 4,
				},
				{
					name: '灯光',
					value: 5,
				},
				{
					name: '录音',
					value: 6,
				},
				{
					name: '后期',
					value: 7
				},
				{
					name: '制片',
					value: 8,
				}
			],
			orders: [],
			persons: [],
			isSelected: 0,
			isActive: 0,
			isShow: true,
			height: uni.getSystemInfoSync().screenHeight - 168,
			customStyle: {
				hairLine: 'false'
			},
			current: 0,
			curNow: 0
		};
	},
	computed: {
		isChosen: {
			get: function() {
				return this.current + 1;
			},
			// setter
			set: function(newValue) {}
		}
	},

	methods: {
		sectionChange(index) {
			this.curNow = index;
			if (this.curNow == 0) {
				this.isShow = true;
				this.height = uni.getSystemInfoSync().screenHeight - 175;
				// console.log("现在是：" + this.isShow);
			} else {
				this.isShow = false;
				this.height = uni.getSystemInfoSync().screenHeight - 140;
			}
		},
		change(index) {
			this.current = index;
			this.isChosen = this.current + 1;
			this.getOrders();
		},
		compare(property) {
			return function(a, b) {
				var value1 = a[property];
				var value2 = b[property];
				return value2 - value1;
			};
		},
		async getOrders() {
			await this.$request({
				url: 'orders/type/' + this.isChosen,
				method: 'get',
				success: res => {
					this.films = res.data || [];
					this.orders = res.data || [];
					// console.log(this.orders)
				},
				fail: error => {
					console.log(error);
					// this.orders = "wow fail~";
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
				url: 'persons/all',
				method: 'get',
				success: res => {
					let list = res.data || [];
				//个人作品集去重
					for (let i = 0; i < list.length; i++) {
						let Array = []; //存放去重过后的数据
						let obj = {};
						let data = list[i].films;
						//去除data,里面EmployeeID相同的对象
						for (var j = 0; j < data.length; j++) {
							if (!obj[data[j].film_id]) {
								Array.push(data[j]);
								obj[data[j].film_id] = true;
							}
						}
						list[i].films = Array
					}
					for (let i = 0; i < list.length; i++) {
						let data = list[i].films;
						for (var j = 0; j < data.length; j++) {
							if (list[i].films[j].film_id == null) {
								list[i].films.splice(j, 1);
							}
						}
					}
					this.persons = list
					console.log(this.persons)
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
		this.getPersons();
	},
	onLoad: function(options) {
		uni.startPullDownRefresh(); //这里表示当进入页面的时候就开始执行下拉刷新动画
	}
};
</script>

<style lang="less" scoped>
body {
	background-color: #ebebeb;
}
.back {
	width: 100%;
	background-color: #2d3036;
	color: #a4a4a4;
}

.top-box {
	width: 100%;
	// height: 35px;

	.top {
		width: 150px;
		margin: 0 auto;

		.u-subsection {
			width: 100%;
		}
	}
}

.box {
	background-color: #ebebeb;
	// background-color: #FFFFFF;
	width: 100%;
	margin: 0 auto;
	height: 100%;

	// margin-top: 3%;
	/*禁止纵向滚动*/
	overflow-y: hidden;
	overflow-x: hidden;

	.orders {
		width: 95%;
		margin: 0 auto;
		/* height: 500px; */
		overflow: hidden;
		overflow-y: scroll;
		overflow-x: hidden;

		#orderPanel:first-child {
			margin-top: 10px;
		}
	}

	.persons {
		width: 100%;
		margin: 0 auto;
		overflow: hidden;
		overflow-y: scroll;
		overflow-x: hidden;

		#personPanel:first-child {
			margin-top: 10px;
		}
	}
}
</style>
