import {set, toggle} from '@/utils/vuex'
import {getData} from "../helpers";

export default {
  namespaced: true,
  state: {
    items: [
      {
        id: 0,
        name: 'Lorem',
        image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        price: '40,00',
        category: {
          id: 0,
          name: 'Cuban'
        },
        description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
      },
      {
        id: 1,
        name: 'Lorem',
        image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        price: '40,00',
        category: {
          id: 0,
          name: 'Cuban'
        },
        description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
      },
      {
        id: 2,
        name: 'Lorem',
        image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        price: '40,00',
        category: {
          id: 1,
          name: 'Burger'
        },
        description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
      },
      {
        id: 3,
        name: 'Lorem',
        image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        price: '40,00',
        category: {
          id: 2,
          name: 'British'
        },
        description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
      },
      {
        id: 4,
        name: 'Lorem',
        image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        price: '40,00',
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
        price: '40,00',
        category: {
          id: 4,
          name: 'Bagels'
        },
        description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
      },
    ],
    categories: [
      {
        id: 0,
        name: 'Cuban',
        selected: false
      },
      {
        id: 1,
        name: 'Burger',
        selected: false
      },
      {
        id: 2,
        name: 'British',
        selected: false
      },
      {
        id: 3,
        name: 'Breakfast',
        selected: false
      },
      {
        id: 4,
        name: 'Bagels',
        selected: false
      }
    ],
  },
  mutations: {
    SET_CATEGORIES: set('categories'),
    SET_ITEMS: set('items'),
    TOGGLE_CATEGORY: (state, {id}) => {
      let category = state.categories.find((el => el.id === id))
      category.selected = !category.selected
    }
  },
  getters: {
    getSelectedCategories: (state) => state.categories.filter(el => el.selected),
    getMenuItems: (state) => {
      let categories = state.categories.filter(el => el.selected)
      return state.items.filter(el => categories.find(c => c.id === el.category.id))
    },
    getMenuByCategory: (state) => (id) => {
      return state.items.filter(el => id === el.category.id)
    }
  }
  ,
  actions: {
    setMenuItems({commit}, payload) {
      commit('SET_ITEMS', payload)
    },
    setCategories({commit}, payload) {
      commit('SET_CATEGORIES', payload)
    },
    setSelectedCategories({commit}, payload) {
      commit('SET_SELECTED_CATEGORIES', payload)
    },
    toggleCategory({commit}, payload) {
      commit('TOGGLE_CATEGORY', payload)
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
