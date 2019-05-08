/*
  creator: 贾康宁
  date: 2019-03-15
  description: 部门控制器
*/
const DepotManage = require('../../service/system/DepartmentManager')
const formatResponse = require('../../util/formatResponse.js')

exports.create = function (req, res) {
  new DepotManage().create(req.body, formatResponse(res))
}

exports.update = function (req, res) {
  new DepotManage().update(req.body, formatResponse(res))
}

exports.destroy = function (req, res) {
  new DepotManage().delete(req.body, formatResponse(res))
}

exports.findAll = function (req, res) {
  new DepotManage().findAll(req.body, formatResponse(res))
}

exports.setDepotPerson = function (req, res) {
  new DepotManage().setDepotPerson(req.body, formatResponse(res))
}

exports.getContactsIdsById = function (req, res) {
  new DepotManage().getContactsIdsById(req.body, formatResponse(res))
}

