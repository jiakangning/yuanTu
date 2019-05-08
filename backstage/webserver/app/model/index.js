'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../../config', 'config.sequelize'))[env]
const db = {}

const Op = Sequelize.Op
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
}
let sequelize
const readdirRecurse = (dirname) => {
  fs.readdirSync(dirname, { withFileTypes: true })
    .forEach(item => {
      if (item.isDirectory()) {
        readdirRecurse(path.join(dirname, item.name))
      } else if (item.isFile()) {
        if (item.name.slice(-9) === '.Model.js') {
          const model = sequelize['import'](path.join(dirname, item.name))
          db[model.name] = model
        }
      }
    })
}

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], { ...config, operatorsAliases })
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, { ...config, operatorsAliases })
}

readdirRecurse(__dirname)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
