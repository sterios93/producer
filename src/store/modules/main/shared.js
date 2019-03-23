import { set, toggle } from '@/utils/vuex'

const state = () => ({

})

export default {
  state,
  mutations: {
    SET_NAME: (state, {payload, action}) => state[action].name = payload,
    SET_PICTURE: (state, {payload, action}) => state[action].picture = payload,
    SET_PICTURE_URL: (state, {payload, action}) => state[action].image = payload,
    SET_DESCRIPTION: (state, {payload, action}) => state[action].description = payload,
    SET_WEIGHT: (state, {payload, action}) => state[action].weight = payload,
    SET_PRICE: (state, {payload, action}) => state[action].price = payload,
    SET_CATEGORY: (state, {payload, action}) => {
      console.log(action)
      state[action].category = payload
    },
  },
  getters: {
    sumItemsPrice: (state) => (ids, action) => {
      return state[action].items
        .filter(item => ids.indexOf(item.id) !== -1)
        .reduce((sum, {price}) => sum + price, 0)
    }
  },
  actions: {
    saveItem({rootState, state, commit}, {action, payload}) {
      return undefined;
    },
    // TODO consider moving to 'shared' module
    setName: ({commit}, {payload, action}) => {commit('SET_NAME', {payload, action})},
    setPicture: ({commit}, {payload, action}) => commit('SET_PICTURE', {payload, action}),
    setPictureUrl: ({commit}, {payload, action}) => commit('SET_PICTURE_URL', {payload, action}),
    setDescription: ({commit}, {payload, action}) => commit('SET_DESCRIPTION', {payload, action}),
    setWeight: ({commit}, {payload, action}) => commit('SET_WEIGHT', {payload, action}),
    setPrice: ({commit}, {payload, action}) => commit('SET_PRICE', {payload, action}),
    setCategory: ({commit}, {payload, action}) => commit('SET_CATEGORY', {payload, action}),
  }
}


