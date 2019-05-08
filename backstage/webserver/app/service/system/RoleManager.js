/**
 * @author 贾康宁
 * @date 2019-03-15
 * @description 角色流程
 */
const Op = require('sequelize').Op
const Role = require('../../model/system/Role')
const RoleMenuCommand = require('../../model/system/RoleMenuCommand')
const MobileModule = require('../../model/system/MobileModule')

class RoleManager {
  constructor (roleRepo = Role, roleMenuCommandRepo = RoleMenuCommand, mobileModuleRepo = MobileModule) {
    this.roleRepo = roleRepo
    this.roleMenuCommandRepo = roleMenuCommandRepo
    this.mobileModuleRepo = mobileModuleRepo
  }

  create (input, callback) {
    if (!input) {
      callback(new Error('请传入参数！'))
    } else {
      if (Array.isArray(input)) {
        this.roleRepo
          .bulkCreate(input)
          .then(roles => callback(null, roles))
          .catch(callback)
      } else {
        this.roleRepo
          .create(input)
          .then(role => callback(null, role))
          .catch(callback)
      }
    }
  }

  update (input, callback) {
    const { id, ...raw } = input
    this.roleRepo.isExist(id)
      .then(role => {
        return role ? role.update(raw) : Promise.reject(new Error('数据已被删除，无法修改！'))
      })
      .then(role => callback(null, role))
      .catch(callback)
  }

  delete (input, callback) {
    const rows = Array.isArray(input) ? input : [input]
    const condition = { where: { id: { [Op.in]: rows } } }
    this.roleRepo.destroy(condition)
      .then(count => callback(null, count))
      .catch(callback)
  }

  findAll (input, callback) {
    const options = this.roleRepo.buildOptions(input)
    this.roleRepo
      .findAndCountAll(options)
      .then(result => callback(null, result))
      .catch(callback)
  }

  /**
   * 角色授权
   * @param input
   * @param callback
   * @return {Promise<T | never>}
   */
  authorize (input = {}, callback) {
    if (!input.roleId) {
      callback(new Error('未传入角色！'))
    } else {
      this.roleMenuCommandRepo
        .authorize(input, { RoleMenuCommand: this.roleMenuCommandRepo })
        .then(results => callback(null, results))
        .catch(callback)
    }
  }

  /**
   * 根据角色获取 菜单和指令集合
   * @param input {Array, Number} roleId
   * @param callback
   */
  getPermission (input, callback) {
    const roles = Array.isArray(input) ? input : [input.roleId]
    this.roleMenuCommandRepo
      .findAll({ where: { roleId: { [Op.in]: roles } } })
      .then(data => {
        const results = data.reduce((results, item) => {
          const { moduleId, cmdId } = item
          moduleId && !cmdId && results.menus.push(moduleId)
          moduleId && cmdId && results.commands.push({ menu: moduleId, command: cmdId })
          return results
        }, {
          menus: [],
          commands: []
        })
        callback(null, results)
      })
      .catch(callback)
  }

  /**
   * 移动端角色授权
   * @param input
   * @param callback
   * @return {Promise<T | never>}
   */
  authorizeMobile (input, callback) {
    const { roleId, menuIds } = input
    Promise.all([this.roleRepo.findByPk(roleId), this.mobileModuleRepo.findAll({ where: { id: { [Op.in]: menuIds } } })])
      .then(([role, mobileModules]) => {
        if (role) {
          role.setMobileModules(mobileModules).then(acc => { callback(null, acc) })
        } else {
          callback(new Error('未找到角色相关信息'))
        }
      })
      .catch(callback)
  }

  /**
   * 依据Id获取移动端权限集合
   * @param input
   * @param callback
   */
  getMobileModules (input, callback) {
    const { roleId } = input
    this.roleRepo.findByPk(roleId)
      .then(role => {
        if (role) {
          return role.getMobileModules()
        } else {
          return Promise.reject(new Error('未找到角色'))
        }
      })
      .then(results => {
        results = results.map(v => v.id)
        callback(null, results)
      })
      .catch(callback)
  }
}

module.exports = RoleManager
