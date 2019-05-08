/**
 * author:甄岩岩
 * created_at:2019/3/15
 * */
const MenuManager = require('../../service/system/MenuManager')
const formatResponse = require('../../util/formatResponse.js')

exports.create = function (req, res) {
  new MenuManager().create(req.body, formatResponse(res))
}

exports.update = function (req, res) {
  new MenuManager().update(req.body, formatResponse(res))
}

exports.destroy = function (req, res) {
  new MenuManager().destroy(req.body, formatResponse(res))
}

exports.findAll = function (req, res) {
  new MenuManager().findAll(req.body, formatResponse(res))
}

exports.getTree = function (req, res) {
  new MenuManager().getTree(req.body, formatResponse(res))
}