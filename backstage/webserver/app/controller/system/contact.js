/*
 * @Author: zhaoqinglong
 * @Date: 2019-03-16 12:41:12
 * @Last Modified by: zhaoqinglong
 * @Last Modified time: 2019-03-19 14:22:45
 */

const ContactManager = require('../../service/system/ContactManager')
const formatResponse = require('../../util/formatResponse')
exports.create = (req, res) => {
  let contactManager = new ContactManager()
  contactManager.create(req.body, formatResponse(res))
}
exports.update = (req, res) => {
  let contactManager = new ContactManager()
  contactManager.update(req.body, formatResponse(res))
}
exports.getContacts = (req, res) => {
  let contactManager = new ContactManager()
  contactManager.getContacts(req.body, formatResponse(res))
}
exports.getContactById = (req, res) => {
  let contactManager = new ContactManager()
  contactManager.getContactById(req.body, formatResponse(res))
}
exports.destroy = (req, res) => {
  let contactManager = new ContactManager()
  contactManager.destroy(req.body, formatResponse(res))
}
