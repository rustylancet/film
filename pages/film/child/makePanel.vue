<template>
	<view id="makePanel" @click="jump('/pages/index/personDetail', { user_id: person.user.user_id })">
		<view id="first">
			<u-avatar :src="person.user.avatar_url" size="60px"></u-avatar>
			<view class="intro">
				<view class="name">{{ person.user.name }}</view>
				<view class="job">{{ person.job }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'makePanel',
	props: ['person'],
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
	},
	mounted() {
		// this.show();
	}
};
</script>

<style lang="less" scoped>
#makePanel {
	width: 100%;
	// height: 200px;
	margin: 0 auto;
	padding-left: 3%;
	padding-right: 3%;
	padding-top: 2%;
	padding-bottom: 3%;
	margin-bottom: 10px;
	background-color: #ffffff;
	border-radius: 8px;
	box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1);

	#first {
		width: 100%;
		height: 65px;
		// background-color: #F0AD4E;
		top: 20px;

		.u-avatar {
			float: left;
			width: 60px;
			height: 60px;
		}

		.intro {
			float: left;
			margin-left: 20px;

			.name {
				font-size: 15px;
				height: 22.5px;
				line-height: 22.5px;
			}

			.job {
				font-size: 14px;
				height: 21px;
				line-height: 21px;
			}
		}
		.collect {
			float: right;
		}
	}
	.u-icon {
		float: right;
		height: 100%;
		line-height: 65px;
	}
}
</style>
