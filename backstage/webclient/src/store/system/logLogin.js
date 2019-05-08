import http from '@/store/http.js'

export default {
  namespaced: true,
  actions: {
    create({commit, state}, form) {
      return http.post('/system/logLogin/create', form)
    },
    delete({commit, state}, rows) {
      return http.post('/system/logLogin/delete', rows)
    },
    search({commit, state}, params) {
      return http.post('/system/logLogin/findAll', params)
    }
  }
}