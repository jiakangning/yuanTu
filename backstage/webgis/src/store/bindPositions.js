import {
  getAllPositions,
  createPosition,
  updatePosition,
  deletePosition
} from '../service/bindPositions'
import {Position} from '../models/Position'

let state = {
  bindedPositions: [],
  // activeItem: null
}

// 所属系统枚举
export const belongsTo = {
  // 一张图绑定
  BINDPOSITIONS: 'bindPositions',
  // 压风机
  PRESSUREFAN: 'pressureFan'
}
let getters = {
  getBaseBindedPositions: state => {
    return state.bindedPositions.filter(v => v.type !== 'component' && v.belongsTo === belongsTo.BINDPOSITIONS).map(item => {
      return Object.assign(item, { animationState: false, value: null, unit: null, isAlarm: false })
    })
  },
  getConfigDesign: state => {
    return state.bindedPositions.filter(item => item.type === 'component')
  },
  getBindedPositions: state => {
    // return state.bindedPositions
    return state.bindedPositions.filter(item => item.type !== 'component' && item.belongsTo === belongsTo.BINDPOSITIONS)
  },
  // 获取一张图绑定的激活项
  getActiveItem: state => {
    return (
      state.bindedPositions && state.bindedPositions.find(item => item.active && item.belongsTo === belongsTo.BINDPOSITIONS)
    )
  },
  // 压风机系统点
  getPressureFanPositions: state => {
    return state.bindedPositions.filter(item => item.type !== 'component' && item.belongsTo === belongsTo.PRESSUREFAN)
  },
  getActivePressureFan: state => {
    return state.bindedPositions.find(item => item.active && item.belongsTo === belongsTo.PRESSUREFAN)
  }
}

let mutations = {
  setPositions(state, data) {
    state.bindedPositions = data || []
  },
  addPosition(state, data) {
    if (state.bindedPositions) {
      state.bindedPositions.forEach(ele => {
        ele.active = false
      })
    }
    state.bindedPositions = state.bindedPositions.concat(data)
  },
  updatePosition(state, data) {
    state.bindedPositions = state.bindedPositions.map(item => {
      if (data && item.id === data.id) {
        item = data
        data.flag ? item.active = true : item.active = false
      } else {
        item.active = false
      }
      return {...item}
    })
  },
  removePosition(state, data) {
    let index = state.bindedPositions.findIndex(item => item.id === data.id)
    if (index > -1) {
      state.bindedPositions.splice(index, 1)
    }
  },
  // changeState(state, data) {
  //   if (state.bindedPositions && data) {
  //     state.bindedPositions = state.bindedPositions.map(ele => {
  //       let info = data.find(item => item.tag === ele.bindGuid)
  //       if (info) {
  //         ele.value = info.value
  //         ele.unit = info.unit || ''
  //         ele.isAlarm = info.state === '正常' ? false : true
  //       }
  //       return { ...ele }
  //     })
  //   }
  // }
}

let actions = {
  async initPositions({ commit }) {
    // 异步获取数据
    getAllPositions()
      .then(result => {
        const list = result.data && result.data.map(item => { 
          return new Position({...item}) 
        })
        commit('setPositions', list)
      })
      .catch(() => {
        commit('showErrorMsg', '获取初始化数据失败！', { root: true })
      })
  },
  addPosition({ commit }, payload) {
    if (payload) {
      const info = new Position(payload)
      createPosition(info)
        .then(result => {
          commit('addPosition', Object.assign(payload, result.data))
          commit('showSuccessMsg', '保存成功', {
            root: true
          })
        })
        .catch(error => {
          commit(
            'showErrorMsg',
            (error && error.message) || '保存失败！',
            {
              root: true
            }
          )
        })
    }
  },
  updatePosition({ commit }, payload) {
    if (payload) {
      const info = new Position(payload)
      updatePosition(info)
        .then(result => {
          commit('updatePosition', Object.assign(payload, result.data))
          commit('showSuccessMsg', '更新成功', {
            root: true
          })
        })
        .catch(error => {
          commit(
            'showErrorMsg',
            (error && error.message) || '更新失败！',
            {
              root: true
            }
          )
        })
    }
  },
  deletePosition({ commit }, payload) {
    if (payload && payload.id) {
      const info = new Position(payload)
      deletePosition(info)
        .then(() => {
          commit('removePosition', info)
          commit('showSuccessMsg', '删除成功', {
            root: true
          })
        })
        .catch(error => {
          commit('showErrorMsg', (error && error.message) || '删除失败', {
            root: true
          })
        })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
