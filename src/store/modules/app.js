import { set, toggle } from '@/utils/vuex'

export default {
  namespaced: true,
  state: {
    drawer: null,
    color: 'success',
    image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg',
    user: null,
  },
  mutations: {
    SET_DRAWER: set('drawer'),
    SET_IMAGE: set('image'),
    SET_COLOR: set('color'),
    TOGGLE_DRAWER: toggle('drawer')
  },
  getters: {},
  actions: {
    setDrawer({commit}, drawer) {
      commit('SET_DRAWER', drawer)
    },
    setImage({commit}, image) {
      commit('SET_IMAGE', image)
    },
    setColor({commit}, color) {
      commit('SET_COLOR', color)
    },
    toggleDrawer({commit}, drawer) {
      commit('TOGGLE_DRAWER', drawer)
    },
  }
}
