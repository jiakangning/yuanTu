import http from '@/store/http.js'

export default {
  namespaced: true,
  actions: {
    search({commit, state}, params) {
      return http.post('/system/error/findAll', params)
    },
    delete({commit, state}, rows) {
      return http.post('/system/error/delete', rows)
    }
  }
}