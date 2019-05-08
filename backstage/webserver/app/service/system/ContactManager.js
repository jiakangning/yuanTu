/*
 * @Author: zhaoqinglong
 * @Date: 2019-03-16 11:42:36
 * @Last Modified by: zhaoqinglong
 * @Last Modified time: 2019-03-19 14:46:01
 */
const Sequelize = require('sequelize')
const Contact = require('../../model/system/Contact')
const Op = Sequelize.Op

class ContactManager {
  constructor (contactRepo = Contact) {
    this.contactRepo = contactRepo
  }

  /**
   * 创建联系人
   * @param {*} input 输入数据
   * @param {*} callback  回调函数
   */
  create (input, callback) {
    // todo 校验
    this.contactRepo.build(input)
      .save()
      .then(contact => callback(null, contact))
      .catch(callback)
  }

  /**
   * 修改联系人
   * @param {*} input 修改的参数
   * @param {*} callback 回调函数
   */
  update (input, callback) {
    let { id, ...contact } = input
    // todo 校验
    this.contactRepo
      .update(contact, { where: { id } })
      .then(result => callback(null, result))
      .catch(callback)
  }

  /**
   * 获取联系人
   * @param {*} input 修改的参数
   * @param {*} callback 回调函数
   */
  getContacts (input, callback) {
    let params = this.contactRepo.buildOptions(input)
    this.contactRepo
      .findAndCountAll(params)
      .then(data => callback(null, data))
      .catch(callback)
  }

  getContactById (input, callback) {
    let { id } = input
    this.contactRepo
      .findByPk(id)
      .then(contact => callback(null, contact))
      .catch(callback)
  }

  destroy (input, callback) {
    const rows = Array.isArray(input) ? input : [input]
    const condition = { where: { id: { [Op.in]: rows } } }
    this.contactRepo
      .destroy(condition)
      .then(count => callback(null, count))
      .catch(callback)
  }
}

module.exports = ContactManager
