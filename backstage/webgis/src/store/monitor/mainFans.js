/* 主风机 */
const state = {
  fans: []
}

const getters = {
  fanList: state => {
    return state.fans ? state.fans : []
  }
}

const mutations = {
  setFans(state, value) {
    if (value && value.length) {
      state.fans = value
    } else {
      state.fans = []
    }
  }
}

const actions = {
  setFans({ commit }, value) {
    commit('setFans', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
