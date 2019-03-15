import { set, toggle } from '@/utils/vuex'

const state = () => ({
	item: {
		picture: '',
		name: '',
		description: '',
		weight: '',
		price: '',
		category: ''
	},
})

export default {
  state,
  mutations: {
  	SET_VISIBILITY: set('visibility'),
  	SET_ITEM: (state, payload) => {
  		state.item = {
  			...state.item,
				...payload
			}
		}
	},
  getters: {},
  actions: {
  	setItem ({commit}, payload) {
  		commit('SET_ITEM', payload)
		},
		postData({rootState, state, commit}, {action, payload}) {
			return undefined;
		}
	}
}
