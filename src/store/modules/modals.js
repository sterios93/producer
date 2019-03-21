import { set, toggle } from '@/utils/vuex'

export default {
	namespaced: true,
	state: {
		menu: {
			main: {
				visibility: false,
				fullscreen: false,
				action: ''
			},
			special: {
				visibility: false,
				fullscreen: false,
				action: ''
			},
			lunch	: {
				visibility: false,
				fullscreen: false,
				action: ''
			},
		}
	},
	mutations: {
		SET_MENU_MODAL_VISIBILITY: (state, {key, value, action}) => {
			state.menu[key].visibility = value
			state.menu[key].action = action
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
