<template>
	<view id="personDetail">
		<!-- 返回导航栏 -->
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar left-icon="back" title="人才详情" backgroundColor="#2d3036" color="#d8d8d8" @clickLeft="back"></uniNavBar>
		<view class="person" :style="{ height: height + 'px' }">
			<!-- <view class="blank"></view> -->
			<view class="first">
				<view class="picBox">
					<view class="pic">
						<u-image class="img1" width="110%" height="300rpx" :src="person.avatar_url"></u-image>
						<u-image class="img2" width="100%" height="300rpx" :src="person.avatar_url"></u-image>
						<u-avatar :src="person.avatar_url"></u-avatar>
					</view>
				</view>
				<view class="intro">
					<view class="name">{{ person.name }}</view>
					<view class="myclass">{{ person.class }}</view>
				</view>
			</view>
			<view class="second">
				<view class="txt">个人介绍</view>
				<view class="content">{{ person.intro }}</view>
			</view>
			<view class="third">
				<view class="txt"><u-tag text="参与制作" mode="dark" shape="circle" bg-color="#2d3036" color="#d8d8d8" /></view>
				<view class="films" v-if="films[0].job"><film v-for="(item, index) in person.films" :key="index" :film="item" v-if="item.film_id !== null"></film></view>
			</view>
		</view>
		<footerTab></footerTab>
	</view>
</template>

<script>
import footerTab from '@/components/common/footerTab.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import film from '@/pages/index/child/film.vue';
export default {
	components: {
		uniNavBar,
		footerTab,
		film
	},
	data() {
		return {
			person: {},
			films: [
				{
					job: null
				}
			],
			height: uni.getSystemInfoSync().screenHeight - 140
		};
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		async getDetail() {
			await this.$request({
				url: 'persons/detail/' + this.$Route.query.user_id,
				method: 'get',
				success: res => {
					this.person = res.data || [];
					console.log(this.person)
					this.films = this.person.films;
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
	created() {
		this.getDetail();
	}
};
</script>

<style lang="less" scoped>
#personDetail {
	z-index: -3;
}

.person {
	width: 100%;
	margin: 0 auto;
	/* margin-top: 10px; */
	overflow: hidden;
	overflow-y: scroll;
	overflow-x: hidden;

	.blank {
		width: 100%;
		height: 10px;
	}

	.first {
		width: 100%;
		margin: 0 auto;

		.picBox {
			width: 100%;
			height: 150px;
			overflow: hidden;

			.pic {
				position: relative;
			}

			.u-image {
				height: 200px;
				margin: 0 auto;
			}
			.img1 {
				position: relative;
			}
			.img2 {
				position: absolute;
				filter: blur(10px);
				top: 0;
				left: 0;
			}
			.u-avatar {
				width: 100px !important;
				height: 100px !important;
				margin: 0 auto;
				z-index: 1;
				top: -120px;
				left: calc(50% - 50px);
				/* box-shadow: 0px 0px 10px 0px rgba(130, 130, 130, 1.0); */
			}
		}

		.intro {
			text-align: center;
			margin: 0 auto;
			line-height: 1.5;

			.name {
				font-size: 22px;
				margin: 0 auto;
				font-weight: bold;
				margin-top: 10px;
			}

			.myclass {
				font-size: 16px;
				margin: 0 auto;
				/* height: 25px; */
			}

			.btn {
				height: 50px;
				position: absolute;
				bottom: 0;

				.custom-style {
					width: 70px;
				}
			}
		}
	}

	.second {
		width: 95%;
		/* height: 200px; */
		margin: 0 auto;
		padding: 2% 3% 5% 3%;
		margin-bottom: 10px;
		margin-top: 10px;
		background-color: #ebebeb;
		border-radius: 8px;

		/* box-shadow: 5px 5px 20px 5px rgba(199, 199, 199, 1.0); */
		.txt {
			font-size: 19px;
			font-weight: bold;
			line-height: 1.8;
		}

		.content {
			font-size: 14px !important;
			line-height: 1.5 !important;
			color: #606266;
		}
	}

	.third {
		width: 95%;
		margin: 0 auto;
		.txt {
			font-size: 18px;
			color: #787878;
			height: 60px;
			padding-top: 10px;
			/* border-bottom: 1px solid rgb(224, 224, 224); */
			padding-bottom: 10px;
		}

		.films {
			/* 		width: 95%;
				margin: 0 auto; */
			height: 250px;
			overflow-x: scroll;
			overflow-y: hidden;
			white-space: nowrap;
			display: flex;
		}
	}
}

.u-divider {
	margin-top: 30px;
}
</style>
