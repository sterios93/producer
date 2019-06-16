import { set, toggle } from '@/utils/vuex'
import { postData, getData } from '../../../utils/helpers'
import Vue from 'vue'

const state = () => ({
  mainItems: [],
  lunchOnlyItems: []
})

export default {
  state,
  mutations: {
    SET_ITEM: (state, { payload, action }) => state[action] = payload,
    SET_NAME: (state, { payload, action }) => state[action].name = payload,
    SET_PRICE: (state, { payload, action }) => state[action].price = payload,
    SET_WEIGHT: (state, { payload, action }) => state[action].weight = payload,
    SET_PICTURE: (state, { payload, action }) => state[action].picture = payload,
    SET_CATEGORY: (state, { payload, action }) => state[action].category = payload,
    TOGGLE_ACTIVE: (state, { payload, action }) => state[action].active = !state[action].active,
    SET_PICTURE_URL: (state, { payload, action }) => state[action].image = payload,
    SET_DESCRIPTION: (state, { payload, action }) => state[action].description = payload,
    TOGGLE_LUNCH_ONLY: (state, { payload, action }) => state[action].lunchOnly = payload,
    SET_MAIN_ITEMS: (state, { payload, action }) => Vue.set(state.shared, 'mainItems', payload),
    SET_LUNCH_ONlY_ITEMS: (state, { payload, action }) => Vue.set(state.shared, 'lunchOnlyItems', payload)
  },
  getters: {
    sumItemsPrice: (state) => (ids, action) => {
      return state[action].items
        .filter(item => ids.indexOf(item.id) !== -1)
        .reduce((sum, { price }) => sum + price, 0)
    }
  },
  actions: {
    reset: ({ commit }, action) => commit(`RESET_${action.toUpperCase()}`),
    setItem: ({ commit }, { payload, action }) => commit('SET_ITEM', { payload, action }),
    setName: ({ commit }, { payload, action }) => { commit('SET_NAME', { payload, action }) },
    setPrice: ({ commit }, { payload, action }) => commit('SET_PRICE', { payload, action }),
    setWeight: ({ commit }, { payload, action }) => commit('SET_WEIGHT', { payload, action }),
    setPicture: ({ commit }, { payload, action }) => commit('SET_PICTURE', { payload, action }),
    setCategory: ({ commit }, { payload, action }) => commit('SET_CATEGORY', { payload, action }),
    toggleActive: ({ commit }, { payload, action }) => commit('TOGGLE_ACTIVE', { payload, action }),
    setPictureUrl: ({ commit }, { payload, action }) => commit('SET_PICTURE_URL', { payload, action }),
    setDescription: ({ commit }, { payload, action }) => commit('SET_DESCRIPTION', { payload, action }),
    toggleLunchOnly: ({ commit }, { payload, action }) => commit('TOGGLE_LUNCH_ONLY', { payload, action }),
    fetchAvailableLunchOnlyItems: ({ rootState, commit }, { action }) => {
      const { apiUrl, getAvailableLunchOnlyItemsPath, prodGet } = rootState.settings
      const url = apiUrl + getAvailableLunchOnlyItemsPath + prodGet

      return getData(url)
        .then((data) => {
          if (data.success) {
            commit('SET_LUNCH_ONlY_ITEMS', {
              payload: data.result,
              action
            })
          }
        })
    },
    fetchAvailableItems: ({ rootState, commit }, { action }) => {
      const { apiUrl, getAvailableMainItemsPath, prodGet } = rootState.settings
      const url = apiUrl + getAvailableMainItemsPath + prodGet

      return getData(url)
        .then((data) => {
          if (data.success) {
            commit('SET_MAIN_ITEMS', {
              payload: data.result,
              action
            })
          }
        })
    },

    saveItem ({ rootState, state, commit, dispatch }, { action }) {
      const data = state[action]

      const {
        apiUrl,
        createMenuItemPath,
        updateMenuItemPath,
        prodPost
      } = rootState.settings

      const payload = {
        id: data._id,
        name: data.name,
        price: new Number(data.price).toFixed(2),
        category: data.category,
        weight: parseInt(data.weight, 10),
        lunchOnly: data.lunchOnly ? 1 : 0,
        description: data.description
      }

      const url = apiUrl + (action === 'add' ? createMenuItemPath : updateMenuItemPath) + prodPost
      return postData({ payload, url })
        .then(data => {
          if (data.success) {
		          if (action === 'add') {
              dispatch('addItem', data.result)
          		} else if (action === 'edit') {
              dispatch('updateItem', data.result)
            }
          }
          return data
        })
    },
    deleteItem: ({ commit }, { payload }) => {
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
    }
  }
}
