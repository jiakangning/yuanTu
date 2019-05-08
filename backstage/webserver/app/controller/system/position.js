/**
 * @author 赵赛赛
 * @date 2019-03-17
 */
const PositionManager = require('../../service/system/PositionManager')
const formatResponse = require('../../util/formatResponse.js')

exports.create = function (req, res) {
  new PositionManager().create(req.body, formatResponse(res))
}

exports.update = function (req, res) {
  new PositionManager().update(req.body, formatResponse(res))
}

exports.destroy = function (req, res) {
  new PositionManager().destroy(req.body, formatResponse(res))
}

exports.findAll = function (req, res) {
  new PositionManager().findAll(req.body, formatResponse(res))
}
