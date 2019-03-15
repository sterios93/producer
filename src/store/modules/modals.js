import { set, toggle } from '@/utils/vuex'

export default {
	namespaced: true,
	state: {
		menu: {
			main: {
				visibility: false
			},
			special: {
				visibility: false
			},
			lunch	: {
				visibility: false
			},
		}
	},
	mutations: {},
	getters: {},
	actions: {}
}
