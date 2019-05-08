
const state = {
  mapList: {
    photo: {value: 'photo', text: '影像', routeName: 'gisMap'},
    gis: {value: 'gis', text: '二维', routeName: 'gisMap'},
    unity: {value: 'unity', text: '三维', routeName: 'unityMap'}
  },
  // 当前地图类型
  currnetMap: null,
  // 当前地图中心点坐标
  currentCenter: [37403666.8573, 4278880.4264],
  // 当前缩放级别
  currentZoom: 14,
  // 当前旋转角度
  currentAngle: 0
}

const mutations = {

}

const actions = {
  changeMapType({state}, type) {
    if(type) {
      state.mapType = type
    } else {
      state.type = state.mapList.gis
    }
  },
  changeCenterZoom({state}, payload) {
    if(payload) {
      const {center, zoom, angle} = payload
      state.currentCenter = center
      state.currentZoom = zoom
      state.currentAngle = angle || 0
    } else {
      state.currentCenter = [37403666.8573, 4278880.4264]
      state.currentZoom = 14
      state.currentAngle = 0
    }
  }
}

export default {
  namespaces: true,
  state,
  mutations,
  actions
}