import Vue from 'vue'
import { set, toggle } from '@/utils/vuex'
import {postData, getData} from "../../../utils/helpers";

const state = () => ({
	// TODO: This is left here only for example data, remove it when everything is ready
	items: [
		{
			id: 11,
			name: 'Lorem',
			image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
			price: 40.10,
			isLunchOnly: false,
			weight: 50,
			category: {
				id: 0,
				name: 'Cuban'
			},
			description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
		},
	],
})

export default {
	state,
	getters: {
		getMenuByCategory: (state) => (id) => state.list.items.filter(el => id === el.category.id),
	},
	mutations: {
		ADD_ITEM: (state, payload) => state.list.items.push(payload),
		ADD_ITEMS: (state, payload) => state.list.items = payload,
		UPDATE_ITEM: (state, payload) => {
			let items = state.list.items
			let index = items.findIndex(el => el._id === payload.id)
			if (index !== -1) {
				Vue.set(items, index, payload)
			}
		},
		DELETE_LIST_ITEM: (state, id) => {
			let index = state.list.items.findIndex(el => el._id === id)
			if (index !== -1) {
				state.list.items.splice(index, 1)
			}
		},
	},
	actions: {
		addItem({commit}, payload) {
			commit('ADD_ITEM', payload)
		},
		addItems({commit}, payload) {
			commit('ADD_ITEMS', payload)
		},
		updateItem({commit}, payload) {
			commit('UPDATE_ITEM', payload)
		},
		fetchMenuItems({commit, rootState, state, dispatch}) {
			const { apiUrl, fetchMenuListPath, prodGet } = rootState.settings;
			const url = apiUrl + fetchMenuListPath + prodGet
			return getData(url)
					.then(data => data.json())
					.then(data => {
						if (data.success) {
							const items = data.result;
							commit('ADD_ITEMS', items)
						}
						return data
					})
		},
	}
}


