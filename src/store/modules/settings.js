import { set, toggle } from '@/utils/vuex'
let config = {
	prodUrl: 'http://212.227.193.201/api/v1/',
	devUrl: 'http://212.227.193.201/api/v1/',
	createPath: 'producer/create',
	loginPath: 'producer/login',
	logoutPath: 'producer/logout',
	fetchPath: 'producer/profile/fetch',
	fetchMenuListPath: 'producer/menu/items/list',
	createMenuItemPath: 'producer/menu/item/create',
	updateMenuItemPath: 'producer/menu/item/update',

	fetchLunchListPath: 'producer/offers/lunch/list',
	createLunchtemPath: 'producer/offers/lunch/create',
	updateLunchItemPath: 'producer/offers/lunch/update',

	fetchSpecialOffersPath: 'producer/offers/special/list',
	fetchSpecialOfferPath: 'offers/fetch/',
	createSpecialOfferPath: 'producer/offers/special/create',
	createCategoryPath: 'producer/menu/category/create',
	listCateoriesPath: 'producer/menu/categories/list',
	deleteCategoryPath: 'producer/menu/category/delete',
	addImage: 'producer/menu/{type}/image/add',
	basePath: './',
	prodPost: '?prod=true',
	prodGet: '?prod=true',
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
		listCateoriesPath: config.listCateoriesPath,
		deleteCategoryPath: config.deleteCategoryPath,
		createMenuItemPath: config.createMenuItemPath,
		updateMenuItemPath: config.updateMenuItemPath,
		fetchMenuListPath: config.fetchMenuListPath,
		fetchSpecialOffersPath: config.fetchSpecialOffersPath,
		fetchSpecialOfferPath: config.fetchSpecialOfferPath,
		createSpecialOfferPath: config.createSpecialOfferPath,
		addImage: config.addImage,
		fetchLunchListPath: config.fetchLunchListPath,
		createLunchtemPath: config.createLunchtemPath,
		updateLunchItemPath: config.updateLunchItemPath,
  },
  mutations: {},
  getters: {},
  actions: {}
}
