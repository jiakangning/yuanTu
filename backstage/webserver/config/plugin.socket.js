const Redis = require('ioredis')
const redisAdapter = require('socket.io-redis')
const setting = require('./config.loader').load().redis

let io

const generate = (setting) => {
  const client = new Redis({
    host: setting.host,
    port: setting.port,
    password: setting.password,
    retryStrategy: times => (Math.min(times * 50, 2000))
  })
  client.on('error', (err) => {
    console.log(`Redis缓存服务出现问题，故障描述：${err}`)
  })
  return client
}

module.exports = {
  init: server => {
    io = require('socket.io')(server)
    io.adapter(redisAdapter({
      pubClient: generate(setting),
      subClient: generate(setting)
    }))
    return io
  },
  singleton: () => {
    if (!io) {
      throw new Error('实时推送服务未能正常启动')
    } else {
      return io
    }
  },
  emit: (namespace, event, payload) => {
    Object.keys(namespace.connected).forEach(key => {
      namespace.connected[key].emit(event, payload)
    })
  }
}
