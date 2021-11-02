<template>
	<view class="newFilm">
		<u-gap height="80" bg-color="#2d3036"></u-gap>
		<uniNavBar ref="top" left-icon="back" title="新建作品" backgroundColor="#2d3036" color="#ffffff" @clickLeft="back"></uniNavBar>
		<view class="box" :style="{ height: height + 'px' }">
			<u-form :model="form" ref="uForm" label-position="top">
				<u-form-item label="作品名称"><u-input v-model="form.name" class="input-b" /></u-form-item>
				<u-form-item label="作品类型">
					<u-radio-group v-model="form.type">
						<u-radio v-for="(item, index) in radioList" :key="index" :name="item.value" :disabled="item.disabled" active-color="red">{{ item.name }}</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="上映时间">
					<view @click="show = true">{{ form.time }}</view>
					<u-calendar v-model="show" mode="date" @change="change" max-date="2050-12-31"></u-calendar>
				</u-form-item>
				<u-form-item label="作品简介"><u-input v-model="form.detail" class="input-text" type="textarea" maxlength="1000" /></u-form-item>
				<u-form-item label="您的职务">
					<u-checkbox-group @change="checkboxGroupChange">
						<u-checkbox active-color="red" v-model="item.checked" v-for="(item, index) in jobList" :key="index" :name="item.value">{{ item.name }}</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="海报上传"><u-image width="100%" height="300rpx" :src="img" @click="picture"></u-image></u-form-item>
			</u-form>
			<u-gap height="40" bg-color="#ffffff"></u-gap>
			<u-button class="sub" @click="submitForm" shape="circle" type="error">提交</u-button>
			<!-- <u-gap height="80" bg-color="#ffffff"></u-gap> -->
		</view>

		<!-- <footerTab></footerTab> -->
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import footerTab from '@/components/common/footerTab.vue';
export default {
	name: 'newFilm',
	components: {
		uniNavBar,
		footerTab
	},
	data() {
		return {
			date: {
				result: 'X年X月X日'
			},
			show: false,
			showJob: false,
			mode: 'date',
			img: '',
			height: uni.getSystemInfoSync().screenHeight - 85,
			form: {
				name: '',
				detail: '',
				type: '',
				time: 'X年X月X日',
				job: []
			},
			jobList: [
				{
					value: '1',
					name: '导演',
					checked: false
				},
				{
					value: '2',
					name: '编剧',
					checked: false
				},
				{
					value: '3',
					name: '摄影师',
					checked: false
				},
				{
					value: '4',
					name: '美术',
					checked: false
				},
				{
					value: '5',
					name: '灯光',
					checked: false
				},
				{
					value: '6',
					name: '录音',
					checked: false
				},
				{
					value: '7',
					name: '后期',
					checked: false
				},
				{
					value: '8',
					name: '制片',
					checked: false
				}
			],
			radioList: [
				{
					value: '1',
					name: '电影',
					disabled: false
				},
				{ value: '2', name: '电视剧', disabled: false },
				{ value: '3', name: '话剧', disabled: false },
				{ value: '4', name: '音乐剧', disabled: false },
				{ value: '5', name: '展览', disabled: false }
			],
			switchVal: false
		};
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		// 路由跳转
		jump(path, parmas) {
			// console.log("要传递：", parmas)
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		change(e) {
			this.form.time = e.result;
			console.log(e);
		},
		picture() {
			// this.$refs.uUpload.upload();
			var that = this;
			uni.chooseImage({
				//选择图片
				count: 1,
				sizeType: ['compressed'],
				success(res) {
					var imgsFile = res.tempFilePaths[0]; //获取图片的临时资源
					that.img = imgsFile;
				}
			});
		},
		checkboxGroupChange(e) {
			// console.log(e);
			this.job = e
			this.form.job = e
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
			// console.log(result)
			if (result == 5) {
				var that = this;
				await this.$request({
					url: 'films/',
					method: 'post',
					data: {
						film_name: this.form.name,
						type: this.form.type,
						time: this.form.time,
						detail: this.form.detail,
						job: this.job
					},
					success: res => {
						console.log(res.data)
						console.log(that.img)
						uni.uploadFile({
							//上传代码
							url: 'http://47.96.228.152:8000/upload/picture/' + res.data, //本地node.js服务器地址
							method: 'post',
							filePath: that.img,
							name: 'picture',
							success: function(res) {
								uni.showToast({
									icon: 'none',
									position: 'center',
									title: '新建成功,即将跳转'
								});								
							}
						});
						setTimeout(function() {
							that.jump('/pages/film/filmDetail', { film_id: res.data });
						}, 1000);
						// console.log(res.data[0].film_id);
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
.newFilm {
	/* background-color: #ebebeb; */
}

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
		color: #000000;
	}
	.input-text {
		color: #000000;
		height: 150px;
		overflow-y: scroll;
	}
	.date {
		float: left;
	}
}

.sub {
	width: 100%;
	margin-bottom: 10px;
}
</style>
