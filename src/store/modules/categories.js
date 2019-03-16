import {set, toggle} from '@/utils/vuex'
import {getData} from "../helpers";

export default {
  namespaced: true,
  state: {
    items: [
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
    SET_CATEGORIES: set('items'),
    TOGGLE_CATEGORY: (state, {id}) => {
      let category = state.items.find((el => el.id === id))
      category.selected = !category.selected
    }
  },
  getters: {
    getSelectedCategories: (state) => state.items.filter(el => el.selected),
  }
  ,
  actions: {
    setCategories({commit}, payload) {
      commit('SET_CATEGORIES', payload)
    },
    toggleCategory({commit}, payload) {
      commit('TOGGLE_CATEGORY', payload)
    },
  }
}
