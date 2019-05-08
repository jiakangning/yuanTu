/**
 * @author 赵赛赛
 * @date 2019-03-17
 */
const router = require('express').Router()
const { create, update, destroy, findAll } = require('../../controller/system/Position')

router.post('/position/create', create)
router.post('/position/update', update)
router.post('/position/delete', destroy)
router.post('/position/findAll', findAll)

module.exports = router
