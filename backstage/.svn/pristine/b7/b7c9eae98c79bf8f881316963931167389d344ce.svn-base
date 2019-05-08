const async = require('async')

class PositionManager {
  constructor (db) {
    this.db = db || require('../../model').Position
  }
  // 创建
  create (args, callback) {
    let errorInfo
    const position = this.db.build({ ...args })
    async.waterfall(
      [
        cb => {
          return position
            .validate()
            .then(() => {
              cb(null, {})
            })
            .catch(err => {
              errorInfo = { err: true, message: err.message }
              cb(errorInfo)
            })
        },
        // (_, cb) => this.db.isDuplicate(position, cb),
        (_, cb) => {
          position
            .save()
            .then(res => {
              cb(
                null,
                res.get({
                  plain: true
                })
              )
            })
            .catch(err => {
              errorInfo = { error: true, message: '保存失败', info: err }
              cb(errorInfo)
            })
        }
      ],
      function (err, res) {
        callback(err, res)
      }
    )
  }

  // 修改
  update (args, callback) {
    let error
    async.waterfall(
      [
        // 获取信息
        cb =>
          this.db
            .findById(args.id)
            .then(position => {
              if (position) {
                cb(null, position.set({ ...args }))
              } else {
                error = { error: true, message: '该绑定信息不存在' }
                cb(error)
              }
            })
            .catch(err => {
              error = {
                error: true,
                message: '绑定信息查询失败',
                err
              }
              cb(error)
            }),
        // validate验证
        (position, cb) => {
          return position
            .validate()
            .then(() => {
              cb(null, position)
            })
            .catch(err => {
              error = { err: true, message: err.message }
              cb(error)
            })
        },
        // 唯一校验
        // (position, cb) => this.db.isDuplicate(position, cb),
        // 提交新信息
        (position, cb) =>
          position
            .save()
            .then(res => {
              cb(null, res.get({ plain: true }))
            })
            .catch(err => {
              error = {
                error: true,
                message: '绑定信息修改失败',
                err
              }
              cb(error)
            })
      ],
      function (err, res) {
        callback(err, res)
      }
    )
  }

  // 删除
  delete (args, callback) {
    let error
    const id = args && args.id
    if (!id) {
      error = { error: true, message: '删除信息id不能为空！' }
      return callback(error)
    }
    async.waterfall(
      [
        // 获取信息
        cb =>
          this.db
            .findById(id)
            .then(position => {
              if (position) {
                cb(null, position)
              } else {
                error = { error: true, message: '该绑定信息不存在' }
                cb(error)
              }
            })
            .catch(err => {
              error = {
                error: true,
                message: '绑定信息查询失败',
                err
              }
              cb(error)
            }),
        // 提交新信息
        (position, cb) =>
          this.db.destroy({ where: { id: position.id } })
            .then(res => {
              cb(null, res)
            })
            .catch(err => {
              error = {
                error: true,
                message: '绑定信息删除失败',
                err
              }
              cb(error)
            })
      ],
      function (err, res) {
        callback(err, res)
      }
    )
  }

  // 获取全部
  getAll (callback) {
    async.waterfall([
      cb => this.db.getList(null, cb)
    ], function (err, res) {
      callback(err, res)
    })
  }
}

module.exports = PositionManager
