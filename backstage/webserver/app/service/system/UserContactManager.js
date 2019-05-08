/*
 * @Author: zhaoqinglong
 * @Date: 2019-03-19 12:48:53
 * @Last Modified by: zhaoqinglong
 * @Last Modified time: 2019-03-21 09:56:32
 */
const Op = require('sequelize').Op
const { User, Contact } = require('../../model/system/index')

class UserContactManager {
  constructor (userRepo = User, contactRepo = Contact) {
    this.userRepo = userRepo
    this.contactRepo = contactRepo
  }

  // 添加用户和联系人
  addUserAndContact (input, callback) {
    if (!input) {
      callback(new Error('请传入参数'))
    } else {
      this.userRepo
        .createUserAndContact(input, { User: this.userRepo, Contact: this.contactRepo })
        .then((res) => callback(null, res))
        .catch(callback)
    }
  }

  // 修改用户和联系人
  updateUserAndContact (input, callback) {
    const { contact, ...user } = input
    if (!input) {
      callback(new Error('请传入参数'))
    } else {
      this.userRepo
        .updateUserAndContact({ user, contact }, { User: this.userRepo, Contact: this.contactRepo })
        .then(result => callback(null, result))
        .catch(callback)
    }
  }

  // 查询用户详细信息，关联contact
  getUserContact (input, callback) {
    let { userId } = input
    this.userRepo
      .findByPk(userId, { include: [{ model: this.contactRepo }] })
      .then(user => callback(null, user))
      .catch(callback)
  }

  // 查询用户详细信息列表，关联contact
  getUserContacts (input, callback) {
    let { keywords } = input
    const options = this.userRepo.buildOptions(input)
    let includeParam = {
      model: this.contactRepo,
      required: false,
      where: {}
    }
    keywords && (includeParam.where = {
      [Op.or]: [
        { name: { [Op.like]: `%${keywords}%` } },
        { downholePhone: { [Op.like]: `%${keywords}%` } },
        { privatePhone: { [Op.like]: `%${keywords}%` } }
      ]
    })
    options.include = [includeParam]

    this.userRepo
      .findAndCountAll(options)
      .then(userContact => callback(null, userContact))
      .catch(callback)
  }

  deleteUserAndContact (input, callback) {
    const rows = Array.isArray(input) ? input : [input]
    const condition = { where: { id: { [Op.in]: rows } }, cascade: true }
    this.userRepo
      .destroy(condition)
      .then(count => callback(null, count))
      .catch(callback)
  }
}

module.exports = UserContactManager
