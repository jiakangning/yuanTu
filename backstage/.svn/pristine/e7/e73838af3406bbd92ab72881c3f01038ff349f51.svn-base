const ErrorLogMnager = require('../../service/system/ErrorLogManager')
const formatResponse = require('../../util/formatResponse.js')

exports.create = function (req, res) {
  new ErrorLogMnager().create(req.body, formatResponse(res))
}

exports.findAll = function (req, res) {
  new ErrorLogMnager().findAll(req.body, formatResponse(res))
}

exports.destroy = function (req, res) {
  new ErrorLogMnager().destroy(req.body, formatResponse(res))
}
