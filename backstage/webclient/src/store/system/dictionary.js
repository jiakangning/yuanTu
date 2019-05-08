import http from '@/store/http.js'

export default {
  namespaced: true,
  actions: {
    create({ commit, state }, form) {
      return http.post('/system/dictionary/createAll', form)
    },
    update({ commit, state }, form) {
      return http.post('/system/dictionary/update', form)
    },
    delete({ commit, state }, rows) {
      return http.post('/system/dictionary/delete', rows)
    },
    search({ commit, state }, params) {
      return http.post('/system/dictionary/findAll', params)
    },
  }
}