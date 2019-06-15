import { set, toggle } from '@/utils/vuex'

const stateBuilder = () => ({
  name: '',
  picture: null,
  image: '',
  description: '',
  price: 0,
  items: [],
  discount: 10,
  active: true,
  schedule: null,
  timeStart: null,
  timeEnd: null
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
