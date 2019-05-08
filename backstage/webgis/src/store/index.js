import Vuex from 'vuex'
import Vue from 'vue'
import bindPositions from './bindPositions'
// monitor
import flow from './monitor/mainCoalFlow'
import pressure from './monitor/minePressure'
import fan from './monitor/mainFans'
import drainage from './monitor/drainage'
import safe from './monitor/safe'

Vue.use(Vuex)

let state = {
  noticeInfo: {
    type: '',
    message: ''
  }
}
let mutations = {
  showErrorMsg(state, msg) {
    state.noticeInfo.type = 'error'
    state.noticeInfo.message = msg
  },
  showSuccessMsg(state, msg) {
    state.noticeInfo.type = 'success'
    state.noticeInfo.message = msg
  },
  showNormalMsg (state, msg) {
    state.noticeInfo.type = 'info'
    state.noticeInfo.message = msg
  },
}
let actions = {

}


export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    bindPositions,
    flow,
    pressure,
    fan,
    drainage,
    safe
  }
})
