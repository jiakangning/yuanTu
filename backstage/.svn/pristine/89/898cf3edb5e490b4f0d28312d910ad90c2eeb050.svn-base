import http from '@/store/http.js'

export default {
  namespaced: true,
  actions: {
    create({ commit, state }, form) {
      return http.post('/system/department/create', form)
    },
    update({ commit, state }, form) {
      return http.post('/system/department/update', form)
    },
    delete({ commit, state }, rows) {
      return http.post('/system/department/delete', rows)
    },
    search({ commit, state }, params) {
      return http.post('/system/department/findAll', params)
    },
    getFuns() {
      return http.post('/system/contact/findAll')
    },
    getFunsByDepotId({ commit, state }, id) {
      return http.post('/system/department/getContactsIdsById', { id })
    },
    setAuth({ commit, state }, { id, contacts }) {
      return http.post('/system/department/setDepotPerson', { id, contacts })
    }
  }
}