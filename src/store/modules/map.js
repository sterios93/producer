import { set, toggle } from '@/utils/vuex'

export default {
  namespaced: true,
  state: {
    token: '',
    style: '',
    geolocation: '',
    markers: []
  },
  mutations: {
    SET_TOKEN: set('token'),
    SET_STYLE: set('style'),
    SET_GEOLOCATION: set('geolocation'),
    SET_MARKERS: set('markers')
  },
  getters: {},
  actions: {
    setToken ({ commit }, payload) {
      commit('SET_TOKEN', payload)
    },
    setStyle ({ commit }, payload) {
      commit('SET_STYLE', payload)
    },
    setGeolocation ({ commit }, payload) {
      commit('SET_GEOLOCATION', payload)
    },
    setMarkers ({ commit }, payload) {
      commit('SET_MARKERS', payload)
    }
  }
}
