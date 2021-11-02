<template>
	<view class="myFilm">
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar ref="top" left-icon="back" title="我的作品" backgroundColor="#2d3036" color="#ffffff" @clickLeft="back"></uniNavBar>
		<view class="films" :style="{ height: height + 'px' }">
			<u-row gutter="16" justify="start">
				<u-col span="4" v-for="item in films" v-if="item.film_id !== null"><film :film="item" :key="item.film_id"></film></u-col>
			</u-row>
		</view>
		<!-- <footerTab></footerTab> -->
	</view>
</template>

<script>
import footerTab from '@/components/common/footerTab.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import film from '@/pages/user/child/film.vue';
export default {
	name: 'myFilm',
	components: {
		uniNavBar,
		film,
		footerTab
	},
	data() {
		return {
			height: uni.getSystemInfoSync().screenHeight - 85,
			films: []
		};
	},
	methods: {
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

		// RemoveArr(arr) {
		// 	var arr1 = [];
		// 	for (var i = 0; i < arr.length; i++) {
		// 		if (arr1.map(x => x.uuid).indexOf(arr[i].uuid) == -1) {
		// 			arr1.push(arr[i]);
		// 		}
		// 	}
		// 	return arr1;
		// },
		compare(property) {
			return function(a, b) {
				var value1 = a[property];
				var value2 = b[property];
				return value2 - value1;
			};
		},

		async getMyfilms() {
			// console.log(this.isActive)
			await this.$request({
				url: 'users/myfilms',
				method: 'get',
				success: res => {
					let filmsList = res.data.films || [];
					let Array = []; //存放去重过后的数据
					let obj = {};
					//去除data,里面EmployeeID相同的对象
					for (var i = 0; i < filmsList.length; i++) {
						if (!obj[filmsList[i].film_id]) {
							Array.push(filmsList[i]);
							obj[filmsList[i].film_id] = true;
						}
					}					
					this.films = Array.sort(this.compare('film_id'))
					console.log(this.films)
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
		this.getMyfilms();
	}
};
</script>

<style lang="less" scoped>
.myFilm {
	width: 100%;
	background-color: #ebebeb;
}

/* background-color: #ebebeb; */
.films {
	width: 95%;
	margin: 0 auto;
	/*禁止纵向滚动*/
	overflow-y: scroll;
	overflow-x: hidden;

	.u-row:nth-child(1) {
		margin-top: 10px;
	}
}
</style>
