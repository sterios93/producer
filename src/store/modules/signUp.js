import { set, toggle } from '@/utils/vuex'
import { postData} from "../helpers";

export default {
  namespaced: true,
  state: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    isPersonalInfoValid: true,
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
    setPersonalInfoInvalid({commit}) {
        commit('SET_PERSONAL_INFO_INVALID');
    },
    setPersonalInfoValid({commit}) { commit('SET_PERSONAL_INFO_VALID')},
    setActiveStepNumber({commit}, stepNumber) { commit('SET_ACTIVE_STEP_NUMBER', stepNumber)},
  }
}
