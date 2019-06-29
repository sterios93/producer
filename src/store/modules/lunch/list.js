import Vue from 'vue'
import { set, toggle } from '@/utils/vuex'
import { getData, changeDateFormat } from '../../../utils/helpers'

const state = () => ({
  items: []
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
    addItem ({ commit }, payload) {
      commit('ADD_ITEM', payload)
    },
    updateItem ({ commit }, payload) {
      commit('UPDATE_ITEM', payload)
    },
    fetchLunchItems ({ commit, rootState, state, dispatch }) {
      const { apiUrl, fetchLunchListPath, prodGet } = rootState.settings
      const url = apiUrl + fetchLunchListPath + prodGet
      return getData(url)
        .then(data => {
          if (data.success) {
            const items = data.result
            items.forEach(item => {
              item.timeStart = changeDateFormat(item.timeStart, false)
              item.timeEnd = changeDateFormat(item.timeEnd, false)
            })
            commit('ADD_ITEMS', items)
          }
          return data
        })
    }
  }
}
