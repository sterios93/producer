import { set, toggle } from '@/utils/vuex'

const state = () => ({

})

export default {
  state,
  mutations: {},
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
    }
  }
}


