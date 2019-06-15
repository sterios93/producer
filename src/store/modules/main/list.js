import Vue from 'vue'
import { set, toggle } from '@/utils/vuex'
import { postData, getData } from '../../../utils/helpers'

const state = () => ({
  // TODO: This is left here only for example data, remove it when everything is ready
  items: [

  ]
})

export default {
  state,
  getters: {
    getMenuByCategory: (state) => (name) => state.list.items.filter(el => name === el.category)
  },
  mutations: {
    ADD_ITEM: (state, payload) => state.list.items.push(payload),
    ADD_ITEMS: (state, payload) => state.list.items = payload,
    UPDATE_ITEM: (state, payload) => {
      let items = state.list.items
      let index = items.findIndex(el => el._id === payload._id)
      if (index !== -1) {
        Vue.set(items, index, payload)
      }
    },
    DELETE_LIST_ITEM: (state, id) => {
      let index = state.list.items.findIndex(el => el._id === id)
      if (index !== -1) {
        state.list.items.splice(index, 1)
      }
    }
  },
  actions: {
    addItem ({ commit }, payload) {
      commit('ADD_ITEM', payload)
    },
    addItems ({ commit }, payload) {
      commit('ADD_ITEMS', payload)
    },
    updateItem ({ commit }, payload) {
      commit('UPDATE_ITEM', payload)
    },
    fetchMenuItems ({ commit, rootState, state, dispatch }) {
      const { apiUrl, fetchMenuListPath, prodGet } = rootState.settings
      const url = apiUrl + fetchMenuListPath + prodGet
      return getData(url)
        .then(data => data.json())
        .then(data => {
          if (data.success) {
            const items = data.result
            commit('ADD_ITEMS', items)
          }
          return data
        })
    }
  }
}
