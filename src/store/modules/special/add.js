import {set, toggle} from '@/utils/vuex'

const state = () => ({
  name: '',
  picture: '',
  description: '',
  weight: '',
  price: '',
  category: ''
})

export default {
  state,
  mutations: {
    SET_NAME: (state) => state.add.name,
    SET_PICTURE: (state) => state.add.picture,
    SET_DESCRIPTION: (state) => state.add.description,
    SET_WEIGHT: (state) => state.add.weight,
    SET_PRICE: (state) => state.add.price,
    SET_CATEGORY: (state) => state.add.category,
  },
  getters: {},
  actions: {
    setName: ({commit}, payload) => commit('SET_NAME', payload),
    setPicture: ({commit}, payload) => commit('SET_PICTURE', payload),
    setDescription: ({commit}, payload) => commit('SET_DESCRIPTION', payload),
    setWeight: ({commit}, payload) => commit('SET_WEIGHT', payload),
    setPrice: ({commit}, payload) => commit('SET_PRICE', payload),
    setCategory: ({commit}, payload) => commit('SET_CATEGORY', payload),
  }
}