/* 排水自动化系统 */
const state = {
  drainages: []
}

const getters = {
  drainageList: state => {
    return state.drainages ? state.drainages : []
  }
}

const mutations = {
  setDrainages(state, value) {
    if (value && value.length) {
      state.drainages = value
    } else {
      state.drainages = []
    }
  }
}

const actions = {
  setDrainages({ commit }, value) {
    commit('setDrainages', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}