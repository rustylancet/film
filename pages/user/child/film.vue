<template>
	<view class="film">
		<view class="image" @click="jump('/pages/film/filmDetail', { film_id: film.film_id })">
			<u-image width="110px" height="154px" :src="film.film_pic" border-radius="10"></u-image>
		</view>
		<view class="name">{{ film.film_name }}</view>
		<view class="job">担任{{ film.job }}</view>
	</view>
</template>

<script>
export default {
	name: 'film',
	props: ['film'],
	data() {
		return {};
	},
	methods: {
		// 路由跳转
		jump(path, parmas) {
			console.log('要传递：', parmas);
			this.$Router.push({
				path: path,
				query: parmas
			});
		}
	}
};
</script>

<style lang="less" scoped>
.film {
	float: left;
	margin-right: 20px;
	font-size: 14px;
	text-align: center;
	padding-bottom: 10px;

	.name {
		width: 100%;
		margin-top: 5px;
	}

	.job {
		color: #676767;
		width: 100%;
		line-height: 1.5;
	}
}
</style>
