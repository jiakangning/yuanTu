/**
 * @author  赵赛赛
 * @date 2019/03/18
 */
const Sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')
const Op = require('sequelize').Op
const buildDefaultOption = require('../../util/buildDefaultOption.js')

const LogLogin = dbCtx.define('position', {
  account: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'account'
  },
  member: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'member',
  },
  lTime: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'l_time'
  },
  isPass: {
    type: Sequelize.BOOLEAN,
    field: 'is_pass'
  },
  ip: {
    type: Sequelize.STRING,
    field: 'ip'
  },
  browser: {
    type: Sequelize.STRING,
    field: 'browser'
  }
}, {
  tableName: 'system_log_login',
  underscored: true,
  paranoid: true
})

LogLogin.buildOptions = function (options = {}) {
  const { account = '', lTime } = options
  let result = buildDefaultOption(options)
  account && (result.where.account = { [Op.like]: '%' + account + '%' })
  lTime && lTime.lTime && (result.where.lTime = { [Op.lt]: lTime[0], [Op.gt]: lTime[1] })
  return result
}

LogLogin.isExist = function (id) {
  return LogLogin.findByPk(id)
}

module.exports = LogLogin
