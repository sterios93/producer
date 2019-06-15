import { set, toggle } from '@/utils/vuex'

const state = () => ({
  namespaced: true,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  restaurantName: "",
  restaurantType: "",
  restaurantWebsite: "",
  restaurantNumber: "",
  inEditMode: false,
  isProfileValid: true,
  address: '',
  city: '',
  country: '',
  postalCode: '',
  location: {},
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
    SET_RESTAURANT_WEBSITE: (state, restaurantWebsite) => state.restaurantWebsite = restaurantWebsite,
    SET_RESTAURANT_NUMBER: (state, restaurantNumber) => state.restaurantNumber = restaurantNumber,
    SET_PROFILE_VALID: (state, value) => state.isProfileValid = value,
    SET_ADDRESS: (state, value) => state.address = value,
    SET_CITY: (state, value) => state.city = value,
    SET_COUNTRY: (state, value) => state.country = value,
    SET_POSTAL_CODE: (state, value) => state.postalCode = value,
    SET_LOCATION: (state, value) => state.location = value,
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
    setProfileValid: ({commit}, value) => {commit('SET_PROFILE_VALID', value)},
    setAddress: ({commit}, value) => {commit('SET_ADDRESS', value)},
    setCity: ({commit}, value) => {commit('SET_CITY', value)},
    setCountry: ({commit}, value) => {commit('SET_COUNTRY', value)},
    setPostalCode: ({commit}, value) => {commit('SET_POSTAL_CODE', value)},
    setLocation: ({commit}, value) => {commit('SET_LOCATION', value)},
    updateProfile: ({commit, value}) => {
      //TODO
    }
  },
  getters: {},
}


