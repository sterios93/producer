import { set, toggle } from '@/utils/vuex'
let config = {
  prodUrl: '...',
  devUrl: '...'
}

export default {
  namespaced: true,
  state: {
    apiUrl: config.prodUrl + 'api/v1/',
    url: config.prodUrl
  },
  mutations: {},
  getters: {},
  actions: {}
}
