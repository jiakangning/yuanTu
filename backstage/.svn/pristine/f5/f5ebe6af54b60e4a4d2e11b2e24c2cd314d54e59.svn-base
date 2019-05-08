exports.connect = (io) => {
  const nsp = io.of('/taxi')
  nsp.use((socket, next) => {
    const token = socket.handshake.query.token
    if (token) {
      socket.user = { id: socket.handshake.query.token }
      next()
    } else {
      next({ message: '未提供身份验证信息', code: 401 })
    }
  })

  nsp.on('connection', socket => {
    // 用户创建
    socket.on('create', order => {
      console.log('data: ', order)
      socket.broadcast.emit('create', order)
    })
    // 乘客取消
    socket.on('passenger.canceled', order => {
      console.log('passenger canceled order', order)
      if (order) {
        // 广播给调度员
        socket.broadcast.emit('passenger.canceled', order)
        // 推送给司机
        let { driver } = order
        if (driver && driver.objectId) {
          nsp.clients((_, clients = []) => {
            clients.forEach(key => {
              let userId = nsp.connected[key].user.id
              if (userId === driver.objectId) {
                nsp.connected[key].emit('passenger.canceled', order)
              }
            })
          })
        }
      }
    })
    // 调度员手动派发
    socket.on('dispatched', order => {
      console.log('dispatched order', order)
      if (order) {
        // 推送给乘客司机
        let { orderUser, driver } = order
        nsp.clients((_, clients = []) => {
          clients.forEach(key => {
            let userId = nsp.connected[key].user.id
            if ([orderUser && orderUser.objectId, driver && driver.objectId].indexOf(userId) > -1) {
              nsp.connected[key].emit('dispatched', order)
            }
          })
        })
      }
    })
    // 调度员手动取消
    socket.on('dispatch.canceled', (order) => {
      console.log('dispatch canceled order', order)
      if (order) {
        let { orderUser, driver } = order
        nsp.clients((_, clients = []) => {
          clients.forEach(key => {
            let userId = nsp.connected[key].user.id
            if ([orderUser && orderUser.objectId, driver && driver.objectId].indexOf(userId) > -1) {
              nsp.connected[key].emit('dispatch.canceled', order)
            }
          })
        })
      }
    })
    // 乘客已上车
    socket.on('upCar', order => {
      if (order) {
        let { orderUser } = order
        nsp.clients((_, clients = []) => {
          clients.forEach(key => {
            let userId = nsp.connected[key].user.id
            if (orderUser && orderUser.objectId === userId) {
              nsp.connected[key].emit('upCar', order)
            }
          })
        })
      }
    })
    // 乘客已到达
    socket.on('finish', order => {
      if (order) {
        let { orderUser } = order
        nsp.clients((_, clients = []) => {
          clients.forEach(key => {
            let userId = nsp.connected[key].user.id
            if (orderUser && orderUser.objectId === userId) {
              nsp.connected[key].emit('upCar', order)
            }
          })
        })
      }
    })
    // 司机取消
    socket.on('driver.canceled', order => {
      console.log('driver canceled order', order)
      if (order) {
        // 广播给调度员
        socket.broadcast.emit('driver.canceled', order)
        // 推送给乘客
        let { orderUser } = order
        if (orderUser && orderUser.objectId) {
          nsp.clients((_, clients = []) => {
            clients.forEach(key => {
              let userId = nsp.connected[key].user.id
              if (userId === orderUser.objectId) {
                nsp.connected[key].emit('driver.canceled', order)
              }
            })
          })
        }
      }
    })
  })
}
