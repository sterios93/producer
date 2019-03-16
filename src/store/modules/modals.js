import { set, toggle } from '@/utils/vuex'

export default {
	namespaced: true,
	state: {
		menu: {
			main: {
				visibility: false,
				fullscreen: false
			},
			special: {
				visibility: false,
				fullscreen: false
			},
			lunch	: {
				visibility: false,
				fullscreen: false
			},
		}
	},
	mutations: {
		SET_MENU_MODAL_VISIBILITY: (state, {key, value}) => {
			state.menu[key].visibility = value
		},
		SET_FULLSCREEN: (state, {key, value}) => {
			state.menu[key].fullscreen = value
		}
	},
	getters: {},
	actions: {
		setMenuModalVisibility({commit}, payload) {
			commit('SET_MENU_MODAL_VISIBILITY', payload)
		},
		setFullscreen({commit}, payload) {
			commit('SET_FULLSCREEN', payload)
		}
	}
}
