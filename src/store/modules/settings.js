import { set, toggle } from '@/utils/vuex'
let config = {
	prodUrl: 'http://212.227.193.201/api/v1/',
	devUrl: 'http://212.227.193.201/api/v1/',
	createPath: 'user/producer/create',
	loginPath: 'user/producer/login',
	logoutPath: 'user/producer/logout',
	fetchPath: 'user/producer/fetch',
	createCategoryPath: 'menu/category/create',
	basePath: './',
	prodPost: '?prod=true',
	prodGet: '&prod=true',
}

export default {
	namespaced: true,
	state: {
		apiUrl: config.devUrl,
		url: config.devUrl,
		basePath: config.basePath,
		prodPost: config.prodPost,
		prodGet: config.prodGet,
		createPath: config.createPath,
		loginPath: config.loginPath,
		logoutPath: config.logoutPath,
		fetchPath: config.fetchPath,
		createCategoryPath: config.createCategoryPath,
  },
  mutations: {},
  getters: {},
  actions: {}
}
