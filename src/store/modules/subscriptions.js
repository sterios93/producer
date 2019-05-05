import {set, toggle} from '@/utils/vuex'
import Vue from 'vue'

export default {
	namespaced: true,
	state: {
		items: [
			{
				id: 0,
				restaurant: {
					image: './img/special.png',
					name: 'Lorem1'
				},
				following: false,
				isActive: false
			},
			{
				id: 1,
				restaurant: {
					image: './img/special.png',
					name: 'Lorem2'
				},
				following: false,
				isActive: true
			},
			{
				id: 2,
				restaurant: {
					image: './img/special.png',
					name: 'Lorem3'
				},
				following: true,
				isActive: true
			},
		],
		memberships: {
			basic: {
				price: 50,
				type: 'basic',
				includes: [
					'30 days Membership',
					'150+ Projects',
					'Advanced options'
				],
				per: 'mouth',
				colors: {
					primary: '#3F0C0B',
					second: '#7E1917'
				},
				position: {
					upper: false,
					down: false,
				}
			},
			premium: {
				price: 140,
				type: 'premium',
				includes: [
					'30 days Membership',
					'150+ Projects',
					'Advanced options'
				],
				per: '3 mouths',
				colors: {
					primary: '#205D3C',
					second: '#47BB78'
				},
				position: {
					upper: false,
					down: true,
				}
			},
			extendedPremium: {
				price: 249,
				type: 'extended premium',
				includes: [
					'30 days Membership',
					'150+ Projects',
					'Advanced options'
				],
				per: '6 mouths',
				colors: {
					primary: '#0E231F',
					second: '#1F453E'
				},
				position: {
					upper: false,
					down: false,
				}
			},
			exclusive: {
				price: 599,
				type: 'exclusive',
				includes: [
					'30 days Membership',
					'150+ Projects',
					'Advanced options'
				],
				per: 'year',
				colors: {
					primary: '#3D2600',
					second: '#7A4D00'
				},
				position: {
					upper: false,
					down: true,
				}
			},
		}
	},
	mutations: {
		SET_SUBSCRIPTIONS: set('subscriptions'),
		UPDATE_ITEM: (state, payload) => {
			let index = state.items.findIndex(el => el.id === payload.id)
			if (index) {
				Vue.set(state.items, index, payload)
			}
		}
	},
	getters: {},
	actions: {
		setSubscriptions({commit}, payload) {
			commit('SET_SUBSCRIPTIONS', payload)
		},
		updateItem({commit}, payload) {
			commit('UPDATE_ITEM', payload)
		}
	}
}
