<template>
	<view class="exhibitionClose">
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
				</view>
			</view>
			<view class="second">
				<view class="txt">剧情简介</view>
				<view class="content">
					<u-read-more :toggle="true" show-height="150" color="#a4a4a4"><rich-text :nodes="exhibition.detail"></rich-text></u-read-more>
				</view>
			</view>
			<view class="third">
				<view class="txt"><u-tag text="制作团队" mode="dark" shape="circle" bg-color="#2d3036" color="#d8d8d8" /></view>
				<makePanel v-for="(item, index) in exhibition.team" :key="index" v-if="item.job" :person="item"></makePanel>
			</view>
			<!-- <u-divider>没有更多了</u-divider> -->
		</view>

		<u-select v-model="showSelect" mode="single-column" :list="list" @confirm="confirm"></u-select>

		<footerTab></footerTab>
	</view>
</template>

<script>
import footerTab from '@/components/common/footerTab.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import makePanel from '@/pages/film/child/makePanel.vue';

export default {
	name: 'exhibitionClose',
	components: {
		uniNavBar,
		footerTab,
		makePanel
	},
	data() {
		return {
			height: uni.getSystemInfoSync().screenHeight - 140,
			exhibition: {},
			show: false,
			showSelect: false,
			list: [
				{
					value: '1',
					label: '江'
				},
				{
					value: '2',
					label: '湖'
				}
			]
		};
	},
	methods: {
		// 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
		confirm(e) {
			console.log(e);
			this.appoint(e[0]);
		},
		back() {
			uni.navigateBack();
		},
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		async getDetail() {
			await this.$request({
				url: 'exhibitions/detail/' + this.$Route.query.exhibition_id,
				method: 'get',
				success: res => {
					this.exhibition = res.data || [];
					console.log('team:', this.exhibition.team);
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
	},
	created() {
		this.getDetail();
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
