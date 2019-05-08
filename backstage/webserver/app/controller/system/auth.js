const UserManager = require('../../service/system/UserManager')
const { sign } = require('../../../config/plugin.jwt')
// const formatResponse = require('../../util/formatResponse')
exports.renderLogin = (req, res, next) => {
  res.send(req.csrfToken())
}

exports.signup = (req, res, next) => {
  const userManager = new UserManager()
  userManager.create(req.body, (err, user) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json(user)
    }
  })
}

exports.postLogin = (req, res, next) => {
  const userManager = new UserManager()
  userManager.login(req.body, (err, data) => {
    if (err) {
      return res.send(err)
    } else {
      if (data.success) {
        data.result.token = sign(data.result)
        return res.json(data)
      } else {
        return res.json(data)
      }
    }
  })
}

exports.update = (req, res, next) => {
  const userManager = new UserManager()
  userManager.update(req.body, (err, user) => {
    if (err) {
      res.json({ error: true, message: '更新失败' })
    } else {
      res.json({ message: '更新成功' })
    }
  })
}

exports.delete = (req, res, next) => {
  const userManager = new UserManager()
  userManager.update(req.body, (err, data) => {
    if (err) {
      res.json({ error: true, message: err.message || '删除失败' })
    } else {
      res.json({ message: '删除成功' })
    }
  })
}
