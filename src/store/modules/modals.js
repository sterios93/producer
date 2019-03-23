import { set, toggle } from '@/utils/vuex'

export default {
	namespaced: true,
	state: {
		category: {
			visibility: false,
			color: 'teal darken-1',
		},
		menu: {
			main: {
				visibility: false,
				fullscreen: false,
				action: 'add',
				color: 'blue-grey lighten-2',
			},
			special: {
				visibility: false,
				fullscreen: false,
				action: 'add',
				color: 'blue-grey lighten-1',
			},
			lunch	: {
				visibility: false,
				fullscreen: false,
				action: 'add',
				color: 'teal darken-1',
			},
		}
	},
	mutations: {
		SET_FULLSCREEN: (state, {key, value}) => {
			state.menu[key].fullscreen = value
		},
		SET_MODAL_VISIBILITY: (state, {key, value}) => {
			state[key].visibility = value
		},
		SET_MENU_MODAL_VISIBILITY: (state, {key, value, action = 'add'}) => {
			state.menu[key].visibility = value
			state.menu[key].action = action
		}
	},
	getters: {},
	actions: {
		setFullscreen({commit}, payload) {
			commit('SET_FULLSCREEN', payload)
		},
		setModalVisibility({commit}, payload) {
			commit('SET_MODAL_VISIBILITY', payload)
		},
		setMenuModalVisibility({commit}, payload) {
			commit('SET_MENU_MODAL_VISIBILITY', payload)
		}
	}
}
