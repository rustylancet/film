import {
	RouterMount,
	createRouter
} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [{
			path: '/pages/user/login',
			name: 'login',
			meta: {
				title: 'login',
			},
		}, {
			path: '/pages/index/index',
			name: 'index',
			aliasPath: '/',
			meta: {
				title: 'index',
			}
		},
		{
			path: '/pages/index/orderDetail',
			name: 'orderDetail',
			meta: {
				title: 'orderDetail',
			},
		},
		{
			path: '/pages/film/filmDetail',
			name: 'filmDetail',
			meta: {
				title: 'filmDetail',
			},
		},
		{
			path: '/pages/index/personDetail',
			name: 'personDetail',
			meta: {
				title: 'personDetail',
			},
		},
		{
			path: '/pages/exhibition/exhibition',
			name: 'exhibition',
			meta: {
				title: 'exhibition',
			},
		},
		{
			path: '/pages/exhibition/exhibitionDetail',
			name: 'exhibitionDetail',
			meta: {
				title: 'exhibitionDetail',
			},
		},
		{
			path: '/pages/film/film',
			name: 'film',
			meta: {
				title: 'film',
			},
		},
		{
			path: '/pages/user/user',
			name: 'user',
			meta: {
				title: 'user',
			},
		}, {
			path: '/pages/user/myOrder',
			name: 'myOrder',
			meta: {
				title: 'myOrder',
			},
		}, {
			path: '/pages/user/myCollection',
			name: 'myCollection',
			meta: {
				title: 'myCollection',
			},
		}, {
			path: '/pages/user/myAppointment',
			name: 'myAppointment',
			meta: {
				title: 'myAppointment',
			},
		}, {
			path: '/pages/user/appointmentDetail',
			name: 'appointmentDetail',
			meta: {
				title: 'appointmentDetail',
			},
		}, {
			path: '/pages/user/myFilm',
			name: 'myFilm',
			meta: {
				title: 'myFilm',
			},
		}, {
			path: '/pages/user/newFilm',
			name: 'newFilm',
			meta: {
				title: 'newFilm',
			},
		}, {
			path: '/pages/user/info',
			name: 'info',
			meta: {
				title: 'info',
			},
		}, {
			path: '/pages/user/update',
			name: 'update',
			meta: {
				title: 'update',
			},
		}, {
			path: '/pages/user/orders/orderDetail',
			name: 'orderDetail',
			meta: {
				title: 'orderDetail',
			},
		}, {
			path: '/pages/user/orders/failDetail',
			name: 'failDetail',
			meta: {
				title: 'failDetail',
			},
		}, {
			path: '/pages/user/orders/successDetail',
			name: 'successDetail',
			meta: {
				title: 'successDetail',
			},
		}, {
			path: '/pages/user/orders/choose',
			name: 'choose',
			meta: {
				title: 'choose',
			},
		}, {
			path: '/pages/user/orders/successPost',
			name: 'successPost',
			meta: {
				title: 'successPost',
			},
		}, {
			path: '/pages/user/create',
			name: 'create',
			meta: {
				title: 'create',
			},
		}, {
			path: '/pages/user/changePass',
			name: 'changePass',
			meta: {
				title: 'changePass',
			},
		}, {
			path: '/pages/exhibition/exhibitionClose',
			name: 'exhibitionClose',
			meta: {
				title: 'exhibitionClose',
			},
		}, {
			path: '/pages/user/register',
			name: 'register',
			meta: {
				title: 'register',
			},
		}

	]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log('跳转结束')
})

export {
	router,
	RouterMount
}
