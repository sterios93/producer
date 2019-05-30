import { set, toggle } from '@/utils/vuex'
import { postData} from "../../utils/helpers";

export default {
  namespaced: true,
  state: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    phoneInfo: {},
    password: "",
    isPersonalInfoValid: true,
    isRestaurantInfoValid: true,
    restaurantName: "",
    restaurantType: "",
    restaurantWebsite: "",
    restaurantNumber: "",
    activeStepNumber: 0,
    address: '',
    city: '',
    country: '',
    postalCode: '',
    location: {
	    lng: '',
	    lat: ''
    },
  },
  mutations: {
    SET_FIRST_NAME: (state, firstName) => state.firstName = firstName,
    SET_LAST_NAME: (state, lastName) => state.lastName = lastName,
    SET_EMAIL: (state, email) => state.email = email,
    SET_PHONE_NUMBER: (state, phoneNumber) => state.phoneNumber = phoneNumber,
    SET_PASSWORD: (state, password) => state.password = password,
    SET_PERSONAL_INFO_VALID: (state) => state.isPersonalInfoValid = true,
    SET_PERSONAL_INFO_INVALID: (state) => state.isPersonalInfoValid = false,
    SET_ACTIVE_STEP_NUMBER: (state, stepNumber) => state.activeStepNumber = stepNumber,
    SET_RESTAURANT_INFO_VALID: (state) => state.isRestaurantInfoValid = true,
    SET_RESTAURANT_INFO_INVALID: (state) => state.isRestaurantInfoValid = false,
    SET_RESTAURANT_NAME: (state, restaurantName) => state.restaurantName = restaurantName,
    SET_RESTAURANT_TYPE: (state, restaurantType) => state.restaurantType = restaurantType,
    SET_RESTAURANT_WEBSITE: (state, restaurantWebsite) => state.restaurantWebsite = restaurantWebsite,
    SET_RESTAURANT_NUMBER: (state, restaurantNumber) => state.restaurantNumber = restaurantNumber,
    SET_ADDRESS: (state, value) => state.address = value,
    SET_CITY: (state, value) => state.city = value,
    SET_COUNTRY: (state, value) => state.country = value,
    SET_POSTAL_CODE: (state, value) => state.postalCode = value,
    SET_LOCATION: (state, value) => state.location = value,
    SET_PHONE_INFO: (state, value) => state.phoneInfo = value,
  },
  getters: {},
  actions: {
    setPersonalInfo({commit}, personalInfo) {
        const {firstName, lastName, email, phoneNumber, password} = personalInfo;
        commit('SET_FIRST_NAME', firstName);
        commit('SET_LAST_NAME', lastName);
        commit('SET_EMAIL', email);
        commit('SET_PHONE_NUMBER', phoneNumber);
        commit('SET_PASSWORD', password);
        commit('SET_PERSONAL_INFO_VALID');
    },
    setRestaurantInfo({commit}, restaurantInfo) {
      const { restaurantName,  restaurantType, restaurantWebsite, restaurantNumber} = restaurantInfo;
      commit('SET_RESTAURANT_NAME', restaurantName);
      commit('SET_RESTAURANT_TYPE', restaurantType);
      commit('SET_RESTAURANT_WEBSITE', restaurantWebsite);
      commit('SET_RESTAURANT_NUMBER', restaurantNumber);
      commit('SET_RESTAURANT_INFO_VALID');
    },
    setPersonalInfoInvalid({commit}) {commit('SET_PERSONAL_INFO_INVALID')},
    setPersonalInfoValid({commit}) { commit('SET_PERSONAL_INFO_VALID')},
    setRestaurantInfoValid({commit}) {commit('SET_RESTAURANT_INFO_VALID')},
    setRestaurantInfoInvalid({commit}) {commit('SET_RESTAURANT_INFO_INVALID')},
    setActiveStepNumber({commit}, stepNumber) { commit('SET_ACTIVE_STEP_NUMBER', stepNumber)},
    setAddress: ({commit}, value) => {commit('SET_ADDRESS', value)},
    setCity: ({commit}, value) => {commit('SET_CITY', value)},
    setCountry: ({commit}, value) => {commit('SET_COUNTRY', value)},
    setPostalCode: ({commit}, value) => {commit('SET_POSTAL_CODE', value)},
    setLocation: ({commit}, value) => {commit('SET_LOCATION', value)},
    setPhoneInfo: ({commit}, value) => {commit('SET_PHONE_INFO', value)},
	  doSignUpRequest: ({dispatch, rootState, state, commit}) => {
		  let payload = {
				  "email": state.email.toString().replace(/ /g,''),
				  "password": state.password.toString().replace(/ /g,''),
				  "firstName": state.firstName.toString().replace(/ /g,''),
				  "lastName": state.lastName.toString().replace(/ /g,''),
				  "phone": state.phoneNumber.toString().replace(/ /g,''),
				  "restaurantName": state.restaurantName.toString().replace(/ /g,''),
				  "type": state.restaurantType.toString().replace(/ /g,''),
				  "website": state.restaurantWebsite.toString().replace(/ /g,''),
				  "number": state.restaurantNumber.toString().replace(/ /g,''),
				  "lng": state.location.lng.toString().replace(/ /g,''),
			    "lat": state.location.lat.toString().replace(/ /g,'')
		  }
		  
		  return dispatch('authentication/signUp', payload, { root: true })
	  }
  }
}
