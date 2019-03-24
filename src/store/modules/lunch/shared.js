import { set, toggle } from '@/utils/vuex'
import {formatDate} from "../../helpers";

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
    SET_ITEMS: (state, {payload, action}) => state[action].items = payload,
    SET_DISCOUNT: (state, {payload, action}) => state[action].discount = payload,
    SET_SCHEDULE: (state, {payload, action}) => state[action].schedule = payload,
    SET_END_DATE: (state, {payload, action}) => state[action].endDate = payload,
    SET_START_DATE: (state, {payload, action}) => state[action].startDate = payload,
  },
  getters: {},
  actions: {
    setItems: ({commit}, {payload, action}) => commit('SET_ITEMS', {payload, action}),
    setEndDate: ({commit}, {payload, action}) => commit('SET_END_DATE', {payload, action}),
    setDiscount: ({commit}, {payload, action}) => commit('SET_DISCOUNT', {payload, action}),
    setSchedule: ({commit}, {payload, action}) => commit('SET_SCHEDULE', {payload, action}),
    setStartDate: ({commit}, {payload, action}) => commit('SET_START_DATE', {payload, action}),
    saveItem({rootState, state, commit}, {action, payload}) {
      return undefined;
    },
    fetchItem({dispatch, commit}, {payload, action}) {
      let mockData = {
        id: 0,
        discount: 10,
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
    
      dispatch('setItemValues', {payload: mockData, action})
    
      return Promise.resolve(mockData)
    
      // TODO :: remove upper code and use this when backend is ready
      // let url = ''
      // let query = payload
      // let token = ''
      // return getData(url, query, token)
      //   .then((data) => {
      //     dispatch('setItemValues', {payload: data, action})
      //   })
    },
    setItemValues ({commit}, {payload, action}) {
      let {
        items,
        discount,
        schedule,
        startDate,
        endDate,
      } = payload
  
      endDate = formatDate(endDate)
      startDate = formatDate(startDate)
    
      commit('SET_ITEMS', {payload: items, action})
      commit('SET_DISCOUNT', {payload: discount, action})
      commit('SET_SCHEDULE', {payload: schedule, action})
      commit('SET_END_DATE', {payload: endDate, action})
      commit('SET_START_DATE', {payload: startDate, action})
    }
  
  }
}


