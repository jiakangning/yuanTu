import Vue from 'vue'
import Vuex from 'vuex'

import system from './system'
import map from './modules/map'
import unity from './modules/unity'

Vue.use(Vuex)

const modules = {
  system,
  map,
  unity
}

export default new Vuex.Store({ modules })
