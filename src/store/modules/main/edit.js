import { set, toggle } from '@/utils/vuex'

const state = () => ({
  name: '',
  picture: null,
  image: '',
  description: '',
  weight: '',
  price: 0,
  category: '' // TODO consider array or single item
})

export default {
  state,
  mutations: {},
  getters: {},
  actions: {
    setEditValues ({commit}, payload) {
      let {
        name,
        picture,
        pictureUrl,
        description,
        weight,
        price,
        category,
      } = payload
      
      commit('SET_NAME', {payload: name, action: 'edit'})
      commit('SET_PICTURE', {payload: picture, action: 'edit'})
      commit('SET_PICTURE_URL', {payload: pictureUrl, action: 'edit'})
      commit('SET_DESCRIPTION', {payload: description, action: 'edit'})
      commit('SET_WEIGHT', {payload: weight, action: 'edit'})
      commit('SET_PRICE', {payload: price, action: 'edit'})
      commit('SET_CATEGORY', {payload: category, action: 'edit'})
    }
  }
}


