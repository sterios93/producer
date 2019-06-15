/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

import lunch from './modules/lunch/index'
import main from './modules/main/index'
import special from './modules/special/index'

import modules from './modules'
Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  modules: {
    ...modules,
    lunch,
    special,
    main
  }
})

export default store
