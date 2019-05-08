/*
  creator: 贾康宁
  date: 2019-03-15
  description: 部门路由
*/
const router = require('express').Router()
const { create, update, destroy, findAll, setDepotPerson, getContactsIdsById } = require('../../controller/system/department')

// 部门路由
router.post('/department/create', create)
router.post('/department/update', update)
router.post('/department/delete', destroy)
router.post('/department/findAll', findAll)
router.post('/department/setDepotPerson', setDepotPerson)
router.post('/department/getContactsIdsById', getContactsIdsById)

module.exports = router