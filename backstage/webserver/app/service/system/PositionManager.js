/**
 * @author 赵赛赛
 * @date 2019-03-15
 */
const Op = require('sequelize').Op
const Position = require('../../model/system/Position')

class PositionManager {
  constructor (positionRepo = Position) {
    this.positionRepo = positionRepo
  }

  /**
   * 创建
   * @param input {Array, Object}
   * @param callback 回调
   */
  create (input, callback) {
    if (!input) {
      callback(new Error('请传入参数！'))
    } else {
      if (Array.isArray(input)) {
        this.positionRepo
          .bulkCreate(input)
          .then(position => callback(null, position))
          .catch(callback)
      } else {
        this.positionRepo
          .create(input)
          .then(position => callback(null, position))
          .catch(callback)
      }
    }
  }

  /**
   * 更新数据
   * @param input {Object}
   * @param callback
   */
  update (input, callback) {
    const { id, ...raw } = input
    this.positionRepo
      .isExist(id)
      .then(position => {
        if (!position) {
          return Promise.reject(new Error('数据已被删除，无法修改！'))
        } else {
          return position.update(raw)
        }
      })
      .then(position => callback(null, position))
      .catch(callback)
  }

  /**
   *
   * @param input
   * @param callback
   */
  destroy (input, callback) {
    const rows = Array.isArray(input) ? input : [input]
    const condition = { where: { id: { [Op.in]: rows } } }
    this.positionRepo
      .destroy(condition)
      .then(count => callback(null, count))
      .catch(callback)
  }

  /**
   * 获取全部
   * @param input {Object}
   * @param callback
   */
  findAll (input, callback) {
    const options = this.positionRepo.buildOptions(input)
    this.positionRepo
      .findAndCountAll(options)
      .then(result => callback(null, result))
      .catch(callback)
  }
}

module.exports = PositionManager
