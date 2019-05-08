/* 矿压监测 */
const state = {
  pressures: []
}

const getters = {
  pressureList: state => {
    return state.pressures ? state.pressures : []
  }
}

const mutations = {
  setPressures(state, value) {
    if (value && value.length) {
      state.pressures = value
    } else {
      state.pressures = []
    }
  }
}

const actions = {
  setPressures({ commit }, value) {
    commit('setPressures', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
