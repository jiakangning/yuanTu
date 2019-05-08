/**
 * @author 赵赛赛
 * @date 2019-03-19
 */
const MobileModuleManger = require('../../service/system/MobileModuleManger')
const formatResponse = require('../../util/formatResponse.js')

exports.create = function (req, res) {
  new MobileModuleManger().create(req.body, formatResponse(res))
}

exports.update = function (req, res) {
  new MobileModuleManger().update(req.body, formatResponse(res))
}

exports.destroy = function (req, res) {
  new MobileModuleManger().destroy(req.body, formatResponse(res))
}

exports.findAll = function (req, res) {
  new MobileModuleManger().findAll(req.body, formatResponse(res))
}
