import edit from './edit'
import list from './list'

export default {
  namespaced: true,
  state: {
    list: list.state(),
    edit: edit.state()
  },
  mutations: {
    ...edit.mutations,
    ...list.mutations
  },
  getters: {
    ...edit.getters,
    ...list.getters
  },
  actions: {
    ...edit.actions,
    ...list.actions
  }
}
