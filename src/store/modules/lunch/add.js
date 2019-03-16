import {set, toggle} from '@/utils/vuex'

const state = () => ({
  items: [],
  discount: 10,
  schedule: null,
  startDate: null,
  endDate: null
})

export default {
  state,
  mutations: {
    SET_DISCOUNT: (state, payload) => state.add.discount = payload,
    SET_ITEMS: (state, payload) => state.add.items = payload,
    SET_SCHEDULE: (state, payload) => state.add.schedule = payload,
    SET_START_DATE: (state, payload) => state.add.startDate = payload,
    SET_END_DATE: (state, payload) => state.add.endDate = payload,
  },
  getters: {},
  actions: {
    // TODO consider moving to 'shared' module
    setDiscount: ({commit}, payload) => commit('SET_DISCOUNT', payload),
    setItems: ({commit}, payload) => commit('SET_ITEMS', payload),
    setSchedule: ({commit}, payload) => commit('SET_SCHEDULE', payload),
    setStartDate: ({commit}, payload) => commit('SET_START_DATE', payload),
    setEndDate: ({commit}, payload) => commit('SET_END_DATE', payload),
  }
}