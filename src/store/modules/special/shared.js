import { set, toggle } from '@/utils/vuex'

const state = () => ({

})

export default {
  state,
  mutations: {
    SET_NAME: (state, {payload, action}) => state[action].name = payload,
    SET_ITEMS: (state, {payload, action}) => state[action].items = payload,
    SET_PRICE: (state, {payload, action}) => state[action].price = payload,
    SET_PICTURE: (state, {payload, action}) => state[action].picture = payload,
    SET_DISCOUNT: (state, {payload, action}) => state[action].discount = payload,
    SET_SCHEDULE: (state, {payload, action}) => state[action].schedule = payload,
    SET_END_DATE: (state, {payload, action}) => state[action].endDate = payload,
    SET_START_DATE: (state, {payload, action}) => state[action].startDate = payload,
    SET_PICTURE_URL: (state, {payload, action}) => state[action].image = payload,
    SET_DESCRIPTION: (state, {payload, action}) => state[action].description = payload,
  },
  getters: {
    sumItemsPrice: (state) => (action) => state[action].items.reduce((sum, el) => sum + el.price, 0),
    getPrice: (state) => (action) => {
      const original = state[action].price
      const discount = original * (state[action].discount / 100)
      return original - discount
    }
  },
  actions: {
    setItems: ({commit, getters}, {payload, action}) => {
      commit('SET_ITEMS', {payload, action})
      const sum = getters['sumItemsPrice'](action)
      commit('SET_PRICE', {payload: sum, action})
    },
    saveItem({rootState, state, commit}, {action, payload}) {
      return undefined;
    },
    setName: ({commit}, {payload, action}) => commit('SET_NAME', {payload, action}),
    setPrice: ({commit}, {payload, action}) => commit('SET_PRICE', {payload, action}),
    setEndDate: ({commit}, {payload, action}) => commit('SET_END_DATE', {payload, action}),
    setPicture: ({commit}, {payload, action}) => commit('SET_PICTURE', {payload, action}),
    setDiscount: ({commit}, {payload, action}) => commit('SET_DISCOUNT', {payload, action}),
    setSchedule: ({commit}, {payload, action}) => commit('SET_SCHEDULE', {payload, action}),
    setStartDate: ({commit}, {payload, action}) => commit('SET_START_DATE', {payload, action}),
    setPictureUrl: ({commit}, {payload, action}) => commit('SET_PICTURE_URL', {payload, action}),
    setDescription: ({commit}, {payload, action}) => commit('SET_DESCRIPTION', {payload, action}),
  }
}


