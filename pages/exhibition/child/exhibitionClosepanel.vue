<template>
	<view class="exhibitionClosepanel" @click="jump('/pages/exhibition/exhibitionClose', { exhibition_id: exhibition.exhibition_id })">
		<view class="first">
			<u-image width="120px" height="168px" :src="exhibition.film_pic + '/small'" border-radius="10"></u-image>
		</view>
		<view class="second">
			<view class="name">{{exhibition.film_name}}</view>
			<view class="time">{{exhibition.show_time}}</view>
			<view class="location">{{exhibition.location}}</view>
			<view class="location">{{exhibition.type_name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "exhibitionClosepanel",
		props: ["exhibition"],
		data() {
			return {
				// isTrue: true,
			};
		},
		methods: {
			// 路由跳转
			jump(path, parmas) {
				console.log("要传递：", parmas)
				this.$Router.push({
					path: path,
					query: parmas
				});
			},
		}
	}
</script>

<style lang='less' scoped>
	.exhibitionClosepanel {
		width: 95%;
		height: 185px;
		margin: 0 auto;
		padding-left: 3%;
		padding-right: 3%;
		padding-top: 2%;
		padding-bottom: 3%;
		margin-bottom: 10px;
		background-color: #FFFFFF;
		border-radius: 8px;
		box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1.0);

		.first {
			float: left;
		}

		.second {
			float: left;
			height: 100%;
			margin-left: 3%;
			position: relative;

			.name,
			.time,
			.location,
			.bot {
				height: 25px;
				line-height: 25px;
			}

			.name {
				font-size: 15px;
				font-weight: bold;
			}
		}
	}
</style>
