<template>
	<view id="exhibition">
		<view class="back">
			<u-gap height="80" bg-color="#2d3036"></u-gap>
			<view class="top-box">
				<view class="top">
					<u-subsection active-color="#d8d8d8" inactive-color="#b1b2b2" bg-color="#313e52" button-color="#414b62" :list="topics"
					 font-size="35" current="isSelected" @change="sectionChange"></u-subsection>
				</view>
			</view>
		</view>
			<view class="box" :style="{ height: height + 'px' }">
				<exhibition-panel v-if="isShow && item.exhibition_id" v-for="item in exhibitions" :exhibition="item"></exhibition-panel>
				<exhibitionClosepanel v-if="!isShow && item.exhibition_id" v-for="item in exhibitionsOff" :exhibition="item"></exhibitionClosepanel>
			</view>

		<footerTab></footerTab>
	</view>
</template>

<script>
	import footerTab from '@/components/common/footerTab.vue';
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import exhibitionPanel from '@/pages/exhibition/child/exhibitionPanel.vue'
	import exhibitionClosepanel from '@/pages/exhibition/child/exhibitionClosepanel.vue'

	export default {
		components: {
			footerTab,
			uniNavBar,
			exhibitionPanel,
			exhibitionClosepanel
		},
		data() {
			return {
				isSelected: 0,
				topics: [{
						name: "正在展映",
					},
					{
						name: "已经结束",
					},
				],
				isShow: true,
				exhibitions: [],
				exhibitionsOff: [],
				height: uni.getSystemInfoSync().screenHeight - 130,//145
			};
		},
		methods: {
			sectionChange(index) {
				this.isSelected = index;
				if (this.isSelected == 0) {
					this.isShow = true;
					// console.log("现在是：" + this.isShow);
				} else {
					this.isShow = false;
					// console.log("现在是：" + this.isShow);
				}
			},
			async getExhibitions() {
				// console.log(this.isActive)
				await this.$request({
					url: "exhibitions/1",
					method: 'get',
					success: (res) => {
						this.exhibitions = res.data || [];
						console.log(this.exhibitions );
					},
					fail: (error) => {
						console.log(error);
						// this.exhibitions = "wow fail~";
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '404 error'
						});
					},
				})
			},
			async getExhibitionsOff() {
				await this.$request({
					url: "exhibitions/0",
					method: 'get',
					success: (res) => {
						this.exhibitionsOff = res.data || [];
						for (let j = 0, len = this.exhibitionsOff.length; j < len; j++) {
							this.exhibitionsOff[j].disabled = true;
						}
					},
					fail: (error) => {
						console.log(error);
						this.exhibitionsOff = "wow fail~";
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '404 error'
						});
					},
				})
			},
			// 路由跳转
			jump(path, parmas) {
				console.log("要传递：", parmas)
				this.$Router.push({
					path: path,
					query: parmas
				});
			},
		},
		onShow() {
			this.getExhibitions();
			this.getExhibitionsOff();
		}
	};
</script>

<style lang='less' scoped>
	
#exhibition {
	background-color: #ebebeb;
}
	.back {
		width: 100%;
		background-color: #2d3036;
		color: #a4a4a4;
	}

	.top-box {
		width: 100%;
		padding-bottom: 10px;

		.top {
			width: 200px;
			margin: 0 auto;

			.u-subsection {
				width: 100%;

			}
		}

	}
	.box {
		width: 100%;
		margin: 0 auto;
		/*禁止纵向滚动*/
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.exhibitionPanel:nth-child(1), .exhibitionClosepanel:nth-child(1)  {
		margin-top: 10px;
	}

	.exhibitionPanel:last-child, .exhibitionClosepanel:last-child {
		margin-bottom: 20px;
	}
</style>
