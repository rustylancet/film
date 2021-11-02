<template>
	<view class="exhibitionDetail">
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar left-icon="back" title="展映详情" backgroundColor="#2d3036" color="#ffffff" @clickLeft="back"></uniNavBar>
		<view class="film" :style="{ height: height + 'px' }">
			<view class="blank"></view>
			<view class="first">
				<view class="image"><u-image width="100%" height="100%" :src="exhibition.film_pic + '/small'"></u-image></view>
				<view class="intro">
					<view class="name">{{ exhibition.film_name }}</view>
					<view class="time">{{ exhibition.show_time }}</view>
					<view class="location">{{ exhibition.location }}</view>
					<view class="btn">
						<u-icon class="custom-style btn1" name="clock" size="50" @click="appoint()" v-if="ifappoint == false"></u-icon>
						<u-icon class="custom-style btn1" name="clock-fill" size="50" @click="cancelAppo()" v-if="ifappoint == true"></u-icon>

						<u-icon class="custom-style btn1" name="star" @click="collect" size="50" color="red" v-if="like == false"></u-icon>
						<u-icon class="custom-style btn1" name="star-fill" @click="getCollectionId()" size="50" color="red" v-if="like == true"></u-icon>
						<!-- <u-button class="custom-style btn2" type="success" @click="appoint">预约</u-button> -->
					</view>
				</view>
			</view>
			<view class="second">
				<view class="txt">剧情简介</view>
				<view class="content">
					<!-- <u-read-more :toggle="true" show-height="150" color="#a4a4a4"><rich-text :nodes="exhibition.detail"></rich-text></u-read-more> -->
					<view>{{ exhibition.detail }}</view>
				</view>
			</view>
			<!-- <view class="third">
				<view class="txt"><u-tag text="制作团队" mode="dark" shape="circle" bg-color="#2d3036" color="#d8d8d8" /></view>
				<makePanel v-for="(item, index) in exhibition.team" :key="index" v-if="item.job" :person="item"></makePanel>
			</view> -->
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
	name: 'exhibitionDetail',
	components: {
		uniNavBar,
		footerTab,
		makePanel
	},
	data() {
		return {
			height: uni.getSystemInfoSync().screenHeight - 84,
			exhibition: {},
			like: false,
			collection_id: 0,
			ifappoint: false
		};
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		async ifLike() {
			await this.$request({
				url: 'users/colllections/ifLike',
				method: 'post',
				data: {
					type: '4',
					production_id: this.$Route.query.exhibition_id
				},
				success: res => {
					this.like = res.data;
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
		async ifAppoint() {
			var that = this;
			await this.$request({
				url: 'exhibitions/ifappoint/' + this.$Route.query.exhibition_id,
				method: 'post',
				success: res => {
					that.ifappoint = res.data;
					console.log('ifappoint', that.ifappoint);
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
					type: '4',
					production_id: this.$Route.query.exhibition_id
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
		async getDetail() {
			await this.$request({
				url: 'exhibitions/detail/' + this.$Route.query.exhibition_id,
				method: 'get',
				success: res => {
					this.exhibition = res.data || [];
					// console.log('team:', this.exhibition);
				},
				fail: error => {
					console.log(error);
					this.exhibition = 'fail';
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '404 error'
					});
				}
			});
		},
		async appoint() {
			var that = this;
			// console.log("appoint")
			await this.$request({
				url: 'exhibitions/appoint',
				method: 'post',
				data: {
					exhibition_id: this.$Route.query.exhibition_id
				},
				success: res => {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '预约成功'
					});
					that.ifappoint = true;
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
		async collect() {
			await this.$request({
				url: 'exhibitions/collect/4',
				method: 'post',
				data: {
					exhibition_id: this.$Route.query.exhibition_id
				},
				success: res => {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '收藏成功'
					});
					// this.reload();
					this.like = true;
					this.collection_id = res.data.collection_id;
					// console.log(this.collection_id)
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
		cancelAppo() {
			uni.showToast({
				icon: 'none',
				position: 'center',
				title: '您已预约'
			});
		}
	},
	onShow() {
		this.getDetail();
		this.ifLike();
		this.ifAppoint();
	}
};
</script>

<style lang="less" scoped>
.exhibitionDetail {
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
		padding: 2% 3% 3% 3%;
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
				font-size: 18px;
				height: 27px;
				font-weight: bold;
			}

			.location,
			.showtime {
				font-size: 15px;
				height: 25px;
			}

			.btn {
				height: 50px;
				width: 100%;
				position: absolute;
				bottom: 0;

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
		padding-left: 3%;
		padding-right: 3%;
		padding-top: 2%;
		padding-bottom: 3%;
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
			font-size: 17px;
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
