import {set, toggle} from '@/utils/vuex'

const stateBuilder = () => ({
  items: [],
  discount: 10,
  schedule: null,
  startDate: null,
  endDate: null
})

export default {
  state: stateBuilder,
  mutations: {
    RESET_ADD: (state) => state.add = stateBuilder()
  },
  getters: {},
  actions: {}
}