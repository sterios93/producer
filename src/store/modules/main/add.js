import {set, toggle} from '@/utils/vuex'

const state = () => ({
	name: '',
	picture: '',
	description: '',
	weight: '',
	price: '',
	category: '' // TODO consider array or single item
})

export default {
	state,
	mutations: {
		SET_NAME: (state, payload) => state.add.name = payload,
		SET_PICTURE: (state, payload) => state.add.picture = payload,
		SET_DESCRIPTION: (state, payload) => state.add.description = payload,
		SET_WEIGHT: (state, payload) => state.add.weight = payload,
		SET_PRICE: (state, payload) => state.add.price = payload,
		SET_CATEGORY: (state, payload) => state.add.category = payload,
	},
	getters: {},
	actions: {
		// TODO consider moving to 'shared' module
		setName: ({commit}, payload) => commit('SET_NAME', payload),
		setPicture: ({commit}, payload) => commit('SET_PICTURE', payload),
		setDescription: ({commit}, payload) => commit('SET_DESCRIPTION', payload),
		setWeight: ({commit}, payload) => commit('SET_WEIGHT', payload),
		setPrice: ({commit}, payload) => commit('SET_PRICE', payload),
		setCategory: ({commit}, payload) => commit('SET_CATEGORY', payload),
	}
}