/**
 * @author 魏婷
 * @date 2019-03-18
 * @description 通讯录管理
 */

import http from '@/store/http.js'
export default {
  namespaced: true,
  actions: {
    create({ commit, state }, form) {
      return http.post('/system/contact/create', form)
    },
    update({ commit, state }, form) {
      return http.post(`/system/contact/update`, form)
    },
    search({ commit, state }, params) {
      return http.post('/system/contact/findAll', params)
    },
    delete({ commit, state }, rows) {
      return http.post('/system/contact/delete', rows)
    }
  }
}