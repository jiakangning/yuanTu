/*
 * @Author: zhaoqinglong
 * @Date: 2019-03-18 10:48:52
 * @Last Modified by: zhaoqinglong
 * @Last Modified time: 2019-03-18 16:13:36
 */

const express = require('express')
const {
  addUserAndContact,
  updateUserAndContact,
  getUserAndContact,
  getUsersIncludeContact
} = require('../../controller/system/User')

const router = express.Router()
/**
 * 创建联系人和用户
 */
router.post('/user/contact', addUserAndContact)
/**
 * 修改联系人和用户
 */
router.post('/user/:userId/contact/:contactId', updateUserAndContact)
/**
 * 根据userid查询联系人和用户
 */
router.get('/userContact/:userId', getUserAndContact)
/**
 * 查询用户列表
 */
router.get('/userContacts', getUsersIncludeContact)

module.exports = router
