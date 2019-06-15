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
  isActive: true,
  schedule: null,
  timeStart: null,
  timeEnd: null
})

export default {
  state,
  mutations: {},
  getters: {},
  actions: {
  
  }
}


