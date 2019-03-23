import { set, toggle } from '@/utils/vuex'

const state = () => ({
  items: [
    {
      id: 0,
      description: 'asdasdasd',
      discount: 10,
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
      ],
      name: 'Dobrin Yonkov',
      picture: null,
      image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      price: 160,
      schedule: null,
      startDate: '2019-09-10 12:00',
      endDate: '2019-10-10 12:00',
    }
  ],
})

export default {
  state,
  mutations: {},
  getters: {},
  actions: {}
}


