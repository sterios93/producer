import { set, toggle } from '@/utils/vuex'

const state = () => ({
  id: null,
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
  
  }
}


