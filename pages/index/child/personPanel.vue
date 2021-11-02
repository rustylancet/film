<template>
	<view id="personPanel">
		<view id="first" @click="jump('/pages/index/personDetail', { user_id: person.user_id })">
			<u-avatar :src="person.avatar_url" size="50px"></u-avatar>
			<view class="intro">
				<view class="name">
					{{person.name}}
				</view>
				<view class="class">
					{{person.class}}
				</view>
				<view class="nofilm" v-if="person.films.length == 0">
					暂无作品
				</view>
			</view>
		</view>
		<view id="second" v-if="person.films.length != 0">
			<view class="films">
				<view class="film" v-for="item in person.films" :key="item.film_id" >
					<u-image width="100px" height="100%" border-radius="5" :src="item.film_pic" @click.native.stop="jump('/pages/film/filmDetail', { film_id: item.film_id })">
					</u-image>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		name: "personPanel",
		props: ["person"],
		data() {
			return {
				header: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg"
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
	};
</script>

<style lang="less" scoped>
	#personPanel {
		width: 95%;
		margin: 0 auto;
		padding-left: 3%;
		padding-right: 3%;
		padding-top: 2%;
		padding-bottom: 3%;
		margin-bottom: 10px;
		background-color: #FFFFFF;
		border-radius: 8px;
		box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1.0);

		#first {
			width: 100%;
			height: 60px;
			// background-color: #F0AD4E;
			top: 20px;

			.u-avatar {
				float: left;
				width: 50px;
				height: 50px;
			}

			.intro {
				float: left;
				margin-left: 20px;

				.name {
					font-size: 15px;
					font-weight: bold;
					line-height: 1.5;
				}

				.class {
					font-size: 14px;
					line-height: 1.5;
				}

				.nofilm {
					width: 100%;
					height: 25px;
				}
			}

		}



		#second {
			width: 100%;
			height: 130px;
			padding-left: 80px;
			overflow: hidden;

			.films {
				height: 100%;
				overflow-y: hidden;
				overflow-x: auto;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
			}

			.film {
				width: 100px;
				float: left;
				margin-right: 10px;
				border-radius: 10px !important;
			}
		}
	}
</style>
