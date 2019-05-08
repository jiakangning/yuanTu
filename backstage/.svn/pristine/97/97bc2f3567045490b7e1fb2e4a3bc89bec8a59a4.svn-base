/**
 * author:甄岩岩
 * created_at:2019/3/15
 * */
const CommandManager = require('../../service/system/CommandManager')
const formatResponse = require('../../util/formatResponse.js')

exports.create = function (req, res) {
  new CommandManager().create(req.body, formatResponse(res))
}

exports.update = function (req, res) {
  new CommandManager().update(req.body, formatResponse(res))
}

exports.destroy = function (req, res) {
  new CommandManager().destroy(req.body, formatResponse(res))
}

exports.findAll = function (req, res) {
  new CommandManager().findAll(req.body, formatResponse(res))
}
