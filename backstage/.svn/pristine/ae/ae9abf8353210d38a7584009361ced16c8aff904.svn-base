'use strict'

const Op = require('sequelize').Op

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    objectId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    surname: {
      type: DataTypes.STRING,
      field: 'fullname'
    },
    tag: {
      type: DataTypes.STRING,
      field: 'uniqueCode'
    },
    card: {
      type: DataTypes.STRING,
      field: 'cardSerial'
    },
    job: {
      type: DataTypes.STRING,
      field: 'workSerial'
    },
    mobile: {
      type: DataTypes.STRING,
      field: 'phone'
    },
    telphone: {
      type: DataTypes.STRING,
      field: 'groundPhone'
    }
  }, {
    tableName: 'sys_contact'
  })
  Employee.associate = function (models) {
    // associations can be defined here
  }
  Employee.findByCodes = function (codes, callback) {
    Employee.findAll({ where: { tag: { [Op.in]: codes } } })
      .then(staffs => callback(null, staffs))
      .catch(err => callback(err))
  }
  return Employee
}
