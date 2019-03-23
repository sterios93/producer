import { set, toggle } from '@/utils/vuex'

const state = () => ({
  name: '',
  picture: null,
  image: '',
  description: '',
  price: 0,
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
        name,
        picture,
        image,
        description,
        discount,
        items,
        price,
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
      
      commit('SET_NAME', {payload: name, action: 'edit'})
      commit('SET_PICTURE', {payload: picture, action: 'edit'})
      commit('SET_PICTURE_URL', {payload: image, action: 'edit'})
      commit('SET_DESCRIPTION', {payload: description, action: 'edit'})
      commit('SET_DISCOUNT', {payload: discount, action: 'edit'})
      commit('SET_ITEMS', {payload: items, action: 'edit'})
      commit('SET_PRICE', {payload: price, action: 'edit'})
      commit('SET_SCHEDULE', {payload: schedule, action: 'edit'})
      commit('SET_START_DATE', {payload: startDate, action: 'edit'})
      commit('SET_END_DATE', {payload: endDate, action: 'edit'})
    }
  }
}


