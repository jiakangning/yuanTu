/*
  creator: 贾康宁
  date: 2019-03-19
  description: role-menu-command中间表
*/
const Sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')

const RoleMenuCommand = dbCtx.define('roleMenuCommand', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    roleId: { type: Sequelize.INTEGER, allowNull: false, unique: 'roleMenuCommand', field: 'role_id' },
    cmdId: { type: Sequelize.INTEGER, unique: 'roleMenuCommand', allowNull: true, field: 'cmd_id' },
    moduleId: { type: Sequelize.INTEGER, unique: 'roleMenuCommand', allowNull: true, field: 'module_id' }
  },
  {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    tableName: 'system_role_module_permission'
  })

RoleMenuCommand.authorize = function ({ menus = [], commands = [], roleId }, { RoleMenuCommand }) {
  return dbCtx.transaction(t => {
    return RoleMenuCommand
      .destroy({ where: { roleId } }, { transaction: t })
      .then(() => {
        menus = menus.map(moduleId => ({ roleId, moduleId }))
        commands = commands.map(({ menu: moduleId, command: cmdId }) => ({ roleId, moduleId, cmdId }))
        let p = []
        menus.length && p.push(RoleMenuCommand.bulkCreate(menus, { transaction: t }))
        commands.length && p.push(RoleMenuCommand.bulkCreate(commands, { transaction: t }))
        return Promise.all(p)
      })
  })
}

module.exports = RoleMenuCommand
