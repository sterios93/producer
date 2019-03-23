import { set, toggle } from '@/utils/vuex'

const state = () => ({
  items: [
    {
      id: 0,
      items: [
        {
          id: 11,
          name: 'Lorem',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: '40,00',
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 12,
          name: 'Lorem',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: '40,00',
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 13,
          name: 'Lorem',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: '40,00',
          isLunchOnly: false,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 14,
          name: 'Lorem',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: '40,00',
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 15,
          name: 'Lorem',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: '40,00',
          isLunchOnly: true,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
        {
          id: 16,
          name: 'Lorem',
          image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          price: '40,00',
          isLunchOnly: false,
          category: {
            id: 0,
            name: 'Cuban'
          },
          description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
        },
      ],
      discount: 10,
      schedule: null,
      startDate: '2019-03-23 12:00',
      endDate: '2019-03-23 13:00'
    }
  ],
})

export default {
  state,
  mutations: {},
  getters: {},
  actions: {}
}


