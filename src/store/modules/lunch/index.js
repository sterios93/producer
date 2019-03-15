import { set, toggle } from '@/utils/vuex'
import add from './add'
import view from './edit'
import list from './list'
import shared from './shared'
import edit from './edit'

export default {
  namespaced: true,
  state: {
    add: add.state(),
    view: view.state(),
    list: list.state(),
    shared: shared.state(),
    edit: edit.state(),
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
