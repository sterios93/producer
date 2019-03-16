import { set, toggle } from '@/utils/vuex'

const state = () => ({
  allItems: [
    {
      id: 11,
      name: 'Lor12331em',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
      category: {
        id: 0,
        name: 'Cuban'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
    {
      id: 0,
      name: 'Lor123123123em1',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
      category: {
        id: 0,
        name: 'Cuban'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
    {
      id: 1,
      name: 'Lore13123m2',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
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
  mutations: {},
  getters: {},
  actions: {
    saveItem({rootState, state, commit}, {action, payload}) {
      return undefined;
    }
  }
}


