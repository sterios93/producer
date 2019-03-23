import { set, toggle } from '@/utils/vuex'
import {formatDate, getData} from "../../helpers";

const state = () => ({

})

export default {
  state,
  mutations: {
    SET_NAME: (state, {payload, action}) => state[action].name = payload,
    SET_ITEMS: (state, {payload, action}) => state[action].items = payload,
    SET_PRICE: (state, {payload, action}) => state[action].price = payload,
    SET_PICTURE: (state, {payload, action}) => state[action].picture = payload,
    SET_DISCOUNT: (state, {payload, action}) => state[action].discount = payload,
    SET_SCHEDULE: (state, {payload, action}) => state[action].schedule = payload,
    SET_END_DATE: (state, {payload, action}) => state[action].endDate = payload,
    SET_START_DATE: (state, {payload, action}) => state[action].startDate = payload,
    SET_PICTURE_URL: (state, {payload, action}) => state[action].image = payload,
    SET_DESCRIPTION: (state, {payload, action}) => state[action].description = payload,
  },
  getters: {
    sumItemsPrice: (state) => (action) => state[action].items.reduce((sum, el) => sum + el.price, 0),
    getPrice: (state) => (action) => {
      const original = state[action].price
      const discount = original * (state[action].discount / 100)
      return original - discount
    }
  },
  actions: {
    setName: ({commit}, {payload, action}) => commit('SET_NAME', {payload, action}),
    setPrice: ({commit}, {payload, action}) => commit('SET_PRICE', {payload, action}),
    setEndDate: ({commit}, {payload, action}) => commit('SET_END_DATE', {payload, action}),
    setPicture: ({commit}, {payload, action}) => commit('SET_PICTURE', {payload, action}),
    setDiscount: ({commit}, {payload, action}) => commit('SET_DISCOUNT', {payload, action}),
    setSchedule: ({commit}, {payload, action}) => commit('SET_SCHEDULE', {payload, action}),
    setStartDate: ({commit}, {payload, action}) => commit('SET_START_DATE', {payload, action}),
    setPictureUrl: ({commit}, {payload, action}) => commit('SET_PICTURE_URL', {payload, action}),
    setDescription: ({commit}, {payload, action}) => commit('SET_DESCRIPTION', {payload, action}),
    setItems: ({commit, getters}, {payload, action}) => {
      commit('SET_ITEMS', {payload, action})
      const sum = getters['sumItemsPrice'](action)
      commit('SET_PRICE', {payload: sum, action})
    },
    saveItem({rootState, state, commit}, {action, payload}) {
      return undefined;
    },
    fetchItem({dispatch, commit}, {payload, action}) {
  
      
      let mockData = {
        id: 0,
        description: 'Only now in our Restaurant. Order one pizza and get the second one for free !',
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
        name: 'Grande Pica Peperoni with Cheese',
        picture: null,
        image: 'https://api-content.prod.pizzahutaustralia.com.au//umbraco/api/Image/Get2?path=assets/products/menu/Veggie-Tandoori-LGE-Pizza-menu.jpg',
        price: 160,
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
      let {name, picture, image, description, discount, items, price, schedule, startDate, endDate} = payload
      
      endDate = formatDate(endDate)
      startDate = formatDate(startDate)
      
      commit('SET_NAME', {payload: name, action})
      commit('SET_ITEMS', {payload: items, action})
      commit('SET_PRICE', {payload: price, action})
      commit('SET_PICTURE', {payload: picture, action})
      commit('SET_SCHEDULE', {payload: schedule, action})
      commit('SET_DISCOUNT', {payload: discount, action})
      commit('SET_END_DATE', {payload: endDate, action})
      commit('SET_START_DATE', {payload: startDate, action})
      commit('SET_PICTURE_URL', {payload: image, action})
      commit('SET_DESCRIPTION', {payload: description, action})
    },
  }
}


