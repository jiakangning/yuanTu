/**
 * @author 甄岩岩
 * @date 2019-03-15
 */
const Op = require('sequelize').Op
const Command = require('../../model/system/Command')

class CommandManager {
  constructor (commandRepo = Command) {
    this.commandRepo = commandRepo
  }

  /**
   * @param {String} input
   * */
  create (input, callback) {
    if (!input) {
      callback(new Error('请传入参数'))
    } else {
      if (Array.isArray(input)) {
        this.commandRepo.bulkCreate(input).then(command => {
          callback(null, command)
        }).catch(err => { callback(err) })
      } else {
        this.commandRepo.create(input)
          .then(command => callback(null, command))
          .catch(err => callback(err))
      }
    }
  }

  update (input, callback) {
    let { id, ...conditions } = input
    this.commandRepo.isExist(id).then(command => {
      if (command) {
        return command.update(conditions)
      } else {
        return Promise.reject(new Error('查无数据'))
      }
    }).then(result => callback(null, result))
      .catch(err => callback(err))
  }

  destroy (input, callback) {
    const rows = Array.isArray(input) ? input : [input]
    const condition = { where: { id: { [Op.in]: rows } } }
    this.commandRepo.destroy(condition)
      .then(count => callback(null, count))
      .catch(err => callback(err))
  }

  /**
   *
   * @param input
   * @param callback
   */
  findAll (input, callback) {
    const options = this.commandRepo.buildOptions(input)
    this.commandRepo.findAndCountAll(options)
      .then(result => callback(null, result))
      .catch(err => callback(err))
  }
}

module.exports = CommandManager
