import http from '@/store/http.js'

export default {
  namespaced: true,
  actions: {
    create({ commit, state }, form) {
      return http.post('/system/menu/create', form)
    },
    update({ commit, state }, form) {
      return http.post(`/system/menu/update`, form)
    },
    delete({ commit, state }, rows) {
      return http.post('/system/menu/destroy', rows)
    },
    search({ commit, state }, params) {
      return http.post('/system/menu/findAll', params)
    }
  }
}