<template>
	<view class="changePass">
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar left-icon="back" title="个人信息" backgroundColor="#2d3036" color="#d8d8d8" @clickLeft="back"></uniNavBar>
		<view class="box" :style="{ height: height + 'px' }">
			<u-form :model="form" ref="uForm" label-position="top" label-width="auto">
				<u-form-item label="原密码" border-bottom="true"><u-input v-model="form.old" type="password" border="true" /></u-form-item>
				<u-form-item label="新密码"><u-input v-model="form.new1" type="password" border="true" /></u-form-item>
				<u-form-item label="密码确认"><u-input v-model="form.new2" type="password" border="true" /></u-form-item>
			</u-form>
			<u-gap height="80" bg-color="#FFFFFF"></u-gap>
			<u-button class="sub" @click="submitForm" shape="circle" type="success">确定修改</u-button>
		</view>
		<footerTab></footerTab>
	</view>
</template>

<script>
import footerTab from '@/components/common/footerTab.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';

export default {
	components: {
		uniNavBar,
		footerTab
	},
	data() {
		return {
			form: {},
			height: uni.getSystemInfoSync().screenHeight - 131
		};
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		// 路由跳转
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		async submitForm() {
			let obj = this.form;
			let result = 0;
			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (obj[key] === null || obj[key] === '') {
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '所有项不能为空'
						});
					} else {
						result++;
					}
				}
			}
			if (result == 3) {
				if (this.form.new1 === this.form.new2) {
					await this.$request({
						url: 'users/changepass',
						method: 'post',
						data: {
							old: this.form.old,
							new1: this.form.new1,
							new2: this.form.new2
						},
						success: res => {
							uni.navigateBack();
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
				} else {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '两次新密码必须一致'
					});
				}
			} else {
				uni.showToast({
					icon: 'none',
					position: 'center',
					title: '所有项不能为空'
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.box {
	width: 95%;
	margin: 0 auto;
	overflow: hidden;
	overflow-y: scroll;
	overflow-x: hidden;
}

.input-text {
	width: 100%;
}

.avatar {
	/* 		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center; */
}
.u-border-bottom:after {
	border: none;
}
.u-form-item {
	background-color: #ffffff;
}
</style>
