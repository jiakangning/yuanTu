/* 主煤流 */
const state = {
  flows: []
}

const getters = {
  flowList: state => {
    return state.flows ? state.flows : []
  }
}

const mutations = {
  setFlows(state, value) {
    if (value && value.length) {
      state.flows = value
    } else {
      state.flows = []
    }
  }
}

const actions = {
  setFlows({ commit }, value) {
    commit('setFlows', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
