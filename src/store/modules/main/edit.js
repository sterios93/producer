import { set, toggle } from '@/utils/vuex'

const state = () => ({
  id: null,
  name: '',
  picture: null,
  image: '',
  description: '',
  weight: '',
  lunchOnly: 0,
  price: 0,
  category: '' // TODO consider array or single item
})

export default {
  state,
  mutations: {},
  getters: {},
  actions: {
  }
}


