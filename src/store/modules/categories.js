import {set, toggle} from '@/utils/vuex'
import {getData, postData} from "../../utils/helpers";

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
    current: {
      name: '',
      id: null
    }
  },
  mutations: {
    SET_CATEGORY: set('current'),
    SET_CATEGORIES: set('items'),
    TOGGLE_CATEGORY: (state, {id}) => {
      let category = state.items.find((el => el.id === id))
      category.selected = !category.selected
    },
    ADD_NEW_CATEGORY: (state, payload) => state.items.push(payload),
    SET_CATEGORY_NAME: (state, payload) => state.current.name = payload
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
    setCategory({commit}, payload) {
      commit('SET_CATEGORY', payload)
    },
    setCategoryName({commit}, payload) {
      commit('SET_CATEGORY_NAME', payload)
    },
    saveItem({commit, rootState, state}) {
      postData({payload: state.category, url})
        .then((data) => commit('ADD_NEW_CATEGORY', data))
    }
  }
}
