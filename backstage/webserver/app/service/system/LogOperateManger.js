/**
 * author:赵赛赛
 * created_at:2019/3/19
 * */
const LogOperate = require('../../model/system/LogOperate')
const Op = require('sequelize').Op

class LogOperateManager {
  constructor (logOperateRepo = LogOperate) {
    this.logOperateRepo = logOperateRepo
  }

  /**
   * 创建
   * @param input { Object}
   * @param callback 回调
   */
  create (input, callback) {
    if (!input) {
      callback(new Error('请传入参数！'))
    } else {
      this.logOperateRepo
        .create(input)
        .then(position => callback(null, position))
        .catch(callback)
    }
  }

  /**
   * 删除
   * @param input {Array, String}
   * @param callback
   */
  destroy (input, callback) {
    const rows = Array.isArray(input) ? input : [input]
    const condition = { where: { id: { [Op.in]: rows } } }
    this.logOperateRepo
      .destroy(condition)
      .then((count) => callback(null, count))
      .catch(callback)
  }

  /**
   * 获取全部
   * @param input
   * @param callback
   */
  findAll (input, callback) {
    console.log(input)
    const options = this.logOperateRepo.buildOptions(input)
    this.logOperateRepo
      .findAndCountAll(options)
      .then(result => callback(null, result))
      .catch(callback)
  }
}

module.exports = LogOperateManager
