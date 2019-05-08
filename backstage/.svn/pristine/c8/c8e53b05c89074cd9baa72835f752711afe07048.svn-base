/**
 * @author 赵赛赛
 * @date 2019-03-18
 */
const LogLoginManager = require('../../service/system/LogLoginManager.js')
const formatResponse = require('../../util/formatResponse.js')

exports.create = function (req, res) {
  new LogLoginManager().create(req.body, formatResponse(res))
}

exports.destroy = function (req, res) {
  new LogLoginManager().destroy(req.body, formatResponse(res))
}

exports.findAll = function (req, res) {
  new LogLoginManager().findAll(req.body, formatResponse(res))
}
