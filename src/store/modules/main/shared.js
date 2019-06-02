import { set, toggle } from '@/utils/vuex'
import { postData } from "../../../utils/helpers";

const state = () => ({

})

export default {
  state,
  mutations: {
    SET_ITEM: (state, {payload, action}) => state[action] = payload,
    SET_NAME: (state, {payload, action}) => state[action].name = payload,
    SET_PRICE: (state, {payload, action}) => state[action].price = payload,
    SET_WEIGHT: (state, {payload, action}) => state[action].weight = payload,
    SET_PICTURE: (state, {payload, action}) => state[action].picture = payload,
    SET_CATEGORY: (state, {payload, action}) => state[action].category = payload,
    TOGGLE_ACTIVE: (state, {payload, action}) => state[action].isActive = !state[action].isActive,
    SET_PICTURE_URL: (state, {payload, action}) => state[action].image = payload,
    SET_DESCRIPTION: (state, {payload, action}) => state[action].description = payload,
  },
  getters: {
    sumItemsPrice: (state) => (ids, action) => {
      return state[action].items
        .filter(item => ids.indexOf(item.id) !== -1)
        .reduce((sum, {price}) => sum + price, 0)
    }
  },
  actions: {
    reset: ({commit}, action) => commit(`RESET_${action.toUpperCase()}`),
    setItem: ({commit}, {payload, action}) => commit('SET_ITEM', {payload, action}),
    setName: ({commit}, {payload, action}) => {commit('SET_NAME', {payload, action})},
    setPrice: ({commit}, {payload, action}) => commit('SET_PRICE', {payload, action}),
    setWeight: ({commit}, {payload, action}) => commit('SET_WEIGHT', {payload, action}),
    setPicture: ({commit}, {payload, action}) => commit('SET_PICTURE', {payload, action}),
    setCategory: ({commit}, {payload, action}) => commit('SET_CATEGORY', {payload, action}),
    toggleActive: ({commit}, {payload, action}) => commit('TOGGLE_ACTIVE', {payload, action}),
    setPictureUrl: ({commit}, {payload, action}) => commit('SET_PICTURE_URL', {payload, action}),
    setDescription: ({commit}, {payload, action}) => commit('SET_DESCRIPTION', {payload, action}),
    saveItem({rootState, state, commit, dispatch}, {action}) {
        const data = state[action];
        const payload = {
			name: data.name,
			price: new Number(data.price).toFixed(2),
			category: data.category,
			  weight: parseInt(data.weight, 10),
			  // TODO: wait for the BE to create another request for adding image.
          	img: data.image,
          	description: data.description
        };
		const { apiUrl, createMenuItemPath, prodGet, prodPost } = rootState.settings;
		if (action === 'add') {
			const url = apiUrl + createMenuItemPath + prodPost;
			return postData({payload, url})
					.then(data => data.json())
					.then(data => {
						if (data.success) {
							dispatch('addItem', payload);
							// TODO: do the request for adding image.
						}
						return data
					})
		}
        //     // dispatch('addItem', data)
        //   } else if (action === 'edit') {
        //     dispatch('updateItem', data)
        //   }
    },
    deleteItem: ({commit}, {payload}) => {
      return new Promise(resolve => {
      
        let data = {
          success: true,
          message: 'Internal Error'
        }
      
        // postData().then((data) => {
        setTimeout(() => {
          if (data.success) {
            commit('DELETE_LIST_ITEM', payload)
          }
          resolve(data)
        }, 2000)
      })
    },
  }
}


