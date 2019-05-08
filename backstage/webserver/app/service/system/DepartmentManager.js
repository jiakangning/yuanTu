/**
 * @author 贾康宁
 * @date 2019-03-15
 * @description 部门流程
 */
const Op = require('sequelize').Op
const Department = require('../../model/system/Department')
const Contact = require('../../model/system/Contact')

class DepartmentManager {
  constructor (depotRepo = Department, concatRepo = Contact) {
    this.depotRepo = depotRepo
    this.contactRepo = concatRepo
  }

  /**
   * @desc 创建部门
   * @param input
   * @param callback
   */
  create (input, callback) {
    if (!input) {
      callback(new Error('请传入参数！'))
    } else {
      if (Array.isArray(input)) {
        this.depotRepo
          .bulkCreate(input)
          .then(depots => callback(null, depots))
          .catch(callback)
      } else {
        this.depotRepo
          .create(input)
          .then(depot => callback(null, depot))
          .catch(callback)
      }
    }
  }

  /**
   * @desc 依据id修改部门
   * @param input
   * @param callback
   */
  update (input, callback) {
    const { id, ...raw } = input
    this.depotRepo.isExist(id)
      .then(depot => {
        return depot ? depot.update(raw) : Promise.reject(new Error('数据已被删除，无法修改！'))
      })
      .then(depot => callback(null, depot))
      .catch(callback)
  }

  /**
   * desc 依据id删除部门
   * @param input
   * @param callback
   */
  delete (input, callback) {
    const rows = Array.isArray(input) ? input : [input]
    const condition = { where: { id: { [Op.in]: rows } } }
    this.depotRepo.destroy(condition)
      .then(count => callback(null, count))
      .catch(callback)
  }

  /**
   *@description 获取所有部门
   * @param input
   * @param callback
   */
  findAll (input, callback) {
    const options = this.depotRepo.buildOptions(input)
    this.depotRepo.findAll(options)
      .then(instances => {
        const rows = instances.reduce((results, instance) => {
          return results.concat(instance.getParentIds())
        }, instances.map(v => v.id))
        return this.depotRepo.findAndCountAll({ where: { id: { [Op.in]: rows } } })
      })
      .then(result => callback(null, result))
      .catch(callback)
  }

  /**
   * @description 设置部门人员
   * @param input
   * @param callback
   */
  setDepotPerson (input, callback) {
    const { id, contacts } = input
    Promise.all([this.depotRepo.findByPk(id), this.contactRepo.findAll({ where: { id: { [Op.in]: contacts } } })])
      .then(([depot, contacts]) => {
        if (depot) {
          depot.setContacts(contacts)
            .then(associatedConcats => callback(null, associatedConcats) )
            .catch(callback)
        } else {
          callback(new Error('未找到部门信息'))
        }
      })
  }

  /**
   * @description 依据Id获取部门人员Id集合
   * @param input
   * @param callback
   */
  getContactsIdsById (input, callback) {
    const { id } = input
    this.depotRepo.findByPk(id)
      .then(depot => {
        if (depot) {
          return depot.getContacts()
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

module.exports = DepartmentManager
