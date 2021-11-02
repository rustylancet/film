<template>
	<view>
		<!-- <u-upload ref="uUpload" :action="action" :auto-upload="false" :file-list="fileList" ></u-upload> -->
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
export default {
	name: '',
	components: {},
	data() {
		return {
			action: 'http://localhost:8000/upload/avatar',
			fileList: [] // 图片文件
		};
	},
	methods: {
		// afterRead() {
		// 	this.multipleUpload(this.$refs.uUpload.lists);
		// },
		submit() {
			// this.$refs.uUpload.upload();
			var that = this;
			uni.chooseImage({
				//选择图片
				count: 1,
				sizeType: ['compressed'],
				success(res) {
					var imgsFile = res.tempFilePaths[0]; //获取图片的临时资源
					uni.uploadFile({
						//上传代码
						url: 'http://localhost:8000/upload/avatar/4', //本地node.js服务器地址
						method: 'post',
						filePath: imgsFile,
						name: 'avatar', //这个东西有点类似与 form表单中的  name值 在后面也需要这个
						success: function(res) {
							console.log(res);
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="less" scoped></style>
