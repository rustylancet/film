<template>
	<view class="filmPanel" @click="jump('/pages/film/filmDetail', { film_id: film.film_id })">
		<view class="first">
			<u-image width="110px" height="154px" :src="film.film_pic" border-radius="10"></u-image>
		</view>
		<view class="second">
			<view class="name">{{film.film_name}}({{film.time}})</view>
			<!-- <view class="location">剧情简介：：{{film.detail}}</view> -->
		</view>
		<!-- <u-gap height="10" bg-color="#888888"></u-gap> -->
	</view>
</template>

<script>
	export default {
		name: "filmPanel",
		props: ["film"],
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
	.filmPanel {
		width: 100%;
		padding-bottom: 10px;
		
		.second {
			width: 100%;

			.name {
				height: 20px;
				font-weight: bold;
				font-size: 13px;
				line-height: 1.5;
				overflow: hidden;
			}
		}
	}
</style>
