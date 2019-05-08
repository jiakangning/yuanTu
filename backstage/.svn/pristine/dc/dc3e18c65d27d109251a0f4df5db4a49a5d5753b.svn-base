/*
 * @Author: zhaoqinglong
 * @Date: 2019-03-20 15:42:23
 * @Last Modified by: zhaoqinglong
 * @Last Modified time: 2019-03-21 14:12:46
 */

const router = require('express').Router()
const { create, createFatherAndChildren, update, destroy, findAll } = require('../../controller/system/dictionary')

router.post('/dictionary/create', create)
router.post('/dictionary/createAll', createFatherAndChildren)
router.post('/dictionary/update', update)
router.post('/dictionary/delete', destroy)
router.post('/dictionary/findAll', findAll)

module.exports = router
