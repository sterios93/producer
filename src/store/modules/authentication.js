import { set, toggle } from '@/utils/vuex'
import {getData, postData} from "../../utils/helpers";

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
		},
	},
	getters: {},
	actions: {
		fetchUserData({dispatch, rootState, state, commit}) {
			return getData(rootState.settings.apiUrl + 'user/producer/fetch')
				.then(response => response.json())
				.then(data => {

					let {user, restaurant, plan} = data.result
					
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
						dispatch('userProfile/setLocation', restaurant.location.coordinates, { root: true })
					}
					
				})
		},
		setIsUserLogged({commit}, value) {
			commit('SET_IS_USER_LOGGED', value)
		},
		logout({commit}) {
			commit('SET_IS_USER_LOGGED', false)
			localStorage.removeItem('isUserLogged')
		},
		login({dispatch, rootState, state, commit}, payload) {
			let data = {
				payload,
				url: rootState.settings.apiUrl + 'user/producer/login',
			}
			
			return postData(data)
				.then(response => response.json())
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
		signUp({dispatch, rootState, state, commit}, payload) {
			let data = {
				payload,
				url: rootState.settings.apiUrl + 'user/create',
			}
			
			return postData(data)
				.then(response => response.json())
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
