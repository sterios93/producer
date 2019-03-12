import {set, toggle} from '@/utils/vuex'
import {getData} from "../helpers";

export default {
  namespaced: true,
  state: {
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
    activeTab: 'menu',
    tabs: {
      menu: {
        key: 0,
        title: 'Menu',
        items: [
          {
            id: 11,
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
            id: 0,
            name: 'Lorem1',
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
            name: 'Lorem2',
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
            name: 'Lorem2',
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
            name: 'Lorem3',
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
            name: 'Lorem4',
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
      },
      special: {
        key: 1,
        title: 'Special Offers',
        items: [
          {
            id: 14,
            name: 'Lorem1',
            image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
            price: '40,00',
            category: {
              id: 0,
              name: 'Cuban'
            },
            description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
          },
          {
            id: 15,
            name: 'Lorem1',
            image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
            price: '40,00',
            category: {
              id: 0,
              name: 'Cuban'
            },
            description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
          },
          {
            id: 10,
            name: 'Lorem1',
            image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
            price: '40,00',
            category: {
              id: 0,
              name: 'Cuban'
            },
            description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
          },
          {
            id: 11,
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
            id: 0,
            name: 'Lorem1',
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
            name: 'Lorem2',
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
            name: 'Lorem2',
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
            name: 'Lorem3',
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
            name: 'Lorem4',
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
      },
      launch: {
        key: 2,
        title: 'Launch Offers',
        items: []
      }
    }
  },
  mutations: {
    SET_ITEMS: set('items'),
    SET_ACTIVE_TAB: set('activeTab'),
    SET_CATEGORIES: set('categories'),
    TOGGLE_CATEGORY: (state, {id}) => {
      let category = state.categories.find((el => el.id === id))
      category.selected = !category.selected
    }
  },
  getters: {
    getTabsTitles: (state) => Object.keys(state.tabs).map(t => t.title),
    getSelectedCategories: (state) => state.categories.filter(el => el.selected),
    getMenuByCategory: (state) => (id) => state.tabs[state.activeTab].items.filter(el => id === el.category.id),
  
    // getMenuByName: (state) => (name) => {
    //   return state.items
    //     .filter(el => el.name.indexOf(name) !== -1)
    //     .sort((a, b) => a - b)
    // }
  }
  ,
  actions: {
    setActiveTab({commit}, payload) {
      commit('SET_ACTIVE_TAB', payload)
    },
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
          commit('SET_CATEGORIES', data.categories)
          commit('SET_ITEMS', {key: 'menu', value: data.menu})
          commit('SET_ITEMS', {key: 'special', value: data.special})
          commit('SET_ITEMS', {key: 'launch', value: data.launch})
        })
        .catch(err => {
          // TODO :: invoke snackbar with error info
        })
    },
  }
}
