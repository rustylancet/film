<template>
	<view class="film">
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<view class="search">
			<!-- <uni-search-bar :radius="100" @confirm="search" bgColor="#2d3036" cancelButton="false"></uni-search-bar> -->
			<u-search placeholder="请输入内容" shape="round" 
			:clearabled="true" border-color="#909399" bg-color="#2d3036" color="#ffffff" :action-style="searchsty"
			@search="search" :show-action="false"></u-search>
		</view>

		<view class="film_box">
			<u-tabs :list="types" :is-scroll="true" :current="current" @change="change" font-size="33" active-color="#d8d8d8"
			 inactive-color="#b1b2b2" bg-color="#2d3036"></u-tabs>
			<!-- inactive-color：tabs文字颜色
			active-color：滑块和激活tab文字的颜色 -->
		</view>
		<view class="filmsBox">
			<view class="films" :style="{ height: height + 'px' }">
				<u-row gutter="16" justify="start">
					<u-col span="4" v-for="item in films">
						<filmPanel :film="item" :key="item.film_id"></filmPanel>
					</u-col>
				</u-row>
			</view>
		</view>

		<footerTab></footerTab>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import footerTab from '@/components/common/footerTab.vue';
	import filmPanel from '@/pages/film/child/filmPanel.vue'

	export default {
		name: "film",
		components: {
			footerTab,
			uniNavBar,
			filmPanel
		},
		data() {
			return {
				current: 0,
				customStyle: {
					hairLine: "false",
				},
				height: uni.getSystemInfoSync().screenHeight - 160,
				customStyle: {
					borderRadius: "10px"
				},
				films: [],
				types: [{
						name: "电影",
					},
					{
						name: "电视剧",
					},
					{
						name: "话剧",
					},
					{
						name: "音乐剧",
					},
					{
						name: "展览",
					}
				],
				searchsty: {
					color: '#ffffff'
				}

			};
		},
		computed: {
			isChosen: {
				get: function() {
					return this.current + 1;
				},
				// setter
				set: function(newValue) {

				}
			}
		},
		methods: {
			change(index) {
				this.current = index;
				this.isChosen = this.current + 1;
				this.getFilms(this.isChosen);
				// console.log("choose:", this.isChosen)
			},
			async getFilms(type_id) {
				await this.$request({
					url: "films/type/" + type_id,
					method: 'get',
					success: (res) => {
						this.films = res.data || [];
						console.log(this.films)
						
					},
					fail: (error) => {
						console.log(error);
						this.films = "wow fail~";
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '404 error'
						});
					},
				})
			},
			async search(value) {
				// console.log(value);
				await this.$request({
					url: "films/search/" + value,
					method: 'get',
					success: (res) => {
						this.films = res.data || [];
						// console.log(this.films)
						
					},
					fail: (error) => {
						console.log(error);
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '404 error'
						});
					},
				})
			}
		},
		mounted() {
			this.getFilms(this.isChosen);
		}
	};
</script>

<style lang='less' scoped>
	.search {
		background-color: #2d3036;
	}

	.film_box {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}

	.filmsBox {
		width: 100%;
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

	}
</style>
