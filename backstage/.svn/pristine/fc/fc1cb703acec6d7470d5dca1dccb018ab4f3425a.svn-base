// 三维模块
import localeConfig from '../../i18n/locale'

const layerLevel = {
  first: 'type',
  second: 'group',
  third: 'item'
}

const helperFuncs = {
  buildTree: (list, orgList) => {
    list.forEach(ele => {
      // if (ele.parent && !ele.parent.visible) {
      //   ele.visible = false
      // }
      ele.children = orgList.filter(item => item.parent === ele)
      if (ele.children && ele.children.length) {
        helperFuncs.buildTree(ele.children, orgList, ele)
      }
    });
  },
  getGroups: (type, typeList, category) => {
    let group = [], info
    typeList && typeList.forEach(ele => {
      info = JSON.parse(ele)
      if ((type != 'Polyline' && type != 'Polygon' && type != 'Mark') && !group.find(g => g.name === info.Group)) {
        group.push({
          name: info.Group,
          level: layerLevel.second,
          visible: info.Visible,
          parent: category
        })
      }
    })
    return group
  },
  getParent: (type, category, group, info) => {
    return (type === 'Polyline' || type === 'Polygon' || type === 'Mark') ? category : (group && group.find(g => g.name === info.Group) || null)
  }
}

const state = {
  loaded: false,
  // 是否为三维场景
  isInUnity: false,
  // 浏览模式
  currentBrowserStyle: 'Free',
  // 当前激活的工具名称
  currentToolType: '',
  // 当前激活的控制开关
  currnetControlSwitch: '',
  // 当前选中实体
  currentModel: null,
  // 当前选中的实体
  checkedEntity: '',
  // 图层集合
  layerList: []
}

const getters = {
  layerTreeData: state => {
    const rootLayer = [...state.layerList].filter(item => {
      return item.level === layerLevel.first
    })
    if (rootLayer && rootLayer.length) {
      helperFuncs.buildTree(rootLayer, [...state.layerList])
    }
    return rootLayer
  },
  defaultVisibleLayers: state => {
    if (state.layerList && state.layerList.length) {
      const visibleList = state.layerList.filter(item => item.visible && item.guid)
      return visibleList && visibleList.map(item => item.guid) || []
    } else {
      return []
    }
  }
}

const mutations = {
  /* 是否在unity中打开 */
  updateIsInUnity(state, data) {
    state.isInUnity = data
  },
  // 保存三维浏览方式
  saveUnityBrowser(state, data) {
    state.unityBrowser = data
  },
  // 保存三维选中工具
  saveUnityToolType(state, data) {
    state.unityToolType = data
  },
  setLayers(state, data) {
    if (data && data.length) {
      state.layerList = data
    } else {
      state.layerList = []
    }
  },
  insertLayer(state, data) {
    const result = state.layerList.find(item => item.name === data.name && item.level === data.level && item.type === data.type)
    if (!result) {
      state.layerList = state.layerList.concat([data])
    }
  },
  insertLayerList(state, data) {
    if (data && data.length) {
      let result
      data.forEach(ele => {
        result = state.layerList.find(item => item.name === ele.name && item.level === ele.level && item.type === ele.type)
        if (!result) {
          state.layerList = state.layerList.concat([ele])
        }
      })
    }
  },
  removeLayer(state, data) {
    if(state.layerList.length && data) {
      const index = state.layerList.indexOf(data)
      if(index > -1) {
        state.layerList.splice(index, 1)
      }
    }
  },
  changeLayerVisible (state, payload) {
    const index = state.layerList.indexOf(payload.data)
    if(index > -1) {
      state.layerList[index].visible = payload.visible
      const temp = state.layerList[index]
      state.layerList.splice(index, 1, temp)
    }
  },
  setCurrentModel(state, data) {
    state.currentModel = data
  }
}

const actions = {
  // 当前是否为三维场景运行环境
  setUnityEnvironment({ commit }, isInUnity) {
    commit('updateIsInUnity', isInUnity)
  },
  // 三维场景是否已加载
  loadUnity({ state }, loaded) {
    state.loaded = loaded
  },
  // 加载图层数据
  loadLayers({ commit }, payload) {
    let sceneArray = [];
    console.log(payload)
    if (payload) {
      // 按组分类
      for (let type in payload) {
        let info
        let category = {
          name: localeConfig.unity.layer[type],
          level: layerLevel.first,
          type: type,
          visible: true
        }
        let group = helperFuncs.getGroups(type, payload[type], category)
        let typeArray = payload[type].map(item => {
          info = JSON.parse(item)
          return {
            name: info.Name,
            guid: info.GUID || info.ID,
            type: info.EntityType || info.LayerType,
            visible: info.Visible,
            parent: helperFuncs.getParent(type, category, group, info),
            level: layerLevel.third
          }
        })
        console.log(typeArray)
        sceneArray.push(category)
        sceneArray = sceneArray.concat(group, typeArray)
      }
      console.log(sceneArray)
    }
    commit('setLayers', sceneArray)
  },
  // 插入图层数据
  insertLayer({ commit }, payload) {
    if (payload && Array.isArray(payload)) {
      commit('insertLayerList', payload)
    } else {
      commit('insertLayer', payload)
    }
  },
  // 移除图层数据
  removeLayer({commit}, payload) {
    commit('removeLayer', payload.data)
  },
  // 更改图层的显示状态
  changeLayerVisible({commit}, payload) {
    commit('changeLayerVisible', {layer: payload.data, visible: payload.visible})
  },
  // 设置当前场景中心点的模型
  setCurrentModel({commit}, data) {
    if(data) {
      commit('setCurrentModel', data)
    }
  },
  // 更改当前选中的工具
  changeCurrentTool({state}, tool) {
    if(tool) {
      state.currentToolType = tool
    } else {
      state.currentToolType = ''
    }
  },
  // 更改当前浏览方式
  changeBrowseStyle({state}, style) {
    if(style) {
      state.currentBrowserStyle = style
    } else {
      state.currentBrowserStyle = 'Free'
    }
  },
  // 更改当前控制开关
  changeControlSwitch({state}, type) {
    if(type) {
      state.currnetControlSwitch = type
    } else {
      state.currnetControlSwitch = ''
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}