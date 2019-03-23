import { set, toggle } from '@/utils/vuex'

const state = () => ({
  namespaced: true,
  firstName: "Dobrin",
  lastName: "Dimchev",
  email: "dobkata.boost@abv.bg",
  phoneNumber: "091239129030",
  password: "guru",
  restaurantName: "Cepiqta",
  restaurantType: "Mexican",
  restaurantWebsite: "dobkata.com",
  restaurantNumber: "12312312312",
  inEditMode: false,
  isProfileValid: true,
})

export default {
  state,
  mutations: {
    SET_EDIT_MODE: (state, value) => { state.inEditMode = value},
    SET_FIRST_NAME: (state, firstName) => state.firstName = firstName,
    SET_LAST_NAME: (state, lastName) => state.lastName = lastName,
    SET_EMAIL: (state, email) => state.email = email,
    SET_PHONE_NUMBER: (state, phoneNumber) => state.phoneNumber = phoneNumber,
    SET_PASSWORD: (state, password) => state.password = password,
    SET_RESTAURANT_NAME: (state, restaurantName) => state.restaurantName = restaurantName,
    SET_RESTAURANT_TYPE: (state, restaurantType) => state.restaurantType = restaurantType,
    SET_RESTAURANT_WEBSITE: (state, restaurantWebsite) => state.firstName = restaurantWebsite,
    SET_RESTAURANT_NUMBER: (state, restaurantNumber) => state.restaurantNumber = restaurantNumber,
    SET_PROFILE_VALID: (state, value) => state.isProfileValid = value,
  },
  actions: {
    setEditMode({commit}, value) {commit('SET_EDIT_MODE', value)},
    setFirstName: ({commit}, firstName) => {commit('SET_FIRST_NAME', firstName)},
    setLastName: ({commit}, lastName) => {commit('SET_LAST_NAME', lastName)},
    setEmail: ({commit}, email) => {commit('SET_EMAIL', email)},
    setPhoneNumber: ({commit}, phoneNumber) => {commit('SET_PHONE_NUMBER', phoneNumber)},
    setPassword: ({commit}, phoneNumber) => {commit('SET_PASSWORD', phoneNumber)},
    setRestaurantName: ({commit}, phoneNumber) => {commit('SET_RESTAURANT_NAME', phoneNumber)},
    setRestaurantType: ({commit}, phoneNumber) => {commit('SET_RESTAURANT_TYPE', phoneNumber)},
    setRestaurantWebsite: ({commit}, phoneNumber) => {commit('SET_RESTAURANT_WEBSITE', phoneNumber)},
    setRestaurantNumber: ({commit}, phoneNumber) => {commit('SET_RESTAURANT_NUMBER', phoneNumber)},
    setProfileValid: ({commit}, value) => {commit('SET_PROFILE_VALID', value)}
  },
  getters: {},
}


