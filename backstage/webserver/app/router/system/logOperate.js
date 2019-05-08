/**
 * author:赵赛赛
 * created_at:2019/3/19
 * */
const router = require('express').Router()
const { create, destroy, findAll } = require('../../controller/system/logOperate.js')

router.post('/logOperate/create', create)
router.post('/logOperate/delete', destroy)
router.post('/logOperate/findAll', findAll)

module.exports = router
