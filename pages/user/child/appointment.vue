<template>
	<view class="appointment" @click="jump('/pages/user/appointmentDetail', { appointment_id: appointment.appointment_id })">
		<view class="first">
			<u-image width="120px" height="168px" :src="appointment.film_pic + '/small'" border-radius="10"></u-image>
		</view>
		<view class="second">
			<view class="name">{{appointment.film_name}}</view>
			<view class="time">{{appointment.show_time}}</view>
			<view class="location">{{appointment.location}}</view>
			<view class="type">{{appointment.type_name}}</view>
			<view class="detail">{{appointment.detail}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "appointment",
		props: ["appointment"],
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
	.appointment {
		width: 95%;
		height: 185px;
		margin: 0 auto;
		padding-left: 3%;
		padding-right: 3%;
		padding-top: 2%;
		padding-bottom: 3%;
		margin-bottom: 10px;
		background-color: #FFFFFF;
		border-radius: 8px;
		box-shadow: 0px 0px 30px 0px rgba(216, 216, 216, 1.0);

		.first {
			float: left;
			width: 40%;
		}

		.second {
			float: left;
			height: 100%;
			margin-left: 3%;
			width: 55%;

			.name,
			.time,
			.location,
			.type {
				font-size: 14px;
				line-height: 1.8;
			}

			.name {
				font-size: 15px;
				font-weight: bold;
			}
			.detail {
				height: 40px;
				overflow: hidden;
				color: #606266;
			}
		}
	}
</style>
