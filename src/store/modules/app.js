import { set, toggle } from '@/utils/vuex'
import { postData } from '../../utils/helpers'

export default {
  namespaced: true,
  state: {
    icons: true,
    drawer: true,
    toolbar: true,
    color: 'success',
    image: './img/drawer.jpg',
    user: null
  },
  mutations: {
    SET_DRAWER: set('drawer'),
    SET_IMAGE: set('image'),
    SET_COLOR: set('color'),
    TOGGLE_DRAWER: toggle('drawer'),
    TOGGLE_TOOLBAR: toggle('toolbar')
  },
  getters: {},
  actions: {
  	uploadImage ({ rootState }, payload) {
  		return postData({
			  url: rootState.settings.apiUrl + rootState.settings.addImage.replace('{type}', payload.type) + rootState.settings.prodGet,
		    formData: payload.data,
		  })
	  },
    setDrawer ({ commit }, drawer) {
      commit('SET_DRAWER', drawer)
    },
    setImage ({ commit }, image) {
      commit('SET_IMAGE', image)
    },
    setColor ({ commit }, color) {
      commit('SET_COLOR', color)
    },
    toggleDrawer ({ commit }, drawer) {
      commit('TOGGLE_DRAWER', drawer)
    },
    toggleToolbar ({ commit }, toolbar) {
      commit('TOGGLE_TOOLBAR', toolbar)
    }
  }
}
