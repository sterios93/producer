import {set, toggle} from '@/utils/vuex'
import logger from "vuex/dist/logger";
import {postData} from "../../../utils/helpers";

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
    SET_ITEM: (state, {payload, action}) => state[action] = payload,
    SET_ITEMS: (state, {payload, action}) => state[action].items = payload,
    SET_DISCOUNT: (state, {payload, action}) => state[action].discount = payload,
    SET_SCHEDULE: (state, {payload, action}) => state[action].schedule = payload,
    SET_END_DATE: (state, {payload, action}) => state[action].endDate = payload,
    TOGGLE_ACTIVE: (state, {payload, action}) => state[action].isActive = !state[action].isActive,
    SET_START_DATE: (state, {payload, action}) => state[action].startDate = payload,
  },
  getters: {
    getItem: (state) => (action) => {
      return {
        id,
        items,
        discount,
        schedule,
        startDate,
        endDate,
      } = state[action]
    }
  },
  actions: {
    toggleActive({commit}, {payload, action}) {
      switch (action) {
        case 'add':
        case 'edit':
          commit('TOGGLE_ACTIVE', {payload, action})
          break
        case 'list':
          return new Promise(resolve => {
            // postData().then((data) => {
            setTimeout(() => {
              commit('TOGGLE_ACTIVE_LIST_ITEM', {payload})
              resolve({
                success: true,
              })
            }, 2000)
          })
          break
      }
    },
    reset: ({commit}, action) => commit(`RESET_${action.toUpperCase()}`),
    setItem: ({commit}, {payload, action}) => commit('SET_ITEM', {payload, action}),
    setItems: ({commit}, {payload, action}) => commit('SET_ITEMS', {payload, action}),
    setEndDate: ({commit}, {payload, action}) => commit('SET_END_DATE', {payload, action}),
    setDiscount: ({commit}, {payload, action}) => commit('SET_DISCOUNT', {payload, action}),
    setSchedule: ({commit}, {payload, action}) => commit('SET_SCHEDULE', {payload, action}),
    setStartDate: ({commit}, {payload, action}) => commit('SET_START_DATE', {payload, action}),
    saveItem({rootState, state, commit, dispatch}, {action}) {
      return new Promise(resolve => {
        let data = state[action]
        // TODO :: fake request
        
        setTimeout(() => {
          if (action === 'add') {
            dispatch('addItem', {
              ...data,
              // TODO :: fake id
              id: Math.random() * 1000
            })
            // dispatch('addItem', data)
          } else if (action === 'edit') {
            dispatch('updateItem', data)
          }
          resolve({
            success: true
          })
        }, 1000)
      })
    },
    fetchItem({dispatch, commit}, {payload, action}) {
      let mockData = {
        id: 0,
        discount: 10,
        isActive: false,
        items: [
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
        image: 'https://api-content.prod.pizzahutaustralia.com.au//umbraco/api/Image/Get2?path=assets/products/menu/Veggie-Tandoori-LGE-Pizza-menu.jpg',
        schedule: null,
        startDate: '2019-09-10 12:00',
        endDate: '2019-10-10 12:00',
      }
      
      dispatch('setItem', {payload: mockData, action})
      
      return Promise.resolve(mockData)
      
      // TODO :: remove upper code and use this when backend is ready
      // let url = ''
      // let query = payload
      // let token = ''
      // return getData(url, query, token)
      //   .then((data) => {
      //     dispatch('setItem', {payload: data, action})
      //   })
    },
  }
}


