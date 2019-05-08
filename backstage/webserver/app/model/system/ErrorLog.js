/**
 * @author 李少华
 * date 2019-3-19
 */
const Sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')
const Op = require('sequelize').Op
const buildDefaultOption = require('../../util/buildDefaultOption.js')

const ErrorLog = dbCtx.define('ErrorLog', {
  scale: {
    type: Sequelize.STRING,
    field: 'scale',
    allowNull: false
  },
  subject: {
    type: Sequelize.STRING,
    field: 'subject',
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    field: 'description',
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    field: 'author',
    allowNull: false
  },
  creationDate: {
    type: Sequelize.DATE,
    field: 'creation_date',
    allowNull: false
  }
}, {
  tableName: 'system_log_error',
  underscored: true,
  paranoid: true
})

ErrorLog.buildOptions = function (options = {}) {
  const { scale, creationDate, author = '' } = options
  let result = buildDefaultOption(options)
  scale && (result.where.scale = { [Op.in]: scale })
  author && (result.where.author = { [Op.like]: `%${author}%` })
  creationDate && creationDate.length && (result.where.lTime = { [Op.gt]: creationDate[0], [Op.lt]: creationDate[1] })
  return result
}

module.exports = ErrorLog
