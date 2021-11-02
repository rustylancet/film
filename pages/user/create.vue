<template>
	<view class="create">
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar ref="top" title="发布需求" backgroundColor="#2d3036" color="#ffffff" ></uniNavBar>
		<view class="box" :style="{ height: height + 'px' }">
			<u-form :model="form" ref="uForm" label-position="top">
				<u-form-item label="需求类型">
					<u-radio-group v-model="form.order_type">
						<u-radio v-for="(item, index) in radioList" :key="index" :name="item.value" :disabled="item.disabled" active-color="red">{{ item.name }}</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="工作时间"><u-input v-model="form.maketime" class="input-b" /></u-form-item>
				<u-form-item label="工作地点"><u-input v-model="form.location" class="input-b" /></u-form-item>
				<u-form-item label="酬劳"><u-input v-model="form.price" class="input-b" /></u-form-item>
				<u-form-item label="工作群"><u-input v-model="form.groupvx" class="input-b" /></u-form-item>
				<u-form-item label="具体要求"><u-input v-model="form.orderdetail" class="input-detail" type="textarea" /></u-form-item>
			</u-form>
			<u-button class="sub" @click="submitForm" shape="circle" type="error">提交</u-button>
			<u-gap height="50" bg-color="#ffffff"></u-gap>
		</view>
		
		<footerTab></footerTab>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import footerTab from '@/components/common/footerTab.vue';

export default {
	name: 'create',
	components: {
		footerTab,
		uniNavBar
	},
	data() {
		return {
			height: uni.getSystemInfoSync().screenHeight - 132,
			form: {
				orderdetail: '',
				order_type: '',
				location: '',
				groupvx: '',
				price: '',
				maketime: ''
			},
			radioList: [
				{
					value: '1',
					name: '导演',
					disabled: false
				},
				{
					value: '2',
					name: '编剧',
					disabled: false
				},
				{
					value: '3',
					name: '摄影师',
					disabled: false
				},
				{
					value: '4',
					name: '美术',
					disabled: false
				},
				{
					value: '5',
					name: '灯光',
					disabled: false
				},
				{
					value: '6',
					name: '录音',
					disabled: false
				},
				{
					value: '7',
					name: '后期',
					disabled: false
				},
				{
					value: '8',
					name: '制片',
					disabled: false
				}
			]
		};
	},
	methods: {
		back() {
			// let user_id = uni.getStorageSync('user_id');
			// console.log(user_id)
			this.jump('/pages/index/index');
		},
		// 路由跳转
		jump(path, parmas) {
			console.log('要传递：', parmas);
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
			// console.log(this.form.order_type)
			if (result == 6) {
				await this.$request({
					url: 'orders/',
					method: 'post',
					data: {
						order_type: this.form.order_type,
						groupvx: this.form.groupvx,
						maketime: this.form.maketime,
						price: this.form.price,
						location: this.form.location,
						orderdetail: this.form.orderdetail
					},
					success: res => {
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '发布成功，即将跳转'
						});
						setTimeout(() => {
							 this.jump('/pages/index/orderDetail', { order_id: res.data.order_id })							
						}, 2000);
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
.u-form {
	width: 100%;
	margin: 0 auto;
	.input-b {
		color: #000000 !important;
	}
		
	.input-detail {
		color: #000000 !important;
		height: 100px;
	}
}
</style>
