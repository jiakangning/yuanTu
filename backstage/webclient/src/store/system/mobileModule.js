import http from '@/store/http.js'

export default {
  namespaced: true,
  actions: {
    create({commit, state}, form) {
      return http.post('/system/mobileModule/create', form)
    },
    update({commit, state}, form) {
      return http.post(`/system/mobileModule/update`, form)
    },
    delete({commit, state}, rows) {
      return http.post('/system/mobileModule/delete', rows)
    },
    search({commit, state}, params) {
      return http.post('/system/mobileModule/findAll', params)
    }
  }
}