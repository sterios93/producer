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
	mutations: {
		SET_MENU_MODAL_VISIBILITY: (state, {key, value}) => {
			state.menu[key].visibility = value
		}
	},
	getters: {},
	actions: {
		setMenuModalVisibility({commit}, payload) {
			commit('SET_MENU_MODAL_VISIBILITY', payload)
		}
	}
}
