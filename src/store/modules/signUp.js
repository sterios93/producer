import { set, toggle } from '@/utils/vuex'
import { postData} from "../../utils/helpers";

export default {
  namespaced: true,
  state: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    isPersonalInfoValid: true,
    isRestaurantInfoValid: true,
    restaurantName: "",
    restaurantType: "",
    restaurantWebsite: "",
    restaurantNumber: "",
    activeStepNumber: 0,
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
    SET_RESTAURANT_WEBSITE: (state, restaurantWebsite) => state.firstName = restaurantWebsite,
    SET_RESTAURANT_NUMBER: (state, restaurantNumber) => state.restaurantNumber = restaurantNumber,
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
  }
}
