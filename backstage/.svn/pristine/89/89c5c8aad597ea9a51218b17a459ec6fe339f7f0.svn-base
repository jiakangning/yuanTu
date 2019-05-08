/*
 * @Author: zhaoqinglong
 * @Date: 2019-03-19 13:30:25
 * @Last Modified by: zhaoqinglong
 * @Last Modified time: 2019-03-20 13:39:00
 */

const UserContactManager = require('../../service/system/UserContactManager')
const formatResponse = require('../../util/formatResponse')

// 添加用户和联系人
exports.addUserAndContact = (req, res, next) => {
  let userManager = new UserContactManager()
  const {
    username,
    password,
    name,
    privatePhone,
    downholePhone,
    address,
    email,
    isLocked = false,
    photo,
    description
  } = req.body

  // let user = fn(req.body, [])
  // let contact = fn([])
  // 构建user和contact对象
  let userAndContact = {
    username,
    password,
    mobile: privatePhone,
    email,
    isLocked,
    description,
    contact: {
      name,
      privatePhone,
      downholePhone,
      address,
      photo,
      description
    }
  }
  userManager.addUserAndContact(userAndContact, formatResponse(res))
}

// 修改用户和联系人
exports.updateUserAndContact = (req, res, next) => {
  let userManager = new UserContactManager()
  const {
    id,
    contactId,
    username,
    password,
    name,
    privatePhone,
    downholePhone,
    address,
    email,
    isLocked,
    photo,
    description
  } = req.body
  let userAndContact = {
    id,
    username,
    password,
    mobile: privatePhone,
    email,
    isLocked,
    description,
    contact: {
      id: contactId,
      name,
      privatePhone,
      downholePhone,
      address,
      photo,
      description
    }
  }
  userManager.updateUserAndContact(userAndContact, formatResponse(res))
}
// 修改用户和联系人
exports.deleteUserAndContact = (req, res, next) => {
  let userManager = new UserContactManager()
  userManager.deleteUserAndContact(req.body, formatResponse(res))
}

// 查询用户和联系人
exports.getUserAndContactById = (req, res, next) => {
  let userManager = new UserContactManager()
  userManager.getUserContact(req.body, formatResponse(res))
}
// 查询用户和联系人列表
exports.getUsersIncludeContact = (req, res, next) => {
  let userManager = new UserContactManager()
  userManager.getUserContacts(req.body, formatResponse(res))
}
