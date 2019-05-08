/**
 * @author 魏婷
 * @date 2019-03-18
 * @description 用户管理
 */

import http from '@/store/http.js'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    create({ commit, state }, form) {
      return http.post('/system//user/contact/create', form)
    },
    update({ commit, state }, form) {
      return http.post(`/system/user/contact/update`, form)
    },
    search({ commit, state }, params) {
      return http.post('/system/user/contact/findAll', params)
        .then(({ rows, count }) => {
          rows = rows.map(item => {
            let { id, username, password, isLocked, email, mobile, description, contact } = item
            return {
              id,
              username,
              password,
              isLocked,
              email,
              description,
              contactId: contact.id,
              address: contact.address,
              privatePhone: mobile,
              name: contact.name,
              sex: contact.sex,
              jobId: contact.jobId || '',
              departmentId: contact.departmentId,
              downholePhone: contact.downholePhone
            }
          })
          return { rows, count }
        })
    },
    delete({ commit, state }, rows) {
      return http.post('/system/user/contact/delete', rows)
    },
    setRole({ commit, state }, params) {
      console.log(params)
      return Promise.resolve({ success: true, result: '操作成功' })
    }
  }
}