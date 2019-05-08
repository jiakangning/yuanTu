/*
  creator: 贾康宁
  date: 2019-03-15
  description: 角色路由
*/
const router = require('express').Router()
const { create, update, destroy, findAll, getCode, getPermission, authorize, getMobileModules, authorizeMobile } = require('../../controller/system/role')

// 角色路由
router.post('/role/create', create)
router.post('/role/update', update)
router.post('/role/delete', destroy)
router.post('/role/findAll', findAll)
router.post('/role/getCode', getCode)
router.post('/role/authorize', authorize)
router.post('/role/getPermission', getPermission)
router.post('/role/getMobileModules', getMobileModules)
router.post('/role/authorizeMobile', authorizeMobile)

module.exports = router