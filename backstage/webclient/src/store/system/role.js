/**
 * @author 魏婷
 * @date 2019-03-18
 * @description 角色管理
 */

import http from '@/store/http.js'
export default {
  namespaced: true,
  actions: {
    create({ commit, state }, form) {
      return http.post('/system/role/create', form)
    },
    update({ commit, state }, form) {
      return http.post(`/system/role/update`, form)
    },
    search({ commit, state }, params) {
      return http.post('/system/role/findAll', params)
    },
    delete({ commit, state }, rows) {
      return http.post('/system/role/delete', rows)
    },
    getFuns() {
      return http.post('/system/menu/getTree')
    },
    getFunsByRoleId({ commit, state }, roleId) {
      return http.post('/system/role/getCode', { roleId })
    },
    setAuth({ commit, state }, { roleId, menuIds }) {
      return http.post('/system/role/authorize', { roleId, menuIds })
    },
    getMobileFuns() {
      return http.post('/system/mobileModule/findAll').then(({ rows, count }) => { return rows })
    },
    getMobileFunsByRoleId({ commit, state }, roleId) {
      return http.post('/system/role/getMobileModules', { roleId })
    },
    setMobileAuth({ commit, state }, { roleId, menuIds }) {
      return http.post('/system/role/authorizeMobile', { roleId, menuIds  })
    }
  }
}