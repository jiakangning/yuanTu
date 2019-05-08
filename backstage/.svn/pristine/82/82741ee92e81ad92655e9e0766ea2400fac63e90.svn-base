import http from '@/store/http.js'

export default {
  namespaced: true,
  actions: {
    create({ commit, state }, form) {
      return http.post('/system/position/create', form)
    },
    update({ commit, state }, form) {
      return http.post('/system/position/update', form)
    },
    delete({ commit, state }, rows) {
      return http.post('/system/position/delete', rows)
    },
    search({ commit, state }, params) {
      return http.post('/system/position/findAll', params)
    }
  }
}