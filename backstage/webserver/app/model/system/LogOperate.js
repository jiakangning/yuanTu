/**
 * @author  赵赛赛
 * @date 2019/03/19
 */
const Sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')
const Op = require('sequelize').Op
const buildDefaultOption = require('../../util/buildDefaultOption.js')

const LogOperate = dbCtx.define('LogOperate', {
  module: {
    type: Sequelize.STRING,
    allowNull: false
  },
  moduleType: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'module_type'
  },
  path: {
    type: Sequelize.STRING
  },
  logDate: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'log_date'
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'user_id'
  },
  account: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'account'
  }
}, {
  tableName: 'system_log_operate',
  underscored: true,
  paranoid: true
})

LogOperate.buildOptions = function (options = {}) {
  const {account = '', logDate} = options
  let result = buildDefaultOption(options)
  account && (result.where.account = {[Op.like]: '%' + account + '%'})
  logDate && logDate.length && (result.where.logDate = {[Op.gt]: logDate[0], [Op.lt]: logDate[1]})
  return result
}

module.exports = LogOperate