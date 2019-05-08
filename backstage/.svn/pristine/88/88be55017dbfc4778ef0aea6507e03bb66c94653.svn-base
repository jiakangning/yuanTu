/*
 * @Author: zhaoqinglong
 * @Date: 2019-03-16 12:41:33
 * @Last Modified by: zhaoqinglong
 * @Last Modified time: 2019-03-19 14:38:09
 */

const express = require('express')
const {
  create,
  update,
  getContacts,
  getContactById,
  destroy
} = require('../../controller/system/contact')

const router = express.Router()
router.post('/contact/create', create)
router.post('/contact/findAll', getContacts)
router.post('/contact/update', update)
router.post('/contact/findOne', getContactById)
router.post('/contact/delete', destroy)

module.exports = router
