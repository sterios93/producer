import { set, toggle } from '@/utils/vuex'
import { getData, postData } from '../../utils/helpers'

export default {
  namespaced: true,
  state: {
    color: 'success',
    isUserLogged: localStorage.getItem('isUserLogged') === 'true'
  },
  mutations: {
    SET_IS_USER_LOGGED: (state, value) => {
      state.isUserLogged = value
      localStorage.setItem('isUserLogged', value)
    }
  },
  getters: {},
  actions: {
    resetPassword({dispatch, rootState,}, email){
			const data = {
				payload: {
					email: email,	
				},
				url: rootState.settings.apiUrl + rootState.settings.resetPassPath + rootState.settings.prodPost,
			}

			return postData(data)
							.then(data => data);
		},
    fetchUserData ({ dispatch, rootState, state, commit }) {
      const { apiUrl, fetchPath, prodGet } = rootState.settings
      return getData(apiUrl + fetchPath + prodGet)
        .then(data => {
          let { user, restaurant, plan } = data.result

          if (user) {
            dispatch('userProfile/setLastName', user.lastName, { root: true })
            dispatch('userProfile/setFirstName', user.firstName, { root: true })
            dispatch('userProfile/setPhoneNumber', user.phone, { root: true })
          }

          if (restaurant) {
            dispatch('userProfile/setRestaurantName', restaurant.name, { root: true })
            dispatch('userProfile/setRestaurantType', restaurant.type, { root: true })
            dispatch('userProfile/setRestaurantWebsite', restaurant.website, { root: true })
            dispatch('userProfile/setRestaurantNumber', restaurant.phoneNumber, { root: true })
            dispatch('userProfile/setLocation', {lat: restaurant.lat, lng: restaurant.lng}, { root: true })
          }
          return data
        })
    },
    setIsUserLogged ({ commit }, value) {
      commit('SET_IS_USER_LOGGED', value)
    },
    logout ({ commit, rootState }) {
      const data = {
        url: rootState.settings.apiUrl + rootState.settings.logoutPath + rootState.settings.prodGet
      }

      return postData({ url: data.url })
        .then(data => {
          if (data.success) {
            commit('SET_IS_USER_LOGGED', false)
            localStorage.removeItem('isUserLogged')
          }
        })
    },
    login ({ dispatch, rootState, state, commit }, payload) {
      let data = {
        payload,
        url: rootState.settings.apiUrl + rootState.settings.loginPath + rootState.settings.prodPost
      }

      return postData(data)
        .then(data => {
          if (data.success) {
            commit('SET_IS_USER_LOGGED', true)
          }
          return data
        })
        .catch(error => {
          dispatch('snackbar/setState', {
            snackbar: true,
            message: error && error.message,
            color: 'red'
          }, { root: true })
        })
    },
    signUp ({ dispatch, rootState, state, commit }, payload) {
      let data = {
        payload,
        url: rootState.settings.apiUrl + rootState.settings.createPath + rootState.settings.prodPost
      }

      return postData(data)
        .then(data => {
          if (data.success) {
            commit('SET_IS_USER_LOGGED', true)
          }
          return data
        })
        .catch(error => {
          dispatch('snackbar/setState', {
            snackbar: true,
            message: error && error.message,
            color: 'red'
          }, { root: true })
        })
    }
  }
}
