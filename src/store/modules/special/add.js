import {set, toggle} from '@/utils/vuex'

const state = () => ({
  name: '',
  picture: null,
  pictureUrl: '',
  description: '',
  price: 0,
  items: [],
  discount: 10,
  schedule: null,
  startDate: null,
  endDate: null
})

export default {
  state,
  mutations: {
    SET_NAME: (state, payload) => state.add.name = payload,
    SET_PICTURE: (state, payload) => state.add.picture = payload,
    SET_PICTURE_URL: (state, payload) => state.add.pictureUrl = payload,
    SET_DESCRIPTION: (state, payload) => state.add.description = payload,
    SET_DISCOUNT: (state, payload) => state.add.discount = payload,
    SET_ITEMS: (state, payload) => state.add.items = payload,
    SET_PRICE: (state, payload) => state.add.price = payload,
    SET_SCHEDULE: (state, payload) => state.add.schedule = payload,
    SET_START_DATE: (state, payload) => state.add.startDate = payload,
    SET_END_DATE: (state, payload) => state.add.endDate = payload,
  },
  getters: {
    getPrice: (state) => {
      const original = state.add.price
      const discount = original * (state.add.discount / 100)
      return original - discount
    }
  },
  actions: {
    // TODO consider moving to 'shared' module
    setName: ({commit}, payload) => commit('SET_NAME', payload),
    setPicture: ({commit}, payload) => commit('SET_PICTURE', payload),
    setPictureUrl: ({commit}, payload) => commit('SET_PICTURE_URL', payload),
    setDescription: ({commit}, payload) => commit('SET_DESCRIPTION', payload),
    setDiscount: ({commit}, payload) => commit('SET_DISCOUNT', payload),
    setPrice: ({commit}, payload) => commit('SET_PRICE', payload),
    setSchedule: ({commit}, payload) => commit('SET_SCHEDULE', payload),
    setStartDate: ({commit}, payload) => commit('SET_START_DATE', payload),
    setEndDate: ({commit}, payload) => commit('SET_END_DATE', payload),
    setItems: ({commit, rootGetters}, payload) => {
      const sum = rootGetters['main/sumItemsPrice'](payload, 'list')
      commit('SET_PRICE', sum)
      commit('SET_ITEMS', payload)
    },
  
  }
}