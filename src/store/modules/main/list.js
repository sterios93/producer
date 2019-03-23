import { set, toggle } from '@/utils/vuex'

const state = () => ({
  items: [
    {
      id: 11,
      name: 'Lorem',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
      isLunchOnly: false,
      weight: 50,
      category: {
        id: 0,
        name: 'Cuban'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
    {
      id: 0,
      name: 'Lorem1',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
      isLunchOnly: false,
      weight: 50,
      category: {
        id: 0,
        name: 'Cuban'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
    {
      id: 1,
      name: 'Lorem2',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
      isLunchOnly: false,
      weight: 50,
      category: {
        id: 0,
        name: 'Cuban'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
    {
      id: 2,
      name: 'Lorem2',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
      isLunchOnly: false,
      weight: 50,
      category: {
        id: 1,
        name: 'Burger'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
    {
      id: 3,
      name: 'Lorem3',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
      isLunchOnly: false,
      weight: 50,
      category: {
        id: 2,
        name: 'British'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
    {
      id: 4,
      name: 'Lorem4',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
      isLunchOnly: false,
      weight: 50,
      category: {
        id: 3,
        name: 'Breakfast'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
    {
      id: 5,
      name: 'Lorem',
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 40,
      isLunchOnly: false,
      weight: 50,
      category: {
        id: 4,
        name: 'Bagels'
      },
      description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
    },
  ],
})

export default {
  state,
  mutations: {},
  getters: {
    getMenuByCategory: (state) => (id) => state.list.items.filter(el => id === el.category.id),
  },
  actions: {}
}


