<template>
	<view id="footerTab">
		<u-tabbar class="tabbar" :list="list" v-model="current" bg-color="#FFFFFF" 
		active-color="#eb3434" inactive-color="#a4a4a4" :mid-button="true" icon-size="50"></u-tabbar>
	</view>
</template>

<script>
export default {
	name: 'footerTab',
	data() {
		return {
			list: [
				{
					iconPath: 'file-text',
					selectedIconPath: 'file-text-fill',
					text: '招募',
					customIcon: false,
					pagePath: '/pages/index/index'
				},
				{
					iconPath: 'calendar',
					selectedIconPath: 'calendar-fill',
					text: '展映',
					customIcon: false,
					pagePath: '/pages/exhibition/exhibition'
				},
				{
					iconPath: 'plus-circle',
					selectedIconPath: 'plus-circle-fill',
					text: '发布',
					midButton: true,
					customIcon: false,
					pagePath: '/pages/user/create'
				},
				{
					iconPath: 'play-right',
					selectedIconPath: 'play-right-fill',
					text: '片库',
					customIcon: false,
					pagePath: '/pages/film/film'
				},
				{
					iconPath: 'account',
					selectedIconPath: 'account-fill',
					text: '我的',
					isDot: false,
					customIcon: false,
					pagePath: '/pages/user/user'
				}
			],
		
			current: 0
		};
	}
};
</script>

<style>
#footerTab {
	width: 100%;
	height: 60px;
	bottom: 0px;
	position: fixed;
	z-index: 5;
}

.u-tabbar__content__item {
	padding: 0;
	padding-top: 6px;
}

.u-tabbar__content__item__button {
	top: 14px;
}
</style>
