/*
 * @Author: zhaoqinglong
 * @Date: 2019-03-18 16:56:03
 * @Last Modified by: zhaoqinglong
 * @Last Modified time: 2019-03-21 11:37:44
 */
const { User } = require('../../model/system/index')
class UserManager {
  constructor (userRepo = User) {
    this.userRepo = userRepo
  }
  create (input, callback) {
    const { username, password, email, mobile } = input
    this.userRepo
      .create({ username, password, email, mobile })
      .then(user => {
        callback(null, user.get({ plain: true }))
      })
      .catch(callback)
  }
  login (input, callback) {
    const { username, password } = input
    this.userRepo
      .findOne({ where: { username } })
      .then(user => {
        if (user) {
          if (user.comparePassword(password)) {
            return callback(null, { success: true, result: user.get({ plain: true }) })
          }
          return callback(null, { success: false, result: '用户名或密码错误' })
        }
        return callback(null, { success: false, result: '用户名不存在' })
      })
      .catch(callback)
  }
  findByPk (id, callback) {
    this.userRepo
      .findByPk(id)
      .then(user => {
        callback(null, user.get({ plain: true }))
      })
      .catch(callback)
  }
  update (input, callback) {
    const { id, username, password } = input
    this.userRepo
      .findByPk(id)
      .then(user => {
        if (user) {
          user.username = username
          if (password) {
            user.password = password
          }
          user
            .save()
            .then(() => callback(null, user))
            .catch(err => callback(err))
        } else {
          callback(new Error('用户账户不存在'))
        }
      })
      .catch(callback)
  }
  delete (input, callback) {
    let { id } = input
    this.userRepo
      .destroy({ where: { id } })
      .then(count => {
        callback(null, `{msg:'删除了${count}条数据'}`)
      })
      .catch(callback)
  }
}

module.exports = UserManager
