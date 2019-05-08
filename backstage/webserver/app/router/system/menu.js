/**
 * author:甄岩岩
 * created_at:2019/3/15
 * */
const router = require('express').Router()
const { create, update, destroy, findAll, getTree } = require('../../controller/system/menu')
// 菜单路由
router.post('/menu/create', create)
router.post('/menu/update', update)
router.post('/menu/destroy', destroy)
router.post('/menu/findAll', findAll)
router.post('/menu/getTree', getTree)

module.exports = router
