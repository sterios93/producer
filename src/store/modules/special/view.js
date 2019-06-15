import { set, toggle } from '@/utils/vuex'
import { postData, getData } from '../../../utils/helpers'

const state = () => ({
  name: '',
  picture: null,
  image: '',
  description: '',
  price: 0,
  menuItems: [],
  discount: 10,
  schedule: null,
  timeStart: {
    date: '2019-05-10',
    time: '16:00',
    visible: false
  },
  timeEnd: {
    date: '2019-10-10',
    time: '12:00',
    visible: false
  }
})

export default {
  state,
  mutations: {},
  getters: {},
  actions: {}
}
