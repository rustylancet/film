<template>
	<view class="film">
		<view class="image" @click="jump('/pages/film/filmDetail', { film_id: film.film_id })">
			<u-image width="120px" height="100%" :src="film.film_pic + '/small'" ></u-image>
		</view>
		<view class="name">{{film.film_name}}</view>
		<view class="job">担任{{film.job}}</view>
	</view>
</template>

<script>
	export default {
		name: "film",
		props: ["film"],
		data() {
			return {

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
		},
	};
</script>

<style lang='less' scoped>
	.film {
		float: left;
		margin-right: 20px;
		font-size: 13px;
		text-align: center;

		.image {
			height: 168px;
		}

		.name {
			width: 100%;
			height: 20px;
			margin-top: 5px;
		}

		.job {
			color: #676767;
			width: 100%;
			height: 20px;
			margin-top: 5px;
		}
	}
</style>
