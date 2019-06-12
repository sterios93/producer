import { set, toggle } from '@/utils/vuex'
import { formatDate, getData, postData, customFromatDate} from "../../../utils/helpers";

const state = () => ({

})

export default {
  state,
  mutations: {
    SET_ITEM: (state, {payload, action}) => state[action] = payload,
    SET_NAME: (state, {payload, action}) => state[action].name = payload,
    SET_ITEMS: (state, {payload, action}) => state[action].items = payload,
    SET_PRICE: (state, {payload, action}) => state[action].price = payload,
    SET_PICTURE: (state, {payload, action}) => state[action].picture = payload,
    SET_DISCOUNT: (state, {payload, action}) => state[action].discount = payload,
    SET_SCHEDULE: (state, {payload, action}) => state[action].schedule = payload,
    SET_END_DATE: (state, {payload, action}) => state[action].endDate = payload,
    TOGGLE_ACTIVE: (state, {payload, action}) => state[action].isActive = !state[action].isActive,
    SET_START_DATE: (state, {payload, action}) => state[action].startDate = payload,
    SET_PICTURE_URL: (state, {payload, action}) => state[action].image = payload,
    SET_DESCRIPTION: (state, {payload, action}) => state[action].description = payload,
  },
  getters: {
    sumItemsPrice: (state) => (action) => state[action].items.reduce((sum, el) => { return sum + Number(el.price) } , 0),
    getPrice: (state) => (action) => {
      const original = state[action].price
	  const discount = original * (state[action].discount / 100)
      return original - discount.toFixed(2)
    }
  },
  actions: {
    reset: ({commit}, action) => commit(`RESET_${action.toUpperCase()}`),
    setItem: ({commit}, {payload, action}) => commit('SET_ITEM', {payload, action}),
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
    saveItem({rootState, state, commit, dispatch, getters}, {action}) {
		const data = state[action];
		const { apiUrl, createSpecialOfferPath, prodPost } = rootState.settings;
		
        if (action === 'add') {
			const payload = {
				name: data.name,
				discount: data.discount,
				// price: getPrice(new Number(data.price).toFixed(2)),
				price: getters['getPrice'](action).toFixed(2),
				menuItems: data.items.map(item => item._id),
				timeStart: customFromatDate(data.startDate),
				timeEnd: customFromatDate(data.endDate),
				description: data.description,
				active: true, // TODO: Its, hardoced for now, check it later
				// TODO: wait for the BE to create another request for adding image.
				img: data.image,
			};

			const url = apiUrl + createSpecialOfferPath + prodPost;
			return postData({ payload, url })
				.then(data => data.json())
				.then(data => {
					if (data.success) {
						dispatch('addItem', payload);
						// TODO: do the request for adding image.
					}
					return data
				})
		}
          // if (action === 'add') {
            // dispatch('addItem', { data})
            // dispatch('addItem', data)
          // } else if (action === 'edit') {
            // dispatch('updateItem', data)
          // }
    },
    fetchItem({dispatch, commit, rootState}, {itemId, action}) {

		//TODO: Fake data, leave it here only for a refference , remove it when everything is ready
      let mockData = {
        id: 0,
        description: 'Only now in our Restaurant. Order one pizza and get the second one for free !',
        discount: 10,
        isActive: false,
        menuItems: [
          {
            id: 11,
            name: 'Lorem',
            image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
            price: 40.10,
            lunchOnly: false,
            weight: 50,
            category: {
              id: 0,
              name: 'Cuban'
            },
            description: 'Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.',
          },
        ],
        name: 'Grande Pica Peperoni with Cheese',
        picture: null,
        image: './img/special-offer-default.jpeg',
        price: 160,
        schedule: null,
        startDate: '2019-09-10 12:00',
        endDate: '2019-10-10 12:00',
      }
      
		const { apiUrl, fetchSpecialOfferPath, prodGet } = rootState.settings;
      	const url = apiUrl + fetchSpecialOfferPath + itemId + prodGet
        return getData(url)
          .then(data => data.json())
          .then(data => {
            if (data.success) {
				const payload = data.result;
				dispatch('setItem', { payload, action})
            }
            return data
          })
    },
    deleteItem: ({commit}, {payload}) => {
      return new Promise(resolve => {
      
        let data = {
          success: true,
          message: 'Internal Error'
        }
      
        // postData().then((data) => {
        setTimeout(() => {
          if (data.success) {
            commit('DELETE_LIST_ITEM', payload)
          }
          resolve(data)
        }, 2000)
      })
    },
    async toggleActive({commit}, {payload, action}) {
      let isAsync = (action === 'edit') || (action === 'list')
    
      if (isAsync) {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 2000)
        })
      }
    
      switch (action) {
        case 'add':
        case 'edit':
          commit('TOGGLE_ACTIVE', {payload, action})
          break
        case 'list':
          commit('TOGGLE_ACTIVE_LIST_ITEM', payload)
          break
      }
    
      return {
        success: true,
        message: 'Toggled successfully',
        data: {}
      }
    },
  }
}


