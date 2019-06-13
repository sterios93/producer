import {set, toggle} from '@/utils/vuex'
import {postData, getData, customFromatDate, changeDateFormat} from "../../../utils/helpers";
import Vue from 'vue'

const state = () => ({
  allItems: [],
  lunchOnlyItems: [],
})

export default {
  state,
  mutations: {
    SET_ITEM: (state, {payload, action}) => state[action] = payload,
    SET_ITEMS: (state, {payload, action}) => Vue.set(state[action], 'items', payload),
    SET_LUNCH_ONlY_ITEMS: (state, {payload, action}) => Vue.set(state.shared, 'lunchOnlyItems', payload),
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
    reset: ({commit}, action) => commit(`RESET_${action.toUpperCase()}`),
    setItem: ({commit}, {payload, action}) => commit('SET_ITEM', {payload, action}),
    setItems: ({commit}, {payload, action}) => commit('SET_ITEMS', {payload, action}),
    setEndDate: ({commit}, {payload, action}) => commit('SET_END_DATE', {payload, action}),
    setDiscount: ({commit}, {payload, action}) => commit('SET_DISCOUNT', {payload, action}),
    setSchedule: ({commit}, {payload, action}) => commit('SET_SCHEDULE', {payload, action}),
    setStartDate: ({commit}, {payload, action}) => commit('SET_START_DATE', {payload, action}),
    fetchAvailableLunchOnlyItems: ({rootState, commit}, {action}) => {
      const { apiUrl, getAvailableLunchOnlyItemsPath, prodGet } = rootState.settings;
      const url = apiUrl + getAvailableLunchOnlyItemsPath + prodGet

      return getData(url)
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          commit('SET_LUNCH_ONlY_ITEMS', {
            payload: data.result,
            action
          })
        }
      })
    },
    saveItem({rootState, state, commit, dispatch}, {action}) {
      let data = state[action]

      const { 
        apiUrl, 
        createLunchtemPath,
        updateLunchItemPath, 
        prodPost 
      } = rootState.settings;

      const url = apiUrl + (action === 'add' ? createLunchtemPath : updateLunchItemPath) + prodPost;

      const payload = {
        id: data._id,
        menuItems: data.items.map(item => item._id),
        timeStart: changeDateFormat(data.startDate),
        timeEnd: changeDateFormat(data.endDate),
        active: data.isActive
      }

      return postData({ url, payload })
        .then((data) => data.json())
        .then((data) => {
          if (data.success) {
            if (action === 'add') {
              dispatch('addItem', data.result)
              // dispatch('addItem', data)
            } else if (action === 'edit') {
              dispatch('updateItem', data.result)
            }
          }
          return data
        })
    },
    fetchItem({rootState, dispatch, commit}, {itemId, action}) {
      const { apiUrl, fetchLunchtemPath, prodGet } = rootState.settings;
      const url = apiUrl + fetchLunchtemPath + itemId + prodGet

      return getData(url)
        .then(data => data.json())
        .then(data => {
          if (data.success) {
            console.error(data)
            const payload = data.result;
            payload.items = payload.menuItems;
            payload.startDate = customFromatDate(payload.timeStart);
            payload.endDate = customFromatDate(payload.timeEnd);
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
      let isAsync = action === 'edit' || action === 'list'

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
