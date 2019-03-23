import { set, toggle } from '@/utils/vuex'

const state = () => ({
  allItems: [
    {
      id: 21,
      name: 'Lor12331em',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
      isLunchOnly: true,
      category: {
        id: 0,
        name: 'Cuban'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
    {
      id: 23,
      name: 'Lor123123123em1',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
      isLunchOnly: true,
      category: {
        id: 0,
        name: 'Cuban'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
    {
      id: 24,
      name: 'Lore13123m2',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
      isLunchOnly: true,
      category: {
        id: 0,
        name: 'Cuban'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
  ]
})

export default {
  state,
  mutations: {
    SET_DISCOUNT: (state, {payload, action}) => state[action].discount = payload,
    SET_ITEMS: (state, {payload, action}) => state[action].items = payload,
    SET_SCHEDULE: (state, {payload, action}) => state[action].schedule = payload,
    SET_START_DATE: (state, {payload, action}) => state[action].startDate = payload,
    SET_END_DATE: (state, {payload, action}) => state[action].endDate = payload,
  },
  getters: {},
  actions: {
    saveItem({rootState, state, commit}, {action, payload}) {
      return undefined;
    },
    // TODO consider moving to 'shared' module
    setDiscount: ({commit}, {payload, action}) => commit('SET_DISCOUNT', {payload, action}),
    setItems: ({commit}, {payload, action}) => commit('SET_ITEMS', {payload, action}),
    setSchedule: ({commit}, {payload, action}) => commit('SET_SCHEDULE', {payload, action}),
    setStartDate: ({commit}, {payload, action}) => commit('SET_START_DATE', {payload, action}),
    setEndDate: ({commit}, {payload, action}) => commit('SET_END_DATE', {payload, action}),
  }
}


