/**
 * @author 甄岩岩
 * @created_at 2019/3/15
 */
const Sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')
const buildDefaultOption = require('../../util/buildDefaultOption.js')
const Op = require('sequelize').Op
const Connector = ','
const compareData = require('../../../app/util/compareData')
const async = require('async')

const Menu = dbCtx.define('menu', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  authorId: { type: Sequelize.INTEGER, field: 'author_id' },
  editorId: { type: Sequelize.INTEGER, field: 'editor_id' },
  enableState: { type: Sequelize.INTEGER, field: 'enable_state' },
  authorizeState: { type: Sequelize.STRING(10), field: 'authorize_state' },
  eKey: { type: Sequelize.STRING(50), unique: true, allowNull: false, field: 'e_key' },
  text: { type: Sequelize.STRING(50), allowNull: false },
  icon: { type: Sequelize.STRING },
  startUp: { type: Sequelize.STRING, field: 'start_up' },
  description: { type: Sequelize.TEXT },
  parentId: { type: Sequelize.INTEGER, field: 'parent_id' },
  rtPath: { type: Sequelize.STRING(500), field: 'rt_path' },
  slIndex: { type: Sequelize.INTEGER, field: 'sl_index' }
}, {
  tableName: 'system_menu_info',
  underscored: true
})

Menu.beforeSave((instance) => {
  if (instance.changed('parentId') && instance.parentId) {
    return Menu
      .findByPk(instance.parentId)
      .then(res => {
        if (res.rtPath) {
          let parents = res.rtPath.split(Connector).concat(instance.parentId)
          instance.rtPath = parents.join(Connector)
        } else {
          instance.rtPath = instance.parentId
        }
        return instance
      })
  }
})
/**
 *
 * @param text
 * @param raw
 * @returns {{where: {}, order: Array}|result}
 */
Menu.buildOptions = function ({ text = '', ...raw }) {
  let result = buildDefaultOption(raw)
  text && (result.where.text = { [Op.like]: '%' + text + '%' })
  return result
}
/**
 *
 * @param id
 */
Menu.isExist = function (id) {
  return Menu.findByPk(id)
}

Menu.createMenuAndCommandCascade = function (input, { Menu, Command }) {
  return dbCtx.transaction(t => {
    return Menu.create(input, { include: [Command], transaction: t })
  })
}

Menu.findCommand = function (id, cmd) {
  let condition = { where: { id }, include: [{ model: cmd }] }
  return Menu.findAll(condition)
    .then(menus => {
      if (menus && menus[0]) {
        return Promise.resolve(menus[0])
      } else {
        return Promise.reject(new Error('查无数据'))
      }
    })
}

Menu.mergeUpdate = function (menu, raw, { createArr, updateArr, destroyArr }) {
  return dbCtx.transaction(function (t) {
    return menu.update(raw, { transaction: t })
      .then(newMenu => {
        let arr = []
        if (createArr && createArr.length > 0) {
          createArr = Command.build(createArr).map(v => {
            return v.save({ transaction: t })
          })
          arr.push(Promise.all(createArr))
        } else {
          arr.push(Promise.resolve())
        }
        if (updateArr && updateArr.length > 0) {
          updateArr = updateArr.map(v => {
            let { id, ...condition } = v
            return Command.update(condition, { where: { id }, transaction: t })
          })
          arr.push(Promise.all(updateArr))
        }
        if (destroyArr && destroyArr.length > 0) {
          let ids = destroyArr.map(v => v.id)
          arr.push(Command.destroy({ where: { id: { [Op.in]: ids } }, transaction: t }))
        }
        return Promise.all(arr)
      })
      .then(cmdArr => {
        if (cmdArr[0]) {
          return menu.setCommands(cmdArr[0], { transaction: t })
        } else {
          return Promise.reject()
        }
      })
  })
}
/**
 * 级联更新menu和command表
 * @param id
 * @param commands
 * @param raw
 * @param Menu
 * @param Command
 * @returns {Promise}
 */
Menu.updateMenuAndCommandCascade = function ({ id, commands, ...raw }, { Menu, Command }) {
  Menu.findCommand(id, Command)
    .then(menu => {
      if (!menu.commands) {
        menu.commands = []
      }
      let { createArr, updateArr, destroyArr } = compareData(commands, menu.commands)
      Menu.mergeUpdate({ menu, raw }, { createArr, updateArr, destroyArr })
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

Menu.destroyMenuAndCommandCascade = function (input, { Menu, Command }) {
  const rows = Array.isArray(input) ? input : [input]
  const condition = { where: { id: { [Op.in]: rows } } }
  return dbCtx.transaction(t => {
    return Menu.findAll({
      ...condition,
      include: [{ model: Command }],
      transaction: t
    })
      .then(menus => {
        let cmdIds = menus.reduce(function (result, item) {
          let arr = []
          if (item.commands && item.commands.length > 0) {
            arr = (item.commands && item.commands.length > 0) ? item.commands.map(v => v.id) : []
          }
          result = result.concat(arr)
          return result
        }, [])
        if (cmdIds.length > 0) {
          return Command.destroy({ where: { id: { [Op.in]: cmdIds } }, transaction: t })
        } else {
          return Promise.resolve()
        }
      }).then(() => {
        return Menu.destroy({ ...condition, transaction: t })
      })
  })
}
Menu.prototype.getParentIds = function () {
  return this.rtPath ? this.rtPath.split(Connector) : []
}

Menu.prototype.mergeUpdate = function (raw, { createArr, updateArr, destroyArr }) {
  return dbCtx.transaction((t) => {
    return this.update(raw, { transaction: t })
      .then(newMenu => {
        let arr = []
        if (createArr && createArr.length > 0) {
          arr = Command.build(createArr).map(v => v.save({ transaction: t }))
        } else {
          arr.push(Promise.resolve())
        }
        if (updateArr && updateArr.length > 0) {
          updateArr = updateArr.map(v => {
            let { id, ...condition } = v
            return Command.update(condition, { where: { id }, transaction: t })
          })
          arr.push(Promise.all(updateArr))
        }
        if (destroyArr && destroyArr.length > 0) {
          let ids = destroyArr.map(v => v.id)
          arr.push(Command.destroy({ where: { id: { [Op.in]: ids } }, transaction: t }))
        }
        return Promise.all(arr)
      })
      .then(cmdArr => {
        if (cmdArr[0]) {
          return this.setCommands(cmdArr[0], { transaction: t })
        } else {
          return Promise.reject()
        }
      })
  })
}

// Menu.prototype.mergeUpdate = function (raw, { createArr, updateArr, destroyArr }) {
//   return dbCtx.transaction((t) => {
//     return this.update(raw, { transaction: t })
//       .then(newMenu => {
//         let arr = []
//         if (createArr && createArr.length > 0) {
//           createArr = Command.build(createArr).map(v => {
//             return v.save({ transaction: t })
//           })
//           arr.push(Promise.all(createArr))
//         } else {
//           arr.push(Promise.resolve())
//         }
//         if (updateArr && updateArr.length > 0) {
//           updateArr = updateArr.map(v => {
//             let { id, ...condition } = v
//             return Command.update(condition, { where: { id }, transaction: t })
//           })
//           arr.push(Promise.all(updateArr))
//         }
//         if (destroyArr && destroyArr.length > 0) {
//           let ids = destroyArr.map(v => v.id)
//           arr.push(Command.destroy({ where: { id: { [Op.in]: ids } }, transaction: t }))
//         }
//         return Promise.all(arr)
//       })
//       .then(cmdArr => {
//         if (cmdArr[0]) {
//           return this.setCommands(cmdArr[0], { transaction: t })
//         } else {
//           return Promise.reject()
//         }
//       })
//   })
// }

module.exports = Menu
