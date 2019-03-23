import { set, toggle } from '@/utils/vuex'

const state = () => ({
  items: [],
  discount: 10,
  schedule: null,
  startDate: {
    date: '2019-05-10',
    time: '16:00',
    visible: false,
  },
  endDate: {
    date: '2019-10-10',
    time: '12:00',
    visible: false,
  }
})

export default {
  state,
  mutations: {},
  getters: {},
  actions: {
    setEditValues ({commit}, {payload}) {
      let {
        items,
        discount,
        schedule,
        startDate,
        endDate,
      } = payload
  
      startDate = startDate.split(' ')
      startDate = {
        date: startDate[0],
        time: startDate[1],
        visible: true
      }
  
      endDate = endDate.split(' ')
      endDate = {
        date: endDate[0],
        time: endDate[1],
        visible: true
      }
  
      commit('SET_ITEMS', {payload: items, action: 'edit'})
      commit('SET_DISCOUNT', {payload: discount, action: 'edit'})
      commit('SET_SCHEDULE', {payload: schedule, action: 'edit'})
      commit('SET_END_DATE', {payload: endDate, action: 'edit'})
      commit('SET_START_DATE', {payload: startDate, action: 'edit'})
    }
  }
}


