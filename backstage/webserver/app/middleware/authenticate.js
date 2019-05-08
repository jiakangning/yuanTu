const { verify } = require('../../config/plugin.jwt')

// Routing Protection Strategy
exports.rps = () => (req, res, next) => {
  const authorization = req.get('Authorization')
  if (authorization) {
    try {
      req.user = verify(authorization.split(' ')[1])
      return next()
    } catch (err) {
      return next({ success: false, result: '身份验证信息有误' })
    }
  }
  return next({ success: false, result: '未提供身份验证信息' })
}

// Socket Protection Strategy
exports.sps = () => (socket, next) => {
  const token = socket.handshake.query.token
  if (token) {
    try {
      socket.user = verify(token)
      return next()
    } catch (err) {
      return next({ message: '身份验证信息有误', code: 401 })
    }
  } else {
    next({ message: '未提供身份验证信息', code: 401 })
  }
}
