<template>
	<view id="filmDetail">
		<!-- 返回导航栏 -->
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar left-icon="back" title="影片详情" backgroundColor="#2d3036" color="#d8d8d8" @clickLeft="back"></uniNavBar>
		<view class="film" :style="{ height: height + 'px' }">
			<view class="blank"></view>
			<view class="first">
				<view class="image"><u-image width="100%" height="100%" :src="film.film_pic"></u-image></view>
				<view class="intro">
					<view class="name">{{ film.film_name }}</view>
					<view class="type">喜剧</view>
					<view class="year">{{ film.time }}</view>
					<view class="btn">
						<!-- <u-button class="custom-style btn1" type="success" >认领</u-button> -->
						<u-icon class="custom-style btn1" name="man-add" size="50" @click="showJob = true"></u-icon>
						<u-select v-model="showJob" :list="jobList" @confirm="confirm" confirm-color="#ef151c"></u-select>
						<u-modal v-model="show" :content="content" @confirm="adopt" confirm-color="#2d3036"></u-modal>
						<!-- <u-button class="custom-style btn2" type="error">收藏</u-button> -->
						<u-icon class="custom-style btn1" name="star" @click="collect" size="50" color="red" v-if="like == false"></u-icon>
						<u-icon class="custom-style btn1" name="star-fill" @click="getCollectionId()" size="50" color="red" v-if="like == true"></u-icon>
						<!-- <u-icon name="star" size="40" color="#ef151c" v-if="like == false" @click="collect"></u-icon> -->
					</view>
				</view>
			</view>
			<view class="second">
				<view class="txt">剧情简介</view>
				<view class="content">
					<!-- <u-read-more :toggle="true" show-height="150" color="#a4a4a4"><rich-text :nodes="film.detail"></rich-text></u-read-more> -->
					<view>{{ film.detail }}</view>
				</view>
			</view>
			<view class="third">
				<view class="txt"><u-tag text="制作团队" mode="dark" shape="circle" bg-color="#2d3036" color="#d8d8d8" /></view>
				<makePanel v-for="(item, index) in film.team" :key="index" v-if="item.job" :person="item"></makePanel>
			</view>
			<!-- <u-divider>没有更多了</u-divider> -->
		</view>
		<!-- <footerTab></footerTab> -->
	</view>
</template>

<script>
import footerTab from '@/components/common/footerTab.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import makePanel from '@/pages/film/child/makePanel.vue';

export default {
	components: {
		uniNavBar,
		footerTab,
		makePanel
	},
	// props:["film"],
	data() {
		return {
			film: {},
			showJob: false,
			show: false,
			job: '',
			like: false,
			collection_id: 0,
			content: '是否认领该作品',
			height: uni.getSystemInfoSync().screenHeight - 84,
			jobList: [
				{
					value: '1',
					label: '导演'
				},
				{
					value: '2',
					label: '编剧'
				},
				{
					value: '3',
					label: '摄影师'
				},
				{
					value: '4',
					label: '美术'
				},
				{
					value: '5',
					label: '灯光'
				},
				{
					value: '6',
					label: '录音'
				},
				{
					value: '7',
					label: '后期'
				},
				{
					value: '8',
					label: '制片'
				}
			]
		};
	},
	methods: {
		confirm(e) {
			this.job = e[0].value;
			this.content = '是否认领' + e[0].label;
			this.show = true;
		},
		back() {
			uni.navigateBack();
		},
		async getDetail() {
			await this.$request({
				url: 'films/detail/' + this.$Route.query.film_id,
				method: 'get',
				success: res => {
					this.film = res.data || [];
					this.make = this.film.team[0].job;
				},
				fail: error => {
					console.log(error);
					this.film = 'fail';
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '404 error'
					});
				}
			});
		},
		async adopt() {
			await this.$request({
				url: 'films/adopt',
				method: 'post',
				data: {
					film_id: this.film.film_id,
					job: this.job
				},
				success: res => {
					console.log(res.data);
					if (res.data !== false) {
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '认领成功'
						});
						setTimeout(() => {
							this.jump('/pages/film/filmDetail', { film_id: film.film_id });
						}, 1000);
					} else {
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '无法重复认领该职务'
						});
					}
				},
				fail: error => {
					console.log(error);
					this.film = 'fail';
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '网络差错'
					});
				}
			});
		},
		async collect() {
			var that = this;
			await this.$request({
				url: 'films/collect/2',
				method: 'post',
				data: {
					film_id: this.$Route.query.film_id
				},
				success: res => {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '收藏成功'
					});
					that.like = true;
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
					type: '2',
					production_id: this.$Route.query.film_id
				},
				success: res => {
					this.like = res.data;
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
		async cancel() {
			await this.$request({
				url: 'users/collections/cancel/',
				method: 'post',
				data: {
					order_id: this.$Route.query.film_id
				},
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
		async getCollectionId() {
			await this.$request({
				url: 'users/colllections/id',
				method: 'post',
				data: {
					type: '2',
					production_id: this.$Route.query.film_id
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
		async cancel(id) {
			await this.$request({
				url: 'users/collections/cancel/' + id,
				method: 'post',
				success: res => {
					this.like = false;
					this.reload();
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
		this.getDetail();
		this.ifLike();
	}
};
</script>

<style lang="less" scoped>
#filmDetail {
	background-color: #ebebeb;
}

.film {
	width: 100%;
	margin: 0 auto;
	overflow: hidden;
	overflow-y: scroll;
	overflow-x: hidden;

	.blank {
		width: 100%;
		height: 10px;
	}

	.first {
		width: 95%;
		height: 200px;
		margin: 0 auto;
		padding-left: 3%;
		padding-right: 3%;
		padding-top: 2%;
		padding-bottom: 3%;
		margin-bottom: 10px;
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1);

		.image {
			float: left;
			width: 40%;
			height: 100%;
		}

		.intro {
			float: left;
			width: 50%;
			height: 100%;
			padding-left: 20px;
			position: relative;

			.name {
				font-size: 22px;
				line-height: 1.8;
			}

			.type,
			.year {
				font-size: 16px;
				/* height: 25px; */
				line-height: 1.5;
			}

			.btn {
				height: 50px;
				width: 100%;
				position: absolute;
				bottom: 0;
				// display: flex;
				// flex-wrap: nowrap;
				// justify-content: space-around;

				.btn1 {
					float: left;
					background-color: #e1e1e2;
					border-radius: 50%;
					padding: 10px 10px 10px 10px;

					margin-right: 20%;
				}

				.btn2 {
					float: right;
				}
			}
		}
	}

	.second {
		width: 95%;
		/* height: 200px; */
		margin: 0 auto;
		padding: 2% 3% 3% 3%;
		margin-bottom: 10px;
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1);

		.txt {
			font-size: 19px;
			height: 35px;
			font-weight: bold;
			line-height: 35px;
		}

		.content {
			font-size: 14px !important;
			line-height: 1.5 !important;
		}
	}

	.third {
		width: 95%;
		margin: 0 auto;

		.txt {
			font-size: 18px;
			color: #787878;
			/* height: 60px; */
			padding-top: 10px;
			/* border-bottom: 1px solid rgb(224, 224, 224); */
			padding-bottom: 10px;
		}
	}
}

.u-divider {
	margin-top: 30px;
}
</style>
