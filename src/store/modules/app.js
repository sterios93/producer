import { set, toggle } from '@/utils/vuex'
import { postData, getData } from '../../utils/helpers'

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
    sessionCheck({ rootState }, payload) {
      let url = rootState.settings.apiUrl + rootState.settings.sessionCheck + rootState.settings.prodGet

      return getData(url)
    },
  	uploadImage ({ rootState }, payload) {
      let action = payload.action === 'add' ? 'add' : 'update'
      console.log(action, payload);
      
      let imagePath = rootState.settings.imagePath.replace('{type}', payload.type).replace('{action}', action)

      let parameter = payload.type === 'menu/items' ? 'itemId' : 'offerId'
      let url = `${(rootState.settings.apiUrl + imagePath + rootState.settings.prodGet)}${payload.action === 'add' ? '' : `&${parameter}=${payload.id}`}`

      return postData({
        hasHeaders: false,
			  url,
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
