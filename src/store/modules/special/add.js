import {set, toggle} from '@/utils/vuex'

const stateBuilder = () => ({
  name: '',
  picture: null,
  image: '',
  description: '',
  price: 0,
  items: [],
  mainItems: [],
  discount: 10,
  isActive: true,
  schedule: null,
  startDate: null,
  endDate: null
})

export default {
  state: stateBuilder,
  mutations: {
    RESET_ADD: (state) => state.add = stateBuilder()
  
  },
  getters: {
  
  },
  actions: {
  
  }
}