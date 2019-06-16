import Vue from 'vue'
import { set, toggle } from '@/utils/vuex'
import { formatDate, getData, postData, customFromatDate } from '../../../utils/helpers'

const state = () => ({
})

export default {
  state,
  mutations: {
    SET_ITEM: (state, { payload, action }) => state[action] = payload,
    SET_NAME: (state, { payload, action }) => state[action].name = payload,
    SET_ITEMS: (state, { payload, action }) => Vue.set(state[action], 'items', payload),
    SET_PRICE: (state, { payload, action }) => state[action].price = payload,
    SET_PICTURE: (state, { payload, action }) => state[action].picture = payload,
    SET_DISCOUNT: (state, { payload, action }) => state[action].discount = payload,
    SET_SCHEDULE: (state, { payload, action }) => state[action].schedule = payload,
    SET_END_DATE: (state, { payload, action }) => state[action].timeEnd = payload,
    TOGGLE_ACTIVE: (state, { payload, action }) => state[action].active = !state[action].active, // TODO use BE response
    SET_START_DATE: (state, { payload, action }) => state[action].timeStart = payload,
    SET_PICTURE_URL: (state, { payload, action }) => state[action].image = payload,
    SET_DESCRIPTION: (state, { payload, action }) => state[action].description = payload
  },
  getters: {
    sumItemsPrice: (state) => (action) => state[action].items.reduce((sum, el) => { return sum + Number(el.price) }, 0),
    getPrice: (state) => (action) => {
      const original = state[action].price
	  const discount = original * (state[action].discount / 100)
      return original - discount.toFixed(2)
    }
  },
  actions: {
    reset: ({ commit }, action) => commit(`RESET_${action.toUpperCase()}`),
    setItem: ({ commit }, { payload, action }) => commit('SET_ITEM', { payload, action }),
    setName: ({ commit }, { payload, action }) => commit('SET_NAME', { payload, action }),
    setPrice: ({ commit }, { payload, action }) => commit('SET_PRICE', { payload, action }),
    settimeEnd: ({ commit }, { payload, action }) => commit('SET_END_DATE', { payload, action }),
    setPicture: ({ commit }, { payload, action }) => commit('SET_PICTURE', { payload, action }),
    setDiscount: ({ commit }, { payload, action }) => commit('SET_DISCOUNT', { payload, action }),
    setSchedule: ({ commit }, { payload, action }) => commit('SET_SCHEDULE', { payload, action }),
    settimeStart: ({ commit }, { payload, action }) => commit('SET_START_DATE', { payload, action }),
    setPictureUrl: ({ commit }, { payload, action }) => commit('SET_PICTURE_URL', { payload, action }),
    setDescription: ({ commit }, { payload, action }) => commit('SET_DESCRIPTION', { payload, action }),
    setItems: ({ commit, getters }, { payload, action }) => {
      	commit('SET_ITEMS', { payload, action })
		    const sum = getters['sumItemsPrice'](action)
      	commit('SET_PRICE', { payload: sum, action })
    },
    saveItem ({ rootState, state, commit, dispatch, getters }, { prePayload = {}, action }) {
      let data = state[action] || prePayload

		  const { apiUrl, createSpecialOfferPath, updateSpecialOfferPath, prodPost } = rootState.settings

      const payload = {
        id: data._id,
        name: data.name,
        discount: parseInt(data.discount),
        // price: getPrice(new Number(data.price).toFixed(2)),
        price: action && getters['getPrice'](action).toFixed(2),
        menuItems: data.items && data.items.map(item => item._id),
        timeStart: data.timeStart && customFromatDate(data.timeStart),
        timeEnd: data.timeEnd && customFromatDate(data.timeEnd),
        description: data.description,
        active: data.active
      }

      const url = apiUrl + (action === 'add' ? createSpecialOfferPath : updateSpecialOfferPath) + prodPost
      return postData({ payload, url })
        .then(data => {
          if (data.success) {
            if (action === 'add') {
              dispatch('addItem', data.result)
            } else if (action === 'edit') {
              dispatch('updateItem', data.result)
            }
            dispatch('setItem', { payload: data.result, action: 'view' }) // TODO consider a way where we dont do this every time
          }
          return data
        })
    },
    fetchItem ({ dispatch, commit, rootState }, { itemId, action }) {
		  const { apiUrl, fetchSpecialOfferPath, prodGet } = rootState.settings
      const url = apiUrl + fetchSpecialOfferPath + itemId + prodGet
      return getData(url)
        .then(data => {
          if (data.success) {
            const payload = data.result
            payload.items = payload.menuItems
            payload.timeStart = customFromatDate(payload.timeStart)
            payload.timeEnd = customFromatDate(payload.timeEnd)
            dispatch('setItem', { payload, action })
          }
          return data
        })
    },
    deleteItem: ({ commit }, { payload }) => {
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
    async toggleActive ({ dispatch, commit }, { payload, action, isAsync }) {
      // let isAsync = action === 'edit' || action === 'list'

      if (isAsync !== undefined) {
        const data = await dispatch('saveItem', {
          prePayload: {
            active: !payload.active,
            _id: payload._id
          }
        })
        if (!data.success) {
          return data
        }
      }

      switch (action) {
        case 'add':
        case 'edit':
          commit('TOGGLE_ACTIVE', { payload, action })
          break
        case 'list':
          commit('TOGGLE_ACTIVE_LIST_ITEM', payload._id)
          break
      }

      return {
        success: true,
        message: 'Toggled successfully',
        data: {}
      }
    }
  }
}
