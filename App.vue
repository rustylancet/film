<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	export default {
		created() {
		
		},
		methods: {
			// 路由跳转
			jump(path, parmas) {
				// console.log("要传递：", parmas)
				this.$Router.push({
					path: path,
					query: parmas
				});
			},
		},
		onLaunch: function() {
			console.log('App Launch')

		}
	}
</script>

<style>
	/* @import './common/uni.css'; */

	uni-page-head {
		display: none;
	}
</style>
