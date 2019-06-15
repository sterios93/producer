import { set, toggle } from '@/utils/vuex'

const stateBuilder = () => ({
  name: '',
  picture: null,
  image: '',
  description: '',
  weight: '',
  price: 0,
  lunchOnly: 0,
  category: {} // TODO consider array or single item
})

export default {
  state: stateBuilder,
  mutations: {
    RESET_ADD: (state) => state.add = stateBuilder()
  },
  getters: {},
  actions: {
  }
}
