/**
 * author:赵赛赛
 * created_at:2019/3/18
 * */
const LogLogin = require('../../model/system/LogLogin')
const Op = require('sequelize').Op

class LogLoginManager {
  constructor (logLoginRepo = LogLogin) {
    this.logLoginRepo = logLoginRepo
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
      this.logLoginRepo
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
    this.logLoginRepo
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
    const options = this.logLoginRepo.buildOptions(input)
    this.logLoginRepo
      .findAndCountAll(options)
      .then(result => callback(null, result))
      .catch(callback)
  }
}

module.exports = LogLoginManager
