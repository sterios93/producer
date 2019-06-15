import Vue from 'vue'
import { set, toggle } from '@/utils/vuex'
import { postData, getData } from "../../../utils/helpers";

const state = () => ({
  items: [],
})

export default {
  state,
  mutations: {
    ADD_ITEM: (state, payload) => state.list.items.push(payload),
    ADD_ITEMS: (state, payload) => state.list.items = payload,
    TOGGLE_ACTIVE_LIST_ITEM: (state, id) => {
      let item = state.list.items.find(el => el._id === id)
      if (item) {
        item.active = !item.active
      }
    },
    DELETE_LIST_ITEM: (state, id) => {
      let index = state.list.items.findIndex(el => el._id === id)
      if (index !== -1) {
        state.list.items.splice(index, 1)
      }
    },
    UPDATE_ITEM: (state, payload) => {
      let items = state.list.items
      let index = items.findIndex(el => el._id === payload._id)
      if (index !== -1) {
        Vue.set(items, index, payload)
      }
    }
  },
  getters: {},
  actions: {
    addItem({commit}, payload) {
      commit('ADD_ITEM', payload)
    },
    updateItem({commit}, payload) {
      commit('UPDATE_ITEM', payload)
    },
    fetchSpecialOffers({ commit, rootState, state, dispatch }) {
      const { apiUrl, fetchSpecialOffersPath, prodGet } = rootState.settings;
      const url = apiUrl + fetchSpecialOffersPath + prodGet
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


