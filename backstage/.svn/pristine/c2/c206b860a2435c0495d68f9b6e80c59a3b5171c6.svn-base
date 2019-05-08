/* 安全监控系统 */
const state = {
  safties: []
}

const getters = {
  safeList: state => {
    return state.safties ? state.safties : []
  }
}

const mutations = {
  setSafties(state, value) {
    if (value && value.length) {
      state.safties = value
    } else {
      state.safties = []
    }
  }
}

const actions = {
  setSafties({ commit }, value) {
    commit('setSafties', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
