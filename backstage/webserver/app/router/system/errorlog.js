/**
 * author:李少华
 * created_at:2019/3/19
 * */
const router = require('express').Router()
const { create, findAll, destroy } = require('../../controller/system/errorLog')

router.post('/error/create', create)
router.post('/error/findAll', findAll)
router.post('/error/delete', destroy)

module.exports = router
