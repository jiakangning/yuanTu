/**
 * @author 李少华
 * date 2019-3-19
 */
const ErrorLog = require('../../model/system/ErrorLog')
const Op = require('sequelize').Op

class ErrorLogMnager {
  /**
   * 创建
   * @param input { Object}
   * @param callback 回调
   */
  create (input, callback) {
    if (input) {
      ErrorLog.create(input)
        .then(res => callback(null, res))
        .catch(callback)
    } else {
      callback(new Error('请输入参数!'))
    }
  }

  /**
   * 获取全部
   * @param input
   * @param callback
   */
  findAll (input, callback) {
    const options = ErrorLog.buildOptions(input)
    ErrorLog
      .findAndCountAll(options)
      .then(result => callback(null, result))
      .catch(callback)
  }

  /**
   * 删除
   * @param input {Array, String}
   * @param callback
   */
  destroy (input, callback) {
    const rows = Array.isArray(input) ? input : [input]
    const erroroption = { where: { id: { [Op.in]: rows } } }
    ErrorLog
      .destroy(erroroption)
      .then((count) => callback(null, count))
      .catch(callback)
  }
}

module.exports = ErrorLogMnager
