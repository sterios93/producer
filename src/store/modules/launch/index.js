import { set, toggle } from '@/utils/vuex'
import add from './add'
import view from './view'
import list from './list'
import shared from './shared'

export default {
  namespaced: true,
  state: {
    add: add.state(),
    view: view.state(),
    list: list.state(),
    shared: shared.state(),
  },
  mutations: {
    ...add.mutations,
    ...view.mutations,
    ...list.mutations,
    ...shared.mutations,
  },
  getters: {
    ...add.getters,
    ...view.getters,
    ...list.getters,
    ...shared.getters,
  },
  actions: {
    ...add.actions,
    ...view.actions,
    ...list.actions,
    ...shared.actions,
  }
}
