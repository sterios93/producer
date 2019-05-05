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
				img: './img/basic.png',
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
			},
			premium: {
				img: './img/premium.png',
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
			},
			exclusive: {
				img: './img/exclusive.png',
				price: 249,
				type: 'exclusive',
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
			},
		},
		history: [
			{
				id: 4,
				type: 'basic',
				startDate: '2019-09-10 12:00',
				endDate: '2019-10-10 12:00',
				expired: false,
			},
			{
				id: 3,
				type: 'basic',
				startDate: '2019-09-10 12:00',
				endDate: '2019-10-10 12:00',
				expired: true
			},
			{
				id: 2,
				type: 'basic',
				startDate: '2019-09-10 12:00',
				endDate: '2019-10-10 12:00',
				expired: true
			},
			{
				id: 1,
				type: 'basic',
				startDate: '2019-09-10 12:00',
				endDate: '2019-10-10 12:00',
				expired: true
			},
		],
		currentMembership: {
			id: 4,
			type: 'basic',
			startDate: '2019-09-10 12:00',
			endDate: '2019-10-10 12:00',
			expired: false
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
	getters: {
		getMembership: (state) => (type) => {
			return state.memberships[type]
		}
	},
	actions: {
		setSubscriptions({commit}, payload) {
			commit('SET_SUBSCRIPTIONS', payload)
		},
		updateItem({commit}, payload) {
			commit('UPDATE_ITEM', payload)
		},
		cancelMemberShip() {
			// TODO
		}
	}
}
