/*
 * @Author: zhaoqinglong
 * @Date: 2019-03-20 15:37:28
 * @Last Modified by: zhaoqinglong
 * @Last Modified time: 2019-03-21 14:11:51
 */
const DictionaryManager = require('../../service/system/DictionaryManager')
const formatResponse = require('../../util/formatResponse')

exports.create = function (req, res) {
  new DictionaryManager().create(req.body, formatResponse(res))
}
exports.createFatherAndChildren = function (req, res) {
  new DictionaryManager().createIncludeChildren(req.body, formatResponse(res))
}
exports.update = function (req, res) {
  new DictionaryManager().update(req.body, formatResponse(res))
}

exports.destroy = function (req, res) {
  new DictionaryManager().delete(req.body, formatResponse(res))
}

exports.findAll = function (req, res) {
  new DictionaryManager().findAll(req.body, formatResponse(res))
}
