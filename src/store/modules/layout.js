import { set, toggle } from '@/utils/vuex'

export default {
  namespaced: true,
  state: {
    responsive: false,
  },
  mutations: {
    SET_RESPONSIVE: set('responsive'),
  },
  getters: {},
  actions: {
    setResponsive({commit}, payload) {
      commit('SET_RESPONSIVE', payload)
    },
  }
}
