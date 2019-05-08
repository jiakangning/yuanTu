/*
 * @Author: zhaoqinglong
 * @Date: 2019-03-20 15:26:01
 * @Last Modified by: zhaoqinglong
 * @Last Modified time: 2019-03-21 20:23:12
 */
const Op = require('sequelize').Op
const { Dictionary } = require('../../model/system/index')

class DictionaryManager {
  constructor (dicRepo = Dictionary) {
    this.dicRepo = dicRepo
  }

  /**
   * @desc 创建字典
   * @param input
   * @param callback
   */
  create (input, callback) {
    if (!input) {
      callback(new Error('请传入参数！'))
    } else {
      if (Array.isArray(input)) {
        let createArr = []
        for (let i = 0; i < input.length; i++) {
          createArr.push(this.dicRepo.create(input[i]))
        }
        Promise
          .all(createArr)
          .then(dics => callback(null, dics))
          .catch(callback)
        // bulkCreate不触发钩子函数
        // this.dicRepo
        //   .bulkCreate(input, { hooks: true, individualHooks: true })
        //   .then(dics => callback(null, dics))
        //   .catch(callback)
      } else {
        this.dicRepo
          .create(input)
          .then(dic => callback(null, dic))
          .catch(callback)
      }
    }
  }

  /**
   * 创建字典父级和子级
   * @param {*} input
   * @param {*} callback
   */
  createIncludeChildren (input, callback) {
    if (!input) {
      callback(new Error('请传入参数！'))
    } else {
      let { children, ...raw } = input
      // 先创建父级
      this.dicRepo
        .create(raw)
        .then(dicfather => {
          return dicfather
        })
        .then(dicfather => {
          // 创建子集
          if (Array.isArray(children) && children.length && dicfather) {
            // 将新创建的父级id赋值给子级
            children.forEach(item => {
              item.parentId = dicfather.id
            })
            console.log(children)
            let createPromiseArr = []
            for (let i = 0; i < children.length; i++) {
              createPromiseArr.push(this.dicRepo.create(children[i]))
            }
            return Promise
              .all(createPromiseArr)
              .then(dics => callback(null, dics))
              .catch(callback)

            // return this.dicRepo
            //   .bulkCreate(children, { hooks: true, individualHooks: true })
            //   .then(dicChildren => callback(null, { dicfather, dicChildren }))
            //   .catch(callback)
          } else {
            callback(null, dicfather)
          }
        })
        .catch(callback)
    }
  }

  /**
   * @desc 依据id修改字典
   * @param input
   * @param callback
   */
  update (input, callback) {
    const { id, ...raw } = input
    this.dicRepo.isExist(id)
      .then(dic => {
        return dic ? dic.update(raw) : Promise.reject(new Error('数据已被删除，无法修改！'))
      })
      .then(dic => callback(null, dic))
      .catch(callback)
  }

  /**
   * desc 依据id删除字典
   * @param input
   * @param callback
   */
  delete (input, callback) {
    const rows = Array.isArray(input) ? input : [input]
    const condition = { where: { id: { [Op.in]: rows } } }
    this.dicRepo.destroy(condition)
      .then(count => callback(null, count))
      .catch(callback)
  }

  /**
   *@desc 获取所有字典
   * @param input
   * @param callback
   */
  findAll (input, callback) {
    const options = this.dicRepo.buildOptions(input)
    this.dicRepo.findAll(options)
      .then(instances => {
        const rows = instances.reduce((results, instance) => {
          return results.concat(instance.getParentIds())
        }, instances.map(v => v.id))
        return this.dicRepo.findAndCountAll({ where: { id: { [Op.in]: rows } } })
      })
      .then(result => callback(null, result))
      .catch(callback)
  }
}

module.exports = DictionaryManager
