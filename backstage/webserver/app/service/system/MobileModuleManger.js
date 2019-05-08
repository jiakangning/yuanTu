/**
 * @author 赵赛赛
 * @date 2019-03-19
 */
const Op = require('sequelize').Op
const MobileModule = require('../../model/system/MobileModule')

class MobileModuleManager {
  constructor (mobileModuleRepo = MobileModule) {
    this.mobileModuleRepo = mobileModuleRepo
  }

  /**
   * 创建菜单
   * @param {Object}  input
   * @param {Function} callback
   */
  create (input, callback) {
    if (!input) {
      callback(new Error('请传入参数'))
    } else {
      this.mobileModuleRepo
        .create(input)
        .then((res) => callback(null, res))
        .catch(callback)
    }
  }

  /**
   * 修改菜单
   * @param {Object|Array<Object>}  input
   * @param {Function} callback
   */
  update (input, callback) {
    if (!input) {
      callback(new Error('请传入参数!'))
    } else {
      const { id, ...condition } = input
      this.mobileModuleRepo
        .isExist(id)
        .then(position => {
          if (!position) {
            return Promise.reject(new Error('数据已被删除，无法修改！'))
          } else {
            return position.update({ ...condition })
          }
        })
        .then(position => callback(null, position))
        .catch(callback)
    }
  }

  /**
   * 删除菜单
   * @param input {Array, Number}
   * @param callback
   */
  destroy (input, callback) {
    const rows = Array.isArray(input) ? input : [input]
    const condition = { where: { id: { [Op.in]: rows } } }
    this.mobileModuleRepo.destroy(condition)
      .then(count => callback(null, count))
      .catch(callback)
  }

  /**
   * 获取能构建成树形结构的数据
   * @param input
   * @param callback
   */
  findAll (input, callback) {
    const options = this.mobileModuleRepo.buildOptions(input)
    this.mobileModuleRepo
      .findAndCountAll(options)
      .then(result => callback(null, result))
      .catch(callback)
  }
}

module.exports = MobileModuleManager
