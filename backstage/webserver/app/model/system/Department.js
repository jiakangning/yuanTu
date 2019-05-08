/*
  creator: 贾康宁
  date: 2019-03-15
  description: 部门模型
*/
const Sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')
const { phoneNum } = require('../../util/validator.regex')
const Op = require('sequelize').Op
const buildDefaultOption = require('../../util/buildDefaultOption.js')

const DepartmentModel = dbCtx.define('department', {
  author: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  editor: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  isValid: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true
    },
    field: 'is_valid',
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(50),
    unique: true
  },
  telphone: {
    type: Sequelize.STRING(20),
    unique: false,
    validate: {
      is: phoneNum
    }
  },
  address: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  description: {
    type: Sequelize.STRING(500),
    allowNull: true
  },
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    field: 'parent_id'
  },
  rtPath: {
    type: Sequelize.STRING(50),
    allowNull: true,
    field: 'rt_path'
  },
  slIndex: {
    type: Sequelize.INTEGER,
    field: 'sl_index',
    allowNull: false
  },
  supervisor: {
    type: Sequelize.INTEGER,
    field: 'supervisor'
  },
  inCharges: {
    type: Sequelize.STRING(100),
    allowNull: true,
    field: 'in_charges'
  }
}, {
  timestamps: true,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'system_membership_department'
})

const Connector = ','

DepartmentModel.beforeSave((depot) => {
  if (depot.changed('parentId') && depot.parentId) {
    return DepartmentModel
      .findByPk(depot.parentId)
      .then(result => {
        if (result.rtPath) {
          let parents = result.rtPath.split(Connector).concat(depot.parentId)
          depot.rtPath = parents.join(Connector)
        } else {
          depot.rtPath = depot.parentId
        }
        return depot
      })
  }
})

DepartmentModel.isExist = function (id) {
  return DepartmentModel.findByPk(id)
}

DepartmentModel.buildOptions = function ({ name = '', ...raw } = {}) {
  let result = buildDefaultOption(raw)
  name && (result.where.name = { [Op.like]: '%' + name + '%' })
  return result
}

DepartmentModel.prototype.getParentIds = function () {
  return this.rtPath ? this.rtPath.split(Connector).map(v => Number(v)) : []
}

DepartmentModel.setPerons = function ({ id, concats = [] }, { ConcatModel }) {

}

module.exports = DepartmentModel
