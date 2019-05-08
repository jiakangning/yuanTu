/*
 * @Author: zhaoqinglong
 * @Date: 2019-03-18 10:48:52
 * @Last Modified by: zhaoqinglong
 * @Last Modified time: 2019-03-19 13:52:14
 */
const express = require('express')
const {
  addUserAndContact,
  updateUserAndContact,
  getUserAndContactById,
  getUsersIncludeContact,
  deleteUserAndContact
} = require('../../controller/system/userContact')

const router = express.Router()
/**
 * 创建联系人和用户
 */
router.post('/user/contact/create', addUserAndContact)
/**
 * 修改联系人和用户
 */
router.post('/user/contact/update', updateUserAndContact)
/**
 * 删除联系人和用户
 */
router.post('/user/contact/delete', deleteUserAndContact)
/**
 * 根据userid查询联系人和用户
 */
router.post('/user/contact/findone', getUserAndContactById)
/**
 * 查询用户列表
 */
router.post('/user/contact/findAll', getUsersIncludeContact)

module.exports = router
