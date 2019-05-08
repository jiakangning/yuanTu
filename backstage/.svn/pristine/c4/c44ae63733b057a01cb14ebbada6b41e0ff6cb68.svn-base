/**
 * @author 赵赛赛
 * @date 2019-03-19
 */
const LogOperateManger = require('../../service/system/LogOperateManger.js')
const formatResponse = require('../../util/formatResponse.js')

exports.create = function (req, res) {
  new LogOperateManger().create(req.body, formatResponse(res))
}

exports.destroy = function (req, res) {
  new LogOperateManger().destroy(req.body, formatResponse(res))
}

exports.findAll = function (req, res) {
  new LogOperateManger().findAll(req.body, formatResponse(res))
}
