import {set, toggle} from '@/utils/vuex'
import {getData} from "../helpers";

export default {
  namespaced: true,
  state: {
    items: [
      {
        name: 'Lorem',
        image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        price: '40,00',
        category: 'Desert',
        description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
      },
      {
        name: 'Lorem',
        image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        price: '40,00',
        category: 'Desert',
        description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
      },
      {
        name: 'Lorem',
        image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        price: '40,00',
        category: 'Desert',
        description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
      },
      {
        name: 'Lorem',
        image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        price: '40,00',
        category: 'Desert',
        description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
      },
      {
        name: 'Lorem',
        image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        price: '40,00',
        category: 'Desert',
        description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
      },
    ],
    categories: [],
    selectedCategory: ''
  },
  mutations: {
    SET_CATEGORIES: set('categories'),
    SET_ITEMS: set('items'),
    SET_SELECTED_CATEGORY: set('selectedCategory'),
  },
  getters: {},
  actions: {
    setMenuItems({commit}, payload) {
      commit('SET_ITEMS', payload)
    },
    setCategories({commit}, payload) {
      commit('SET_CATEGORIES', payload)
    },
    setSelectedCategory({commit}, payload) {
      commit('SET_SELECTED_CATEGORY', payload)
    },
    fetchMenu({commit}, payload) {
      getData()
        .then(data => {
          commit('SET_ITEMS', data.items)
          commit('SET_CATEGORIES', data.categories)
        })
        .catch(err => {
          // TODO :: invoke snackbar with error info
        })
    },
  }
}
