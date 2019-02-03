import { set, toggle } from '@/utils/vuex'

export default {
  namespaced: true,
  state: {
    color: 'success',
    userId: localStorage.getItem('user_id') || null,
    token: localStorage.getItem('token') || null,
    route: 'user/',
    isUserLogged: localStorage.getItem('token') !== null
  },
  mutations: {
    SET_TOKEN: set('token'),
    SET_ROUTE: set('route'),
    SET_IS_USER_LOGGED: set('isUserLogged'),
    SET_COLOR: set('color'),
    SET_USER_ID: set('userId'),
  },
  getters: {},
  actions: {
    SET_ROUTE({commit}, payload) {
      commit('SET_ROUTE', payload)
    },
    setImage({commit}, payload) {
      commit('SET_IMAGE', payload)
    },
    setColor({commit}, payload) {
      commit('SET_COLOR', payload)
    },
    fetchUserData({rootState, state, commit}) {
      return fetch(rootState.settings.apiUrl + state.route).then(r => {
        console.log(r)
      })
    },
    logout({commit}) {
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      commit('SET_TOKEN', '')
      commit('SET_IS_USER_LOGGED', false)
      commit('SET_USER', {id: null})
    },
    postData({rootState, state, commit}, {action, payload}) {
      return fetch(rootState.settings.apiUrl + state.route + action, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success !== false) {
            if (action === 'login') {
              const { token, userId } = data

              localStorage.setItem('token', token)
              // TODO investigate other options later
              localStorage.setItem('user_id', userId)

              commit('SET_TOKEN', token)
              commit('SET_USER_ID', userId)
              commit('SET_IS_USER_LOGGED', true)
            }
          }
          return data
        })
    }
  }
}
